from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user, login_user
from app.models import db, User, Comment, Pin
from sqlalchemy.sql import func
from app.forms import NewComment
from datetime import datetime

comment_routes = Blueprint('comments', __name__)


# Get all comments
@comment_routes.route('/<int:pin_id>')
@login_required
def get_comments(pin_id):
    '''
    Query's for all comments of a pin by pin id.
    '''
    all_comments = Pin.query.get(pin_id).comments
    comments = [comment.to_dict() for comment in all_comments]

    return comments, 200


# Create a comment
@comment_routes.route('/<int:pin_id>', methods = ['POST'])
@login_required
def create_comment (pin_id):
    '''
    Query's comment by comment id and allows users to
    update their comments on a pin
    '''

    form = NewComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_comment = Comment(
            comment = form.data['comment'],
            pin_id = pin_id,
            user_id = current_user.id
        )

        db.session.add(new_comment)
        db.session.commit()
        return  new_comment.to_dict(), 201

    return {'errors': form.errors}, 401
    

# Edit a comment
@comment_routes.route('/<int:comment_id>', methods = ['PUT'])
@login_required
def update_comment (comment_id):
    '''
    Query's pin by pin id and allows users to
    update their comments on a pin
    '''
    commentById = Comment.query.get(comment_id)

    if not commentById:
        return {'errors': ["Comment not found"]}, 404

    if commentById.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this comment."]}, 403

    if commentById.user_id == current_user.id:
        form = NewComment()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit:
            commentById.comment = form.data['comment']
            db.session.commit()

            return commentById.to_dict(), 200

        return {'errors': form.errors}, 401



# Delete a comment
@comment_routes.route('/<int:comment_id>', methods = ['DELETE'])
@login_required
def delete_comment (comment_id):
    '''
    Query's comment by comment id and allows users to
    delete their comments on a pin
    '''

    comment = Comment.query.get(comment_id)

    if not comment:
        return {'errors': ["Comment not found"]}, 404

    if comment.user_id != current_user.id:
        return {"errors": ["You are not authorized to edit this comment."]}, 403

    if comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return {"messagee": ["Comment successfully deleted"]}, 200
