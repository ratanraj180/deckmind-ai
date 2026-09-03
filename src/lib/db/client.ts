import connectToDatabase from './mongodb';
import { User } from '@/models/User';
import { Presentation } from '@/models/Presentation';
import { Payment } from '@/models/Payment';
import { DownloadHistory } from '@/models/DownloadHistory';

export { connectToDatabase, User, Presentation, Payment, DownloadHistory };

/**
 * High-level database interface for DeckMind AI with MongoDB Atlas.
 * Ensures connection is established before querying, with automatic connection pooling.
 */
export const db = {
  user: {
    async findUnique({ where }: { where: { email?: string; id?: string } }) {
      await connectToDatabase();
      const filter = where.email ? { email: where.email.toLowerCase() } : { _id: where.id };
      const doc = await User.findOne(filter).lean();
      if (!doc) return null;
      return {
        ...doc,
        id: (doc as any)._id?.toString() || (doc as any).id,
      };
    },

    async create({ data }: { data: { email: string; name: string; passwordHash: string; role?: string } }) {
      await connectToDatabase();
      const user: any = await User.create({
        email: data.email.toLowerCase(),
        name: data.name,
        passwordHash: data.passwordHash,
        role: (data.role as 'USER' | 'ADMIN') || 'USER',
      });
      return {
        id: user._id?.toString() || user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      };
    },

    async update({ where, data }: { where: { email?: string; id?: string }; data: Record<string, any> }) {
      await connectToDatabase();
      const filter = where.email ? { email: where.email.toLowerCase() } : { _id: where.id };
      const updated = await User.findOneAndUpdate(filter, { $set: data }, { new: true }).lean();
      if (!updated) return null;
      return {
        ...updated,
        id: (updated as any)._id?.toString() || (updated as any).id,
      };
    },

    async count(filter = {}) {
      await connectToDatabase();
      return User.countDocuments(filter);
    },
  },

  presentation: {
    async findUnique({ where }: { where: { id: string }; select?: Record<string, boolean> }) {
      await connectToDatabase();
      const doc = await Presentation.findOne({ id: where.id }).lean();
      if (!doc) return null;
      return {
        ...doc,
        slidesJson: JSON.stringify(doc.slides || []),
        configJson: JSON.stringify(doc.config || {}),
      };
    },

    async findMany({ where = {}, limit = 20, sort = { createdAt: -1 } }: { where?: Record<string, any>; limit?: number; sort?: Record<string, any> } = {}) {
      await connectToDatabase();
      const docs = await Presentation.find(where).sort(sort).limit(limit).lean();
      return docs.map(d => ({
        ...d,
        slidesJson: JSON.stringify(d.slides || []),
        configJson: JSON.stringify(d.config || {}),
      }));
    },

    async upsert({ where, create, update }: { where: { id: string }; create: Record<string, any>; update: Record<string, any> }) {
      await connectToDatabase();
      const existing = await Presentation.findOne({ id: where.id });
      if (existing) {
        Object.assign(existing, update);
        await existing.save();
        return existing.toObject();
      } else {
        const created = await Presentation.create({ ...create, id: where.id });
        return created.toObject();
      }
    },

    async count(filter = {}) {
      await connectToDatabase();
      return Presentation.countDocuments(filter);
    },
  },

  payment: {
    async create({ data }: { data: Record<string, any> }) {
      await connectToDatabase();
      const payment = await Payment.create(data);
      return payment.toObject();
    },

    async findFirst({ where }: { where: Record<string, any> }) {
      await connectToDatabase();
      const filter: Record<string, any> = {};
      if (where.providerOrderId) filter.providerOrderId = where.providerOrderId;
      if (where.userId) filter.userId = where.userId;
      if (where.status) filter.status = where.status;
      const doc = await Payment.findOne(filter).lean();
      if (!doc) return null;
      return {
        ...doc,
        id: (doc as any)._id?.toString() || (doc as any).id,
      };
    },

    async update({ where, data }: { where: { id: string }; data: Record<string, any> }) {
      await connectToDatabase();
      const updated = await Payment.findByIdAndUpdate(where.id, { $set: data }, { new: true }).lean();
      return updated;
    },

    async aggregate({ where = {}, _sum, _count }: { where?: Record<string, any>; _sum?: { amount?: boolean }; _count?: boolean }) {
      await connectToDatabase();
      const filter: Record<string, any> = {};
      if (where.status) filter.status = where.status;

      const pipeline: any[] = [{ $match: filter }];
      pipeline.push({
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      });

      const [result] = await Payment.aggregate(pipeline);
      return {
        _sum: { amount: result?.totalAmount ?? 0 },
        _count: result?.count ?? 0,
      };
    },

    async findMany({ where = {}, orderBy = { createdAt: 'desc' }, take = 10 }: { where?: Record<string, any>; orderBy?: Record<string, any>; take?: number; include?: any }) {
      await connectToDatabase();
      const filter: Record<string, any> = {};
      if (where.status) filter.status = where.status;

      const sortField = Object.keys(orderBy)[0] || 'createdAt';
      const sortOrder = orderBy[sortField] === 'desc' ? -1 : 1;

      const payments = await Payment.find(filter)
        .sort({ [sortField]: sortOrder })
        .limit(take)
        .lean();

      // Hydrate user and presentation details
      const userIds = [...new Set(payments.map(p => p.userId).filter(Boolean))];
      const presentationIds = [...new Set(payments.map(p => p.presentationId).filter(Boolean))];

      const [users, presentations] = await Promise.all([
        User.find({ _id: { $in: userIds } }).lean(),
        Presentation.find({ id: { $in: presentationIds } }).lean(),
      ]);

      const userMap = new Map(users.map(u => [(u as any)._id.toString(), u]));
      const presentationMap = new Map(presentations.map(p => [p.id, p]));

      return payments.map(p => {
        const u = userMap.get(p.userId);
        const pres = presentationMap.get(p.presentationId);
        return {
          id: (p as any)._id.toString(),
          amount: p.amount,
          createdAt: p.createdAt,
          user: {
            email: u?.email || 'user@example.com',
            name: u?.name || 'User',
          },
          presentation: {
            title: pres?.title || 'Presentation',
          },
        };
      });
    },
  },

  downloadHistory: {
    async log(data: { presentationId: string; userId?: string; fileName: string; fileSize?: number; templateId?: string; templateFamily?: string; ipAddress?: string; userAgent?: string }) {
      await connectToDatabase();
      return DownloadHistory.create(data);
    },
    async count(filter = {}) {
      await connectToDatabase();
      return DownloadHistory.countDocuments(filter);
    },
  },
};

export default db;
