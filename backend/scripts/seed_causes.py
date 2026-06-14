import asyncio
import os
import sys

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import delete
from db.database import engine
from db.model import Cause

async def seed():
    AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with AsyncSessionLocal() as session:
        # Delete existing generic causes if they exist (ignoring constraint errors for simplicity, or just fetching and deleting)
        # To avoid foreign key issues with existing donations, we could just add the new ones,
        # but let's try to delete the old generic ones if they have no donations.
        try:
            await session.execute(delete(Cause).where(Cause.name.in_(["Tree Plantation", "Education", "Healthcare"])))
            await session.commit()
            print("Deleted old generic causes.")
        except Exception as e:
            print("Could not delete old causes (might have donations attached), proceeding to add new ones. Error:", e)
            await session.rollback()
            
        new_causes = [
            Cause(name="Global Reforestation", description="Restoring biodiversity by planting native trees across sub-Saharan Africa and Southeast Asia.", ngo_partner="GreenEarth Foundation", biome_type="tree", icon="🌳"),
            Cause(name="Rural Literacy", description="Providing digital learning tools and physical libraries to remote villages in Latin America.", ngo_partner="EduFuture Alliance", biome_type="school", icon="🏫"),
            Cause(name="Mobile Clinics", description="Deploying specialized medical vans to provide urgent care and vaccinations in crisis zones.", ngo_partner="CareWithoutBorders", biome_type="clinic", icon="🏥"),
            Cause(name="Clean Water Tech", description="Installing solar-powered filtration units in drought-stricken regions to ensure sustainable access.", ngo_partner="AquaVita Initiative", biome_type="water", icon="💧"),
            Cause(name="Ocean Clean-up", description="Removing plastic waste from the Great Pacific Garbage Patch using passive collection systems.", ngo_partner="MarineGuard", biome_type="ocean", icon="🌊"),
            Cause(name="Coding Scholarships", description="Funding full-stack development bootcamps for underprivileged youth in emerging tech hubs.", ngo_partner="TechSeeds Global", biome_type="code", icon="💻")
        ]
        
        session.add_all(new_causes)
        await session.commit()
        print("Successfully seeded 6 new specific causes!")

if __name__ == "__main__":
    asyncio.run(seed())
