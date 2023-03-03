from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User, Pin, PinBoard, pins_boards_table
from sqlalchemy.sql import func
from app.forms import NewPinboard


pinboard_routes = Blueprint('pinboards', __name__)


# Get all jointable pins for a pinboard by pinboard-id
@pinboard_routes.route('<int:id>/pinandboard')
# @login_required
def get_board_pins(id):
    # print('inside of backend route')
    test = PinBoard.query.filter(PinBoard.id == id).all()

    return {'board_pins' :[board.to_dict_pins() for board in test]} , 200


# Get all boards for a specific user
@pinboard_routes.route('/<int:id>')
# @login_required
def get_boards_by_current_user(id):
    # print ('inside of route with id', id)
    boards = PinBoard.query.filter(PinBoard.owner_id == id)
    # boards = PinBoard.query.all()
    # print ('boards from backend route', boards)

    return {'boards' :[board.to_dict() for board in boards]} , 200
    # return {'boards':board.pins_boards_table()}, 200


# Get details of a board from an id
@pinboard_routes.route('/<int:id>/details')
def get_board_by_id(id):
    print('inside of backend details route')
    board = PinBoard.query.get(id)
    print('board query in route', board)
    test = PinBoard.query.filter(PinBoard.id == id).all()

    if not board:
        return {'errors': 'Pinboard could not be found'}, 404

    # return {'pinboard': board.todict()}, 200
    return {'boards': [board.to_dict_pins() for board in test]}, 200

# Create a board
@pinboard_routes.route('/<int:id>/create', methods=['POST'])
# @login_required
def create_board(id):
    print('inside of create route')
    form = NewPinboard()
    print('new instance of form', form)
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit() :
        new_board = PinBoard(owner_id = id)
    form.populate_obj(new_board)
    db.session.add(new_board)
    db.session.commit()
    return new_board.to_dict()

    if form.errors:
        return form.errors


# Edit a board
@pinboard_routes.route('<int:id>/update', methods=['PUT'])
def edit_board(id):
    print('inside of update route with id', id)

    # grab a specific pin by the id passed in through the url
    updatedBoard = PinBoard.query.get(id)
    print('updated board', updatedBoard)

    # error handling
    if not updatedBoard:
        return {'errors': 'Pinboard could not be found'}, 404

     # create an instance of the pin form
    form = NewPinboard()
    print('new instance of form', form)
    form['csrf_token'].data = request.cookies['csrf_token']

    # check if request is a POST request, and run validators configured for each field then commit to database
    if form.validate_on_submit():
        print('form validates on submit')
        form.populate_obj(updatedBoard)
        print('new info populated in board', updatedBoard)
        db.session.add(updatedBoard)
        db.session.commit()

    #  return pin in dictionary
    return updatedBoard.to_dict(), 200


# Delete a board
@pinboard_routes.route('<int:id>', methods=['DELETE'])
def delete_board(id):

    # grab a specific pin by the id passed in through the url
    board = PinBoard.query.get(id)

    db.session.delete(board)
    db.session.commit()

    return {'message': ['Pinboard has successfully deleted']}, 200
