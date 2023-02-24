from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired

class NewPin(FlaskForm):

    title = StringField('title', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    imageUrl = StringField('imageUrl', validators=[DataRequired()])
    destinationLink = StringField('destinationLink', validators=[DataRequired()])
