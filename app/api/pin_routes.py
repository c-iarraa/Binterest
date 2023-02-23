from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import db, User, Pin
from sqlalchemy.sql import func
from app.forms import NewPin


pin_routes = Blueprint('pins', __name__)


# Get all pins
@pin_routes.route('/')
def get_all_pins():

    # set pin = all records that match our query as a list of objects.
    pins = Pin.query.all()
    print('***********')
    data = [pin.to_dict() for pin in pins]
    return {'pins': data}


# Get all pins for a specific user
@pin_routes.route('/<int:id>')
# @login_required
def get_pins_by_current_user(id):
    pins = Pin.query.filter(Pin.owner_id == id)

    return {'pins' :[pin.to_dict() for pin in pins]} , 200


# Get details of a pin from an id
@pin_routes.route('/<int:id>/')
# @login_required
def get_pins_by_pin_id(id):
    pin = Pin.query.get(id)

    if not pin:
        return {"errors": "Pin not found"}, 404

    return {'pin': pin.to_dict()} , 200




# Create a pin
    @pin_routes.route('/<int:id>', methods=['POST', 'GET'])
    # @login_required
    def create_pin(id):

        # create an instance of the pin form
        form = NewPin()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit() :
            # create new instance of pin model and set id to owner of the pin
            new_pin = Pin(owner_id = id)

            # copy the data onto fields on the pin object.
            form.populate_obj(new_pin)
            # edit/add pin in the database then commit to db
            db.session.add(new_pin)
            db.session.commit()
            # return new pin in dictionary
            return new_pin.to_dict()

        if form.errors:
            return form.errors

        # if form.validate_on_submit():
        #     new_pin = Pin(
        #     owner_id = int(current_owner.id),
        #     title = request.get_json()["title"],
        #     description = request.get_json()["description"],
        #     imageUrl = request.get_json()["imageUrl"],
        #     )

        #     db.session.add(new_pin)
        #     db.session.commit()
        #     return new_pin.to_dict()

        # if form.errors:
        #     return form.errors



# Add an Image to a pin based on the pin's id
# @pin_routes.route('/<int:id>/images', methods=['POST', 'GET'])
# # @login_required
# def pin_image(id):

#     pin = Pin.query.get(id)

#     if not pin:
#       return {"errors": ["pin could not be found"]}, 404

#     form = NewPin()
#     form["csrf_token"].data = request.cookies["csrf_token"]





# Edit a pin
@pin_routes.route('/<int:id>', methods=['PUT', 'GET'])
# @login_required
def edit_pin(id):

    # grab a specific pin by the id passed in through the url
    pin = Pin.query.get(id)

    # if there is no pin with a matching id say this
    if not pin:
        return {"errors": ["Pin could not be found"]}, 404

    # create an instance of the pin form
    form = NewPin()
    form["csrf_token"].data = request.cookies["csrf_token"]


    # check if request is a POST request, and run validators configured for each field then commit to database
    if form.validate_on_submit():
        db.session.commit()

    #  return pin in dictionary
    return pin.to_dict()


    if form.errors:
        return form.errors


# Delete a pin
@pin_routes.route('/<int:id>', methods=["DELETE"])
# @login_required
def delete_pin(id):

    # grab a specific pin by the id passed in through the url
    pin = Pin.query.get(id)


    # if there is no pin with a matching id say this
    if pin is None:
        return {"errors": ["Pin could not be found"]}, 404
        # if theres a matching pin id, delete it and commit it to the database
        db.session.delete(pin)
        db.session.commit()

    # say this if pin is deleted successfully
    return {"message": ["Pin successfully deleted"]},200
