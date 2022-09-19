# phonebook
Simple phonebook CRUD with python (flask) and react js

Requirements:
1. Must have mysql server running
2. Python 3
3. NodeJS version 15 or onwwards

Database config:
1. Open file `api/api.py` and change mysql configuration details below to match your mysql setup

```
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'phonebook'
```

Usage:

1. Backend

In the terminal, open a new tab
go to the folder `api`

Set up virtualenv

```shell script
python3 -m venv venv
source venv/bin/activate
```

Install packages

```shell script
pip install --upgrade pip
pip install -r requirements.txt
```

Run development server

```shell script
python api.py
```

2. Frontend

In the terminal,
go to the folder `phonebook` and

Install packages

run `npm install`


Build scripts

`npm start`


Open browser , and navigate to `http://localhost:3000`

