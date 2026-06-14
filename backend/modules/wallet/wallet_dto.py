from pydantic import BaseModel, Field
from decimal import Decimal
from uuid import UUID

class WalletResponse(BaseModel):
    id: UUID
    user_id: UUID
    balance: Decimal
    total_saved: Decimal
    total_donated: Decimal

    class Config:
        from_attributes = True

class AddMoneyRequest(BaseModel):
    amount: Decimal = Field(..., gt=0, description="Amount must be strictly positive")
