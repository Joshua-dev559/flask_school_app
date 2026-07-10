import os
from datetime import timedelta

class Config:
    _db_url = os.environ.get('DATABASE_URL', 'sqlite:///students.db')
    SQLALCHEMY_DATABASE_URI = _db_url.replace('postgres://', 'postgresql://', 1)
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-prod')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-prod')
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)