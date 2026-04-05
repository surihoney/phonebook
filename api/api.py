import pymysql
import os
from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

def get_db_connection():
	load_dotenv()
	return pymysql.connect(
		host=os.getenv('MYSQL_HOST'),
		user=os.getenv('MYSQL_USER'),
		password=os.getenv('MYSQL_PASSWORD'),
		database=os.getenv('MYSQL_DB'),
		cursorclass=pymysql.cursors.DictCursor,
	)


@app.route('/')
@cross_origin()
def contact_list():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT COUNT(*) AS cnt
                FROM information_schema.tables
                WHERE table_schema = DATABASE() AND table_name = %s
                """,
                ('contacts',),
            )
            exists = cur.fetchone()['cnt'] == 1
            if exists:
                cur.execute(
                    'SELECT id, name, phone, email FROM contacts'
                )
                result = cur.fetchall()
            else:
                cur.execute(
                    """
                    CREATE TABLE contacts (
                        name VARCHAR(100) NOT NULL,
                        phone VARCHAR(50) NOT NULL,
                        email VARCHAR(100) DEFAULT NULL,
                        id INT NOT NULL AUTO_INCREMENT,
                        PRIMARY KEY (id)
                    )
                    """
                )
                conn.commit()
                result = []
    finally:
        conn.close()
    return jsonify(result)


@app.route('/savecontact', methods=['GET', 'POST'])
def save_contact():
    if request.method == 'GET':
        return jsonify({'status': 'success'})

    data = request.get_json(silent=True) or {}
    rec_id = data.get('id', 0)
    name = data['name']
    phone = data['phone']
    email = data.get('email')

    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            if rec_id and int(rec_id) > 0:
                cur.execute(
                    'UPDATE contacts SET name = %s, phone = %s, email = %s WHERE id = %s',
                    (name, phone, email, int(rec_id)),
                )
            else:
                cur.execute(
                    'INSERT INTO contacts (name, phone, email) VALUES (%s, %s, %s)',
                    (name, phone, email),
                )
            conn.commit()
    finally:
        conn.close()

    resp = jsonify({'status': 'saved'})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


@app.route('/getcontact/<string:id>', methods=['GET'])
def get_contact(id):
    rec_id = int(id)
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute(
                'SELECT id, name, phone, email FROM contacts WHERE id = %s',
                (rec_id,),
            )
            row = cur.fetchone()
    finally:
        conn.close()

    if row is None:
        return jsonify(None)
    return jsonify(row)


@app.route('/delete/<string:id>', methods=['POST'])
def delete_contact(id):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM contacts WHERE id = %s', (int(id),))
            conn.commit()
    finally:
        conn.close()

    resp = jsonify({'status': 'deleted'})
    resp.headers.add('Access-Control-Allow-Origin', '*')
    return resp


if __name__ == '__main__':
    app.run(debug=True)
