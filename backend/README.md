# DeckMind AI — Backend Architecture

This directory contains the FastAPI backend structure, ready for production migration from the Next.js API routes currently used for MVP.

## Current Architecture (MVP)

The MVP uses **Next.js API Routes** for all backend logic. These are located at:

```
src/app/api/
├── parse-document/route.ts       # PDF/DOCX parsing (no auth required)
├── generate-presentation/route.ts # AI presentation generation
├── auth/
│   ├── [...nextauth]/route.ts    # Next-Auth v5 handlers
│   └── register/route.ts        # User registration
├── payments/
│   ├── create-order/route.ts    # Razorpay order creation (auth required)
│   └── verify/route.ts          # Payment signature verification (auth required)
├── presentations/
│   └── [id]/download/route.ts   # Protected PPTX download (auth + payment required)
└── admin/
    └── stats/route.ts            # Admin dashboard stats (ADMIN role required)
```

## FastAPI Backend Structure (Production-Ready)

```
backend/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── router.py
│   │   │   ├── dependencies.py     # JWT verification middleware
│   │   │   └── models.py
│   │   ├── documents/
│   │   │   ├── router.py
│   │   │   ├── pdf_parser.py       # pdfplumber / PyMuPDF
│   │   │   ├── docx_parser.py      # python-docx
│   │   │   └── document_analyzer.py
│   │   ├── presentations/
│   │   │   ├── router.py
│   │   │   ├── blueprint_generator.py
│   │   │   ├── slide_generator.py
│   │   │   ├── pptx_generator.py   # python-pptx
│   │   │   └── template_engine.py
│   │   ├── payments/
│   │   │   ├── router.py
│   │   │   ├── razorpay_service.py
│   │   │   └── payment_verification.py
│   │   └── ai/
│   │       ├── base_provider.py
│   │       ├── gemini_provider.py
│   │       └── openai_provider.py
│   ├── models/
│   │   ├── user.py
│   │   ├── presentation.py
│   │   └── payment.py
│   ├── schemas/
│   │   ├── auth.py
│   │   ├── presentation.py
│   │   └── payment.py
│   ├── core/
│   │   ├── config.py               # Pydantic settings from .env
│   │   ├── database.py             # SQLAlchemy session
│   │   └── security.py             # bcrypt + JWT utils
│   └── main.py                     # FastAPI app entry
├── alembic/                        # Database migrations
├── requirements.txt
└── .env.example
```

## Setup Instructions

### Prerequisites
- Python 3.11+
- PostgreSQL (or SQLite for development)
- Node.js 20+ (for frontend)

### Local Development

```bash
# 1. Clone and enter backend
cd backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Copy and configure environment
cp .env.example .env
# Edit .env with your values

# 5. Run database migrations
alembic upgrade head

# 6. Seed admin user
python -c "from app.core.admin_seed import seed_admin; seed_admin()"

# 7. Start server
uvicorn app.main:app --reload --port 8000
```

### API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | None | Create account |
| POST | /api/auth/login | None | Get JWT token |
| POST | /api/documents/upload | Bearer | Parse PDF/DOCX |
| POST | /api/presentations/create | Bearer | Generate presentation |
| GET | /api/presentations/{id} | Bearer | Get presentation |
| POST | /api/payments/create-order | Bearer | Create Razorpay order |
| POST | /api/payments/verify | Bearer | Verify payment (server-side HMAC) |
| GET | /api/presentations/{id}/download | Bearer + Paid | Download PPTX |
| GET | /api/admin/stats | Bearer + Admin | Admin statistics |

### Environment Variables

```env
DATABASE_URL=postgresql://user:password@localhost:5432/deckmind
SECRET_KEY=your-jwt-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

GEMINI_API_KEY=
OPENAI_API_KEY=

ADMIN_EMAIL=ratanas1408@gmail.com
ADMIN_PASSWORD=
```

## Security Notes

- Never expose `SECRET_KEY`, `RAZORPAY_KEY_SECRET`, or `ADMIN_PASSWORD` in source code.
- Payment verification uses HMAC-SHA256 on the backend — frontend payment success is never trusted alone.
- PPTX download endpoint verifies: authentication + presentation ownership + payment status.
- Admin credentials are seeded from environment variables only.
