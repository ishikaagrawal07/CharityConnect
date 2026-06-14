from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from db.model import User
from utils.dependencies import get_current_user
from modules.donations.donations_dto import DonateRequest, DonateResponse, DonationHistoryResponse
from modules.donations import donations_service

router = APIRouter(prefix="/donations", tags=["Donations"])

@router.post("/donate", response_model=DonateResponse)
async def make_donation(
    request: DonateRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    wallet, planting = await donations_service.donate(db, user.id, request)
    return {
        "new_balance": wallet.balance,
        "planting": planting,
        "message": "Donation planted! Your world is growing."
    }

@router.get("/history", response_model=List[DonationHistoryResponse])
async def get_history(
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    return await donations_service.get_donation_history(db, user.id)
