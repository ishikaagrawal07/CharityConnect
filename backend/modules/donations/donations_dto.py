from pydantic import BaseModel, Field
from uuid import UUID
from decimal import Decimal
from typing import List, Optional
from datetime import datetime

class DonateRequest(BaseModel):
    cause_id: UUID
    amount: Decimal = Field(..., gt=0)

class PlantingResponse(BaseModel):
    id: UUID
    asset_type: Optional[str] = None
    stage: str
    planted_at: datetime
    
    class Config:
        from_attributes = True

class DonateResponse(BaseModel):
    new_balance: Decimal
    planting: PlantingResponse
    message: str

class DonationHistoryResponse(BaseModel):
    id: UUID
    cause_id: UUID
    amount: Decimal
    status: str
    donated_at: datetime
    
    class Config:
        from_attributes = True
