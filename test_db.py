import asyncio
from backend.db.database import engine

async def test():
    print('Testing connection...')
    try:
        async with engine.begin() as conn:
            print('Connected successfully!')
    except Exception as e:
        print('Connection failed:', e)

asyncio.run(test())
