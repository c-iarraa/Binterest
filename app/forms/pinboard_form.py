from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired


class NewPinboard(FlaskForm):

    name = StringField('name', validators=[DataRequired()])
