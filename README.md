# 🌱 Impact Wallet

> **Save Small · Donate Big** — a donation-first micro-savings platform where every rupee you give grows a living, breathing world you own.

<p align="left">
  <img src="https://img.shields.io/badge/backend-FastAPI-111111?style=flat-square" alt="FastAPI" />
  <img src="https://img.shields.io/badge/frontend-React%2018-111111?style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/database-PostgreSQL%2015-111111?style=flat-square" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/cache-Redis-111111?style=flat-square" alt="Redis" />
  <img src="https://img.shields.io/badge/auth-JWT-111111?style=flat-square" alt="JWT" />
  <img src="https://img.shields.io/badge/status-MVP-555555?style=flat-square" alt="Status" />
  <img src="https://img.shields.io/badge/license-MIT-555555?style=flat-square" alt="License" />
</p>

---

## ✨ Overview

Most donation apps treat giving as a one-time, friction-heavy transaction — a form, a card number, a receipt, then silence. People give once and forget.

**Impact Wallet flips that loop.** Users stash tiny amounts (₹20 / ₹50 / ₹100) into a personal wallet, then "plant" those funds into verified social causes whenever they like. Every rupee given grows a **virtual world** the user owns and tends — a forest of real trees, a village of funded schools and clinics, a sanctuary of protected wildlife.

> **The golden rule:** nothing in the world is cosmetic. Every virtual tree maps 1:1 to a real sapling in the ground. The game *is* the receipt.

---

## 🎮 Key Features

### User-facing
- 🔐 **Auth** — registration, login, JWT-based authentication, profile
- 💰 **Impact Wallet** — micro-savings balance with add-money (₹20 / ₹50 / ₹100 / custom)
- 🎯 **Cause catalogue** — six verified causes, each with an NGO partner and live impact stats
- 🌍 **The Living World** — animated virtual land, growing trees, cause biomes *(the centrepiece)*
- 🔥 **Habit mechanics** — saving streaks, daily watering, Impact Points, levels, and badges
- 📜 **Transaction history** — every save and donation, with real-time cause tracking
- 📊 **Impact report** — aggregated CO₂ saved, meals funded, children supported, trees planted

### Admin / NGO
- 🏢 NGO partner onboarding and verification
- 💸 Donation management and disbursement tracking
- 🌳 Real-world impact data entry (sapling location, species, confirmation) that feeds the user's world

---

## 🌳 The Gamification Engine

The heart of Impact Wallet. It turns donation from a transaction into a daily habit.

**The core loop:**

```
SAVE  ->  CHOOSE CAUSE  ->  DONATE  ->  WORLD GROWS
  ^                                          |
  |                                          v
RETURN  <-  REWARD / STREAK  <-  SEE REAL-WORLD IMPACT
```

**Virtual Land tiers** unlock as cumulative donations rise:

| Tier | Unlocks at | What appears |
|------|-----------|--------------|
| Seedling Plot | ₹0 | A bare patch of soil — your starting canvas |
| Garden | ₹200 | Grass, first flowers, a path |
| Grove | ₹500 | A small cluster of trees, a pond |
| Forest | ₹1,000 | Dense canopy, birds, a stream |
| Sanctuary | ₹2,500 | Wildlife, hills, a guardian totem |
| Living Ecosystem | ₹5,000+ | A full biome — weather, seasons, day/night |

**Living Trees** grow in real time, mirroring the real sapling:

| Stage | Reached on | Behaviour |
|-------|-----------|-----------|
| Seed | Day 0 | Freshly planted mound |
| Sprout | Day 1–2 | First green shoot |
| Sapling | Day 3–7 | A small tree with leaves |
| Young Tree | Week 2–4 | Visibly taller, fuller canopy |
| Mature Tree | Week 4+ | Full tree — shows species, location, lifetime CO₂ |

Daily **watering** and active **streaks** accelerate growth (trees never die — we reward, never punish).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Backend** | Python 3.11 · FastAPI · SQLAlchemy · Alembic |
| **Frontend** | React 18 · Axios · Tailwind CSS · Framer Motion |
| **Living World** | HTML5 Canvas / layered SVG driven by React state |
| **Database** | PostgreSQL 15 + Redis (cache + leaderboards) |
| **Auth** | JWT (python-jose) + bcrypt password hashing |
| **Deployment** | Railway / Render (backend) · Vercel (frontend) |
| **Payments (v2)** | Razorpay / UPI AutoPay |

---

## 🏗️ Architecture

