from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from .user import User
from sqlalchemy import MetaData


import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# --------------------------------------------------------------------------------------------------
# PIN AND PINBOARD JOIN TABLE

# pins_boards_table = db.Table(
#     "pin_pinboards",
#     db.Model.metadata,
#     db.Column("pinboards", db.Integer, db.ForeignKey(add_prefix_for_prod("pinboards.id")), primary_key=True),
#     db.Column("pins", db.Integer, db.ForeignKey(add_prefix_for_prod("pins.id")), primary_key=True)
# )

# if environment == "production":
#     pin_pinboards.schema = SCHEMA


# --------------------------------------------------------------------------------------------------
# PIN MODEL

class Pin(db.Model):
    __tablename__: 'pins'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    # board_id = db.Column(db.Integer, nullable=False)
     # board_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pinboards.id')), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    imageUrl = db.Column(db.String(255), nullable=False)
    destinationLink = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
    updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

    # pinboards = db.relationship("PinBoard", back_populates="pins")
    # pinboards = db.relationship(
    #     "PinBoard",
    #     secondary=pins_boards_table,
    #     back_populates="pins"
    # )


    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            # 'board_id': self.board_id,
            'title': self.title,
            'description': self.description,
            'imageUrl': self.imageUrl,
            'destinationLink': self.destinationLink,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }

# --------------------------------------------------------------------------------------------------
# PINBOARD MODEL

# class PinBoard(db.Model):
#     __tablename__ = 'pinboards'

#     id = db.Column(db.Integer, primary_key=True)
#     owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
#     name = db.Column(db.String(100), nullable=False)
#     createdAt = db.Column(db.DateTime, nullable=False, server_default=func.now())
#     updatedAt = db.Column(db.DateTime, nullable=False, server_default=func.now())

#     # pins = db.relationship("Pin", back_populates="pinboards")
#     pins = db.relationship(
#         "Pin",
#         secondary=pins_boards_table,
#         back_populates="pinboards"
#     )

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'owner_id': self.owner_id,
#             'name': self.name,
#             'createdAt': self.createdAt,
#             'updatedAt': self.updatedAt,
#         }
