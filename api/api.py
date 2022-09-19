from urllib import response
from flask import Flask, jsonify, render_template, request
from flask_restful import Resource, Api
from flask_mysqldb import MySQL
from json import *
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, resources={r'/*': {'origins': '*'}})

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'phonebook'

mysql = MySQL(app)

@app.route('/')
@cross_origin()
def contactList():
	cur = mysql.connection.cursor()
	result = []
	tblExist = checkTableExists("contacts")
	if tblExist:
		print('contact table exist')
		cur.execute('''SELECT id, name, phone, email FROM contacts''')
		rv = cur.fetchall()
		columns = [desc[0] for desc in cur.description]
		for row in rv:
			row = dict(zip(columns, row))
			result.append(row)
	else:
		print('contact table not exist, creating...')
		sql = "CREATE TABLE contacts(name VARCHAR(100) NOT NULL, phone VARCHAR(50) NOT NULL, email VARCHAR(100) DEFAULT NULL, id int NOT NULL AUTO_INCREMENT, PRIMARY KEY (`id`))"
		cur.execute(sql)
		mysql.connection.commit()
		print("Table created successfully........")

	return jsonify(result)

def checkTableExists(tablename):
	cur = mysql.connection.cursor()
	cur.execute("""
		SELECT COUNT(*)
		FROM information_schema.tables
		WHERE table_name = '{0}'
		""".format(tablename.replace('\'', '\'\'')))
	if cur.fetchone()[0] == 1:
		cur.close()
		return True

	cur.close()
	return False

@app.route('/savecontact', methods = ['GET','POST'])
def saveContact():
	if request.method == 'GET':
		jsonResp = {'status': 'success'}
		return jsonify(jsonResp)

	if request.method == 'POST':
		id = request.json['id']
		name = request.json['name']
		phone = request.json['phone']
		email = request.json['email']
		cursor = mysql.connection.cursor()
		if id > 0:
			insertParams = [name, phone, email, id]
			insertQuery = "update contacts set name = %s, phone = %s, email = %s where id = %s"
		else:
			insertParams = [name, phone, email]
			insertQuery = "insert into contacts (name, phone, email) values (%s, %s, %s)"
		cursor.execute(insertQuery, insertParams)
		mysql.connection.commit()
		cursor.close()
		response = jsonify({'status': 'saved'})
		response.headers.add('Access-Control-Allow-Origin', '*')
		return response

@app.route('/getcontact/<string:id>', methods=['GET'])
def getContact(id):
	recId = int(id)
	contact = {}
	cur = mysql.connection.cursor()
	retrieveSingleRecord = "select id, name, phone, email from contacts where id = %s"
	cur.execute(retrieveSingleRecord, (recId,))
	row = cur.fetchone()
	if row == None:
		contact = None
	else:
		columns = cur.description
	for (index, column) in enumerate(row):
		contact[columns[index][0]] = column
	print(contact)
	return contact

@app.route('/delete/<string:id>', methods=['POST'])
def delete(id):
	cur = mysql.connection.cursor()
	cur.execute("DELETE FROM contacts WHERE id = %s", (id))
	mysql.connection.commit()
	cur.close()
	response = jsonify({'status': 'deleted'})
	return response


if __name__ == '__main__':
	app.run(debug=True)
