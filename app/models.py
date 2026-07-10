from app import db
from flask_login import UserMixin

student_club = db.Table(
    "student_club",
    db.Column("student_id", db.Integer, db.ForeignKey("student.id")),
    db.Column("club_id", db.Integer, db.ForeignKey("club.id"))
)

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Course(db.Model):
    __tablename__ = 'course'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    students = db.relationship('Student', backref='course')

class Student(db.Model):
    __tablename__ = 'student'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    phone = db.Column(db.String)
    course_id = db.Column(db.Integer, db.ForeignKey('course.id'))
    clubs = db.relationship("Club", secondary=student_club, backref="students")

class Club(db.Model):
    __tablename__ = "club"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)