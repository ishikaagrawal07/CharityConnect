from pydantic import BaseModel
from uuid import UUID
from typing import Optional

class CauseResponse(BaseModel):
    id: UUID
    name: str
    description: Optional[str] = None
    ngo_partner: Optional[str] = None
    biome_type: Optional[str] = None
    icon: Optional[str] = None

    class Config:
        from_attributes = True
