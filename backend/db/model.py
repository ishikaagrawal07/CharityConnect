import uuid
from datetime import datetime
from sqlalchemy import Column, String, Numeric, Integer, ForeignKey, DateTime, Uuid, Text
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
    plantings = relationship("Planting", back_populates="world")

class Cause(Base):
    __tablename__ = "causes"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    name = Column(String(100))
    description = Column(Text)
    ngo_partner = Column(String(200))
    biome_type = Column(String(50))
    icon = Column(String(50))

class Donation(Base):
    __tablename__ = "donations"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    user_id = Column(Uuid, ForeignKey("users.id"))
    cause_id = Column(Uuid, ForeignKey("causes.id"))
    amount = Column(Numeric(10, 2))
    status = Column(String(20), default="pending")
    donated_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User")
    cause = relationship("Cause")
    planting = relationship("Planting", back_populates="donation", uselist=False)

class Planting(Base):
    __tablename__ = "plantings"

    id = Column(Uuid, primary_key=True, default=uuid.uuid4)
    world_id = Column(Uuid, ForeignKey("worlds.id"))
    donation_id = Column(Uuid, ForeignKey("donations.id"))
    asset_type = Column(String(40))
    stage = Column(String(20), default="seed")
    planted_at = Column(DateTime, default=datetime.utcnow)
    real_ref = Column(String(200), nullable=True)
    co2_kg_year = Column(Numeric(8, 2), nullable=True)

    world = relationship("World", back_populates="plantings")
    donation = relationship("Donation", back_populates="planting")
