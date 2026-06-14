from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from modules.auth import auth_controller
from modules.wallet import wallet_controller
from modules.causes import causes_controller
from modules.donations import donations_controller
from db.model import Cause
from sqlalchemy.future import select

app = FastAPI(
    title="Impact Wallet API",
    description="Backend for the Impact Wallet micro-savings platform.",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Update for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_controller.router)
app.include_router(wallet_controller.router)
app.include_router(causes_controller.router)
app.include_router(donations_controller.router)

@app.on_event("startup")
async def startup_db_client():
    # In a real app, use Alembic for migrations.
    # For MVP starting point, we can auto-create tables if they don't exist.
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    from sqlalchemy.ext.asyncio import AsyncSession
    from sqlalchemy.orm import sessionmaker
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        result = await session.execute(select(Cause))
        if not result.scalars().first():
            session.add_all([
                Cause(name="Tree Plantation", description="Plant trees in deforested areas", ngo_partner="GreenEarth", biome_type="tree", icon="🌳"),
                Cause(name="Education", description="Fund schools and supplies", ngo_partner="TeachTheFuture", biome_type="school", icon="🏫"),
                Cause(name="Healthcare", description="Build rural clinics", ngo_partner="HealthFirst", biome_type="clinic", icon="🏥")
            ])
            await session.commit()

@app.get("/")
async def root():
    return {"message": "Welcome to the Impact Wallet API"}
