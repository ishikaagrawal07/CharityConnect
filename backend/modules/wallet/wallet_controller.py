from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from db.model import User
from utils.dependencies import get_current_user
from modules.wallet.wallet_dto import WalletResponse, AddMoneyRequest
from modules.wallet import wallet_service

router = APIRouter(prefix="/wallet", tags=["Wallet"])

@router.get("/me", response_model=WalletResponse)
async def get_my_wallet(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await wallet_service.get_wallet(db, user.id)

@router.post("/add", response_model=WalletResponse)
async def add_money(
    request: AddMoneyRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await wallet_service.add_money(db, user.id, request)
