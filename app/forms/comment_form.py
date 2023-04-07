from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class NewComment(FlaskForm):
    pin_id = IntegerField('Pin Id', validators=[DataRequired()])
    user_id = StringField('User Id', validators=[DataRequired()])
    comment = StringField('Comment', validators=[DataRequired()])
