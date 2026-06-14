from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException
from db.model import Wallet, User
from modules.wallet.wallet_dto import AddMoneyRequest
from uuid import UUID

async def get_wallet(db: AsyncSession, user_id: UUID) -> Wallet:
    stmt = select(Wallet).where(Wallet.user_id == user_id)
    result = await db.execute(stmt)
    wallet = result.scalars().first()
    
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
        
    return wallet

async def add_money(db: AsyncSession, user_id: UUID, request: AddMoneyRequest) -> Wallet:
    wallet = await get_wallet(db, user_id)
    
    wallet.balance += request.amount
    wallet.total_saved += request.amount
    
    # Optional: We could trigger streak updates here later.
    
    await db.commit()
    await db.refresh(wallet)
    return wallet
