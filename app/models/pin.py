from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

class Pin(db.Model):
    __tablename__: 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ownerId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    boardId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pinboards.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    destinationLink = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    pinboards = db.relationship("PinBoard", back_populates="pins")


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.ownerId,
            'boardId': self.boardId,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.imageUrl,
            'destinationLink': self.destinationLink,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
