from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from mysql_helper import MySqlHelper
app=Flask(__name__)
CORS(app)
#connect to local database
db=MySqlHelper('localhost', 3306, 'root', '0595', 'auth_system')

@app.route('/api/register', methods=['POST'])
def register():
    data=request.get_json()
    username=data.get('username', '').strip()
    password=data.get('password', '').strip()
    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Username and password are required'}), 400
    #check if this user already exists in database
    check_sql="SELECT id FROM users WHERE username = %s"
    existing_user=db.select(check_sql, (username,))
    #if list is not empty, means name is taken
    if existing_user:
        return jsonify({'status': 'error', 'message': 'Username already exists'}), 409
    #hash the password for safety
    hashed_pw=generate_password_hash(password)
    #save to database
    insert_sql="INSERT INTO users (username, password_hash) VALUES (%s, %s)"
    rows=db.execute(insert_sql, (username, hashed_pw))
    if rows > 0:
        return jsonify({'status': 'success', 'message': 'Registration successful'}), 201
    else:
        return jsonify({'status': 'error', 'message': 'Database execution failed'}), 500
    
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username', '').strip()
    password = data.get('password', '').strip()
    if not username or not password:
        return jsonify({'status': 'error', 'message': 'Username and password are required'}), 400
    
    sql = "SELECT id, password_hash FROM users WHERE username = %s"
    result = db.select(sql, (username,))
    
    if result and check_password_hash(result[0]['password_hash'], password):
        return jsonify({
            'status': 'success', 
            'message': 'Login successful', 
            'user_id': result[0]['id']
        }), 200
    else:
        return jsonify({'status': 'error', 'message': 'Invalid username or password'}), 401
    
if __name__ == '__main__':
    app.run(debug=True, port=5000)