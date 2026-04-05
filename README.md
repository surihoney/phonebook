# phonebook
Simple phonebook CRUD with python (flask) and react js

Requirements:
1. Must have mysql server running
2. Python 3
3. NodeJS version 15 or onwwards

Database config:
1. Access MYSQL database and create database `phonebook`
2. Open file `.env-sample` and change mysql configuration details for example like below, to match your mysql setup

```
MYSQL_HOST=127.0.0.1
MYSQL_USER=admin
MYSQL_PASSWORD=
MYSQL_DB=phonebook
```

3. Rename the `.env-sample` to `.env`

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

export DYLD_LIBRARY_PATH="/usr/local/mysql/lib:$PATH"
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


Dev build

`npm start` or `npm run dev`


Production build

`npm run build`


Preview build

`npm run preview`


Test scripts

`npm test`


Open browser , and navigate to `http://localhost:3000`

