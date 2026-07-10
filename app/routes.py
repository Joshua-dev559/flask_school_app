from flask import render_template, redirect, url_for, request, flash, jsonify
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, jwt_required
from app import app, db, bcrypt, login_manager
from app.models import Student, Course, Club, User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- Auth Routes ---

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = bcrypt.generate_password_hash(request.form['password']).decode('utf-8')
        if User.query.filter_by(email=email).first():
            flash('Email already registered.', 'danger')
            return redirect(url_for('signup'))
        user = User(username=username, email=email, password=password)
        db.session.add(user)
        db.session.commit()
        flash('Account created! Please log in.', 'success')
        return redirect(url_for('login'))
    return render_template('signup.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    if request.method == 'POST':
        user = User.query.filter_by(email=request.form['email']).first()
        if user and bcrypt.check_password_hash(user.password, request.form['password']):
            login_user(user)
            return redirect(request.args.get('next') or url_for('home'))
        flash('Invalid email or password.', 'danger')
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

# --- Protected Routes ---

@app.route('/')
@login_required
def home():
    students = Student.query.all()
    return render_template('students.html', students=students)

@app.route('/courses')
@login_required
def courses():
    all_courses = Course.query.all()
    return render_template('courses.html', courses=all_courses)

@app.route('/clubs')
@login_required
def clubs():
    all_clubs = Club.query.all()
    return render_template('clubs.html', clubs=all_clubs)

# --- JWT Auth API ---

@app.route('/api/auth/signup', methods=['POST'])
def api_signup():
    data = request.get_json()
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409
    password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    user = User(username=data['username'], email=data['email'], password=password)
    db.session.add(user)
    db.session.commit()
    token = create_access_token(identity=str(user.id), additional_claims={'username': user.username})
    return jsonify({'token': token, 'username': user.username}), 201

@app.route('/api/auth/login', methods=['POST'])
def api_login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    if not user or not bcrypt.check_password_hash(user.password, data['password']):
        return jsonify({'error': 'Invalid credentials'}), 401
    token = create_access_token(identity=str(user.id), additional_claims={'username': user.username})
    return jsonify({'token': token, 'username': user.username})

# --- API Endpoints ---

@app.route('/api/students', methods=['GET'])
@jwt_required()
def api_students():
    students = Student.query.all()
    return jsonify([{
        'id': s.id, 'name': s.name, 'email': s.email,
        'phone': s.phone, 'course': s.course.name if s.course else None,
        'clubs': [c.name for c in s.clubs]
    } for s in students])

@app.route('/api/students/<int:id>', methods=['GET'])
@jwt_required()
def api_student(id):
    s = Student.query.get_or_404(id)
    return jsonify({'id': s.id, 'name': s.name, 'email': s.email,
                    'phone': s.phone, 'course': s.course.name if s.course else None,
                    'clubs': [c.name for c in s.clubs]})

@app.route('/api/courses', methods=['GET'])
@jwt_required()
def api_courses():
    return jsonify([{'id': c.id, 'name': c.name} for c in Course.query.all()])

@app.route('/api/courses/<int:id>', methods=['GET'])
@jwt_required()
def api_course(id):
    c = Course.query.get_or_404(id)
    return jsonify({'id': c.id, 'name': c.name, 'students': [s.name for s in c.students]})

@app.route('/api/clubs', methods=['GET'])
@jwt_required()
def api_clubs():
    return jsonify([{'id': c.id, 'name': c.name} for c in Club.query.all()])

@app.route('/api/clubs/<int:id>', methods=['GET'])
@jwt_required()
def api_club(id):
    c = Club.query.get_or_404(id)
    return jsonify({'id': c.id, 'name': c.name, 'members': [s.name for s in c.students]})
