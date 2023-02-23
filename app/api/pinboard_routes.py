from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User, Pin, PinBoard
from sqlalchemy.sql import func
from app.forms import NewPinboard


pinboard_routes = Blueprint('pinboards', __name__)


# Get all boards
@pinboard_routes.route('/')
def get_all_boards():
    print('ijohoihoihoihohi')
    boards = PinBoard.query.all()
    print('***********')
    data = [board.to_dict() for board in boards]
    return {'boards': data}


# Get all boards for a specific user
@pinboard_routes.route('/<int:id>')
# @login_required
def get_boards_by_current_user(id):
    boards = PinBoard.query.filter(PinBoard.owner_id == id)

    return {'boards' :[board.to_dict() for board in boards]} , 200


# Create a board
    @pinboard_routes.route('/<int:id>', methods=['POST', 'GET'])
    # @login_required
    def create_board(id):
        form = NewPinboard()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit() :
            new_board = PinBoard(owner_id = id)

            form.populate_obj(new_board)
            db.session.add(new_board)
            db.session.commit()
            return new_board.to_dict()

        if form.errors:
            return form.errors
