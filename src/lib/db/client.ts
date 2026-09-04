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
      if (!where.email && !where.id) return null;
      const filter: Record<string, any> = where.email
        ? { email: where.email.toLowerCase() }
        : { _id: where.id };
      try {
        const doc = await User.findOne(filter).lean();
        if (!doc) return null;
        return {
          ...doc,
          id: (doc as any)._id?.toString() || (doc as any).id,
        };
      } catch {
        return null;
      }
    },

    async findMany({
      where = {},
      limit = 50,
      skip = 0,
      sort = { createdAt: -1 },
    }: {
      where?: Record<string, any>;
      limit?: number;
      skip?: number;
      sort?: Record<string, any>;
    } = {}) {
      await connectToDatabase();
      // Exclude passwordHash from user listings for security
      const docs = await User.find(where)
        .select('-passwordHash')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();

      return docs.map(d => ({
        ...d,
        id: (d as any)._id?.toString() || (d as any).id,
      }));
    },

    async create({
      data,
    }: {
      data: {
        email: string;
        name: string;
        passwordHash: string;
        role?: string;
        presentationsCreated?: number;
        presentationsDownloaded?: number;
        totalDownloads?: number;
      };
    }) {
      await connectToDatabase();
      const user: any = await User.create({
        email: data.email.toLowerCase(),
        name: data.name,
        passwordHash: data.passwordHash,
        role: (data.role ? data.role.toLowerCase() : 'user') as 'user' | 'admin',
        presentationsCreated: data.presentationsCreated ?? 0,
        presentationsDownloaded: data.presentationsDownloaded ?? 0,
        totalDownloads: data.totalDownloads ?? 0,
      });
      return {
        id: user._id?.toString() || user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        presentationsCreated: user.presentationsCreated ?? 0,
        presentationsDownloaded: user.presentationsDownloaded ?? 0,
        totalDownloads: user.totalDownloads ?? 0,
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

    async updateLastLogin(userIdOrEmail: string) {
      await connectToDatabase();
      const filter = userIdOrEmail.includes('@')
        ? { email: userIdOrEmail.toLowerCase() }
        : { _id: userIdOrEmail };
      return User.updateOne(filter, { $set: { lastLogin: new Date() } });
    },

    async incrementPresentationCount(userId: string) {
      await connectToDatabase();
      return User.updateOne({ _id: userId }, { $inc: { presentationsCreated: 1 } });
    },

    async incrementDownloadCount(userId: string, isNewPresentation: boolean = false) {
      await connectToDatabase();
      const inc: Record<string, number> = { totalDownloads: 1 };
      if (isNewPresentation) {
        inc.presentationsDownloaded = 1;
      }
      return User.updateOne({ _id: userId }, { $inc: inc });
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
      const hasOperators = Object.keys(update).some(k => k.startsWith('$'));
      const updateDoc = hasOperators ? update : { $set: update, $setOnInsert: { ...create, id: where.id } };

      const updated = await Presentation.findOneAndUpdate(
        { id: where.id },
        updateDoc,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return updated ? {
        ...updated,
        slidesJson: JSON.stringify((updated as any).slides || []),
        configJson: JSON.stringify((updated as any).config || {}),
      } : null;
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
      if (where.presentationId) filter.presentationId = where.presentationId;
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
          provider: p.provider || 'razorpay',
          isDemo: p.isDemo ?? false,
          demoNote: p.demoNote || null,
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
    async log(data: {
      presentationId: string;
      userId?: string;
      fileName: string;
      fileSize?: number;
      templateId?: string;
      templateFamily?: string;
      isDemo?: boolean;
      paymentMethod?: string;
      ipAddress?: string;
      userAgent?: string;
    }) {
      await connectToDatabase();
      return DownloadHistory.create(data);
    },
    async count(filter = {}) {
      await connectToDatabase();
      return DownloadHistory.countDocuments(filter);
    },
    async countUniqueUsers() {
      await connectToDatabase();
      const distinctUsers = await DownloadHistory.distinct('userId', { userId: { $ne: null } });
      return distinctUsers.length;
    },
    async findMany({ limit = 10, sort = { downloadedAt: -1 } }: { limit?: number; sort?: Record<string, any> } = {}) {
      await connectToDatabase();
      const docs = await DownloadHistory.find({}).sort(sort).limit(limit).lean();

      // Hydrate user and presentation details
      const userIds = [...new Set(docs.map(d => d.userId).filter((id): id is string => Boolean(id)))];
      const presentationIds = [...new Set(docs.map(d => d.presentationId).filter((id): id is string => Boolean(id)))];

      const [users, presentations] = await Promise.all([
        User.find({ _id: { $in: userIds as any } }).select('email name').lean(),
        Presentation.find({ id: { $in: presentationIds } }).select('id title').lean(),
      ]);

      const userMap = new Map(users.map(u => [(u as any)._id.toString(), u]));
      const presentationMap = new Map(presentations.map(p => [p.id, p]));

      return docs.map(d => ({
        ...d,
        id: (d as any)._id?.toString() || (d as any).id,
        user: d.userId ? userMap.get(d.userId) || null : null,
        presentation: presentationMap.get(d.presentationId) || null,
      }));
    },
  },
};

export default db;
