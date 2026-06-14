from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from uuid import UUID
from db.model import Wallet, World, Cause, Donation, Planting
from modules.donations.donations_dto import DonateRequest

async def donate(db: AsyncSession, user_id: UUID, payload: DonateRequest):
    # Fetch Wallet
    stmt_wallet = select(Wallet).where(Wallet.user_id == user_id)
    result_wallet = await db.execute(stmt_wallet)
    wallet = result_wallet.scalars().first()
    
    if not wallet or wallet.balance < payload.amount:
        raise HTTPException(status_code=400, detail="Insufficient wallet balance")

    # Fetch Cause
    stmt_cause = select(Cause).where(Cause.id == payload.cause_id)
    result_cause = await db.execute(stmt_cause)
    cause = result_cause.scalars().first()

    if not cause:
        raise HTTPException(status_code=404, detail="Cause not found")

    # Fetch World
    stmt_world = select(World).where(World.user_id == user_id)
    result_world = await db.execute(stmt_world)
    world = result_world.scalars().first()

    if not world:
        raise HTTPException(status_code=404, detail="World not found")

    # 1. Move money
    wallet.balance -= payload.amount
    wallet.total_donated += payload.amount
    
    donation = Donation(
        user_id=user_id,
        cause_id=payload.cause_id,
        amount=payload.amount,
        status='completed'
    )
    db.add(donation)
    await db.flush() # flush to get donation.id

    # 2. Grow the world
    planting = Planting(
        world_id=world.id,
        donation_id=donation.id,
        asset_type=cause.biome_type,
        stage='seed'
    )
    db.add(planting)
    
    # Update world XP (1 XP per rupee donated)
    world.xp += int(payload.amount)
    
    # We will implement tier unlock logic later based on XP or total_donated

    await db.commit()
    await db.refresh(wallet)
    await db.refresh(planting)

    return wallet, planting

async def get_donation_history(db: AsyncSession, user_id: UUID):
    stmt = select(Donation).where(Donation.user_id == user_id).order_by(Donation.donated_at.desc())
    result = await db.execute(stmt)
    return result.scalars().all()