```
+------------------------------------------------------------+
|                    FRONTEND  (React.js)                    |
|   Dashboard | Wallet | Causes | Living World | Impact      |
+----------------------------+-------------------------------+
                             |  REST API (JSON / JWT)
+----------------------------v-------------------------------+
|                    BACKEND  (FastAPI)                      |
|  /auth  /wallet  /causes  /donations                       |
|  /world  /streaks  /badges  /reports  /ngos                |
+----------------------------+-------------------------------+
                             |
+----------------------------v-------------------------------+
|          DATA  (PostgreSQL  +  Redis cache)                |
|  users  wallets  causes  donations  transactions           |
|  worlds  plantings  streaks  badges  impact_metrics        |
+------------------------------------------------------------+
```

---

## 📁 Project Structure

```
impact-wallet/
├── backend/                     # FastAPI
│   ├── app/
│   │   ├── main.py              # App entrypoint
│   │   ├── models/              # SQLAlchemy ORM models
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   ├── wallet.py
│   │   │   ├── causes.py
│   │   │   ├── donations.py
│   │   │   ├── world.py         # virtual land + trees
│   │   │   └── streaks.py
│   │   ├── services/            # business logic + growth engine
│   │   └── database.py
│   ├── alembic/                 # migrations
│   ├── requirements.txt
│   └── .env.example
└── frontend/                    # React.js
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── Wallet.jsx
    │   │   ├── Causes.jsx
    │   │   └── LivingWorld.jsx  # canvas / SVG world
    │   ├── components/
    │   └── api/                 # Axios API layer
    ├── package.json
    └── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Redis 6+

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/impact-wallet.git
cd impact-wallet
```

### 2. Backend (FastAPI)

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env            # then edit values

# Run database migrations
alembic upgrade head

# Start the dev server
uvicorn app.main:app --reload
```

Backend runs at **http://localhost:8000** · interactive docs at **http://localhost:8000/docs**

### 3. Frontend (React)

```bash
cd frontend

npm install

cp .env.example .env            # set VITE_API_URL=http://localhost:8000

npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🔑 Environment Variables

**`backend/.env`**

```env
DATABASE_URL=postgresql://user:password@localhost:5432/impact_wallet
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=change-me-to-a-long-random-string
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

**`frontend/.env`**

```env
VITE_API_URL=http://localhost:8000
```

> ⚠️ Never commit your real `.env` files. Keep secrets out of version control.

---

## 📡 API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register a new user; creates wallet + world |
| `POST` | `/auth/login` | Authenticate, return JWT |
| `GET`  | `/wallet/me` | Current wallet balance and totals |
| `POST` | `/wallet/add` | Add money to wallet `{ amount }`; advances streak |
| `GET`  | `/causes` | List all donation causes with live stats |
| `POST` | `/donations/donate` | Donate `{ cause_id, amount }`; spawns a planting |
| `GET`  | `/donations/history` | Full donation history for the user |
| `GET`  | `/world/me` | World state: tier, level, XP, all plantings |
| `POST` | `/world/water` | Daily watering; boosts growth, keeps streak |
| `GET`  | `/streaks/me` | Current and longest saving streak |
| `GET`  | `/badges` | Earned and available badges |
| `GET`  | `/reports/impact` | Aggregated impact: CO₂, meals, trees, children |

Full schema and request/response models are available in the auto-generated OpenAPI docs at `/docs`.

---

## 🗄️ Database Schema (overview)

**Core:** `users` · `wallets` · `causes` · `donations` · `transactions`
**Gamification:** `worlds` · `plantings` · `streaks` · `badges` · `user_badges`

Each `planting` links a `donation` to a virtual asset (`tree`, `school`, `clinic`, …), tracks its growth `stage`, and stores a `real_ref` (NGO confirmation / GPS) plus estimated `co2_kg_year` — keeping every virtual asset tied to a verified real-world outcome.

---

## 🗺️ Roadmap

- [x] Auth, wallet CRUD, PostgreSQL schema, JWT
- [x] Cause catalogue + donation flow
- [ ] React UI: dashboard, wallet, causes, donate flow
- [ ] Living World: canvas/SVG, tree growth engine, streaks, watering
- [ ] Badges, impact report, NGO panel, responsive pass
- [ ] **v2** — Razorpay top-ups & UPI AutoPay round-up saving
- [ ] **v2** — React Native / Expo mobile app + push notifications
- [ ] **v2** — Social layer: friends' forests & shared community goals
- [ ] **v2** — AR forest & B2B CSR dashboards

---

## 🤝 Contributing

This is a solo developer MVP / portfolio project. Issues, ideas, and pull requests are welcome — open an issue to discuss any significant change first.

```bash
# Fork → branch → commit → PR
git checkout -b feature/your-feature
git commit -m "feat: add your feature"
git push origin feature/your-feature
```

---

## 📄 License

Released under the [MIT License](LICENSE).

---

## 👤 Author

**Aditya** — full-stack developer

*Save a little. Create a lot of impact. — and watch your world grow because of it. 🌳*