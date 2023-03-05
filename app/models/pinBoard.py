from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .joinTable import pins_boards_table


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

class PinBoard(db.Model):
    __tablename__ = 'pinboards'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    # pins = db.relationship(
    #     "Pin",
    #     secondary=pins_boards_table,
    #     back_populates="pinboards"
    # )

    users = db.relationship("User", back_populates="pinboards")

    pins = db.relationship("Pin", secondary=pins_boards_table, back_populates="pinboards")

    # pins = db.relationship("Pin", back_populates="pinboards")



    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

    def to_dict_pins(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'name': self.name,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
            'pin': [p.to_dict() for p in self.pins]
        }
