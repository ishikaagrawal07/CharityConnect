import uuid
from datetime import datetime
from sqlalchemy import Column, String, Numeric, Integer, ForeignKey, DateTime, Uuid
from sqlalchemy.orm import relationship
from db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    wallet = relationship("Wallet", back_populates="user", uselist=False)
    world = relationship("World", back_populates="user", uselist=False)

class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, ForeignKey("users.id"))
    balance = Column(Numeric(10, 2), default=0.00)
    total_saved = Column(Numeric(10, 2), default=0.00)
    total_donated = Column(Numeric(10, 2), default=0.00)

    user = relationship("User", back_populates="wallet")

class World(Base):
    __tablename__ = "worlds"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, ForeignKey("users.id"))
    tier = Column(String(30), default="seedling_plot")
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    last_watered = Column(DateTime, nullable=True)

    user = relationship("User", back_populates="world")
