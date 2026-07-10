from app import app, db, bcrypt
from app.models import User, Course, Club, Student

with app.app_context():
    db.drop_all()
    db.create_all()

    # Courses
    cs = Course(name='Computer Science')
    biz = Course(name='Business')
    eng = Course(name='Engineering')
    db.session.add_all([cs, biz, eng])

    # Clubs
    chess = Club(name='Chess Club')
    debate = Club(name='Debate Club')
    coding = Club(name='Coding Club')
    db.session.add_all([chess, debate, coding])

    # Students
    students = [
        Student(name='Alice Wanjiru', email='alice@school.com', phone='0700000001', course=cs, clubs=[chess, coding]),
        Student(name='Brian Otieno', email='brian@school.com', phone='0700000002', course=biz, clubs=[debate]),
        Student(name='Carol Mwangi', email='carol@school.com', phone='0700000003', course=eng, clubs=[chess, debate]),
        Student(name='David Kamau', email='david@school.com', phone='0700000004', course=cs, clubs=[]),
    ]
    db.session.add_all(students)

    # Demo user
    pw = bcrypt.generate_password_hash('password123').decode('utf-8')
    db.session.add(User(username='admin', email='admin@school.com', password=pw))

    db.session.commit()
    print('Seeded successfully. Login: admin@school.com / password123')
