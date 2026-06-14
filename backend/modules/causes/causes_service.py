from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.model import Cause

async def get_all_causes(db: AsyncSession):
    stmt = select(Cause)
    result = await db.execute(stmt)
    causes = result.scalars().all()
    return causes
