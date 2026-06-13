from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from db.database import get_db
from modules.auth.auth_dto import RegisterRequest, LoginRequest, TokenResponse, UserResponse
from modules.auth import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=201)
async def register(request: RegisterRequest, db: AsyncSession = Depends(get_db)):
    return await auth_service.register_user(db, request)

@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest, db: AsyncSession = Depends(get_db)):
    access_token = await auth_service.authenticate_user(db, request)
    return {"access_token": access_token, "token_type": "bearer"}
