from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user, login_user
from app.models import db, User, Comment, Pin
from sqlalchemy.sql import func
from app.forms import NewComment
from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# Delete comment by Comment ID
@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):

    comment = Comment.query.get(comment_id)

    db.session.delete(comment)
    db.session.commit()

    return {"message": 'successfully deleted'}

#All comments for a specfic transaction by ID
@comment_routes.route('/<int:id>/comments')
def all_comments(id):
    comments = Comment.query.filter(Comment.pin_id == id)

    return {'comments' :[comment.to_dict() for comment in comments]} , 200

#post comment
@comment_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def post_comment(id):

    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_comment = Comment()
        form.populate_obj(new_comment)

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict(), 200


    if form.errors:
        return {
            "errors": form.errors
        }, 400

