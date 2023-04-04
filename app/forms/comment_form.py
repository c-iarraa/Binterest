from flask_wtf import FlaskForm
from wtforms import TextAreaField
from wtforms.validators import DataRequired

class NewComment(FlaskForm):

    comment = TextAreaField('comment', validators=[DataRequired()])

