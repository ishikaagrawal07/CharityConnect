from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status
from db.model import User, Wallet, World
from modules.auth.auth_dto import RegisterRequest, LoginRequest
from utils.jwt_utilities import get_password_hash, verify_password, create_access_token

async def register_user(db: AsyncSession, request: RegisterRequest):
    # Check if user exists
    stmt = select(User).where(User.email == request.email)
    result = await db.execute(stmt)
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already registered")

    # Create user
    hashed_password = get_password_hash(request.password)
    new_user = User(
        name=request.name,
        email=request.email,
        password=hashed_password
    )
    db.add(new_user)
    await db.flush()  # To get the new_user.id

    # Create Wallet (1:1)
    new_wallet = Wallet(user_id=new_user.id)
    db.add(new_wallet)

    # Create World (1:1)
    new_world = World(user_id=new_user.id)
    db.add(new_world)

    await db.commit()
    await db.refresh(new_user)
    return new_user

async def authenticate_user(db: AsyncSession, request: LoginRequest):
    stmt = select(User).where(User.email == request.email)
    result = await db.execute(stmt)
    user = result.scalars().first()

    if not user or not verify_password(request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return access_token
