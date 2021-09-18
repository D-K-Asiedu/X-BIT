from re import L
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, IntegerField, FileField
from wtforms.validators import DataRequired, Length, Email, EqualTo


class RegistrationForm(FlaskForm):
    name = StringField('Name',validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')


class LoginForm(FlaskForm):
    email = StringField('Email',validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Login')

class Add_Product(FlaskForm):
    name = StringField("Product Name", validators=[DataRequired(), Length(min=2, max=100)])
    price = IntegerField("Product Price", validators=[DataRequired()])
    description = StringField("Product Description", validators=[DataRequired(), Length(min=2, max=100)])
    file = FileField("Product Image", validators=[DataRequired()])
    prescribed = BooleanField("Prescribed")
    submit = SubmitField('Submit')
