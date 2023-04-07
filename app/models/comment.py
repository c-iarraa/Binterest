from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable = False)
    pin_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('pins.id'), ondelete='CASCADE'), nullable = False)
    comment = db.Column(db.String, nullable = False)
    created_at = db.Column(db.DateTime, server_default = func.now())



    user = db.relationship('User', back_populates='comments')
    pin = db.relationship('Pin', back_populates='comments')


    def to_dict(self):
        return {
            'id': self.id,
            'pin_id': self.pin_id,
            'user_id': self.user_id,
            'comment': self.comment,
            'created_at': self.created_at
        }
