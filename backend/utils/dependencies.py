from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from db.database import get_db
from db.model import User
from utils.jwt_utilities import decode_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(
    token: str = Depends(oauth2_scheme), 
    db: AsyncSession = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
        
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
        
    import uuid
    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError:
        raise credentials_exception
        
    stmt = select(User).where(User.id == user_uuid)
    result = await db.execute(stmt)
    user = result.scalars().first()
    
    if user is None:
        raise credentials_exception
        
    return user
