from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class NewJoinTable(FlaskForm):

    board_id = IntegerField('board_id', validators=[DataRequired()])
    pin_id = IntegerField('pin_id', validators=[DataRequired()])
