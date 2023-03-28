from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User
from sqlalchemy import MetaData
from sqlalchemy.orm import relationship

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


class Comment(db.Model):
    __tablename__= 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id')), nullable = False)
    comment = db.Column(db.String(100), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    users = db.relationship("User", back_populates="comments")
    pin = db.relationship("Pin", back_populates="comments")


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'pin_id': self.pin_id,
            'comment': self.comment,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
