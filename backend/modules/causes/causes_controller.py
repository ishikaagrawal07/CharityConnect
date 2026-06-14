from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from modules.causes.causes_dto import CauseResponse
from modules.causes import causes_service

router = APIRouter(prefix="/causes", tags=["Causes"])

@router.get("/", response_model=List[CauseResponse])
async def list_causes(db: AsyncSession = Depends(get_db)):
    return await causes_service.get_all_causes(db)
