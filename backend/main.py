from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from db.database import engine, Base
from modules.auth import auth_controller

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

@app.on_event("startup")
async def startup_db_client():
    # In a real app, use Alembic for migrations.
    # For MVP starting point, we can auto-create tables if they don't exist.
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

@app.get("/")
async def root():
    return {"message": "Welcome to the Impact Wallet API"}
