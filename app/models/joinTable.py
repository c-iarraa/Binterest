from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
# from .pin import Pin
# from .model import PinBoard



Base = declarative_base()

pins_boards_table = db.Table("pins_boards_table",
    db.Model.metadata,
    db.Column('pinboard_id', db.Integer, db.ForeignKey(add_prefix_for_prod('pinboards.id')), primary_key=True),
    db.Column('pin_id', db.Integer, db.ForeignKey(add_prefix_for_prod('pin.id')), primary_key=True)
)


if environment == "production":
        op.execute(f"ALTER TABLE pins_boards_table SET SCHEMA {SCHEMA};")
