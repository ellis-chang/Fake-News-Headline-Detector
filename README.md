# # CSE 190 Final Project
### CSE 190 Human-AI Interaction - Spring 2021

#### Members:
* Mark Atkisson
* Justyn Radovan
* Albert Estevan
* Ellis Chang

- - - -
## About
Predicts whether a news headline is fake or real using TFIDF and logistic regression.

**Note:** Only tested with Python 3.8, may not work for other versions.

- - - -

## Initial Setup
Open two terminal windows, one for the front-end and one for the back-end.

- - - -

### Backend
While not required, we highly recommend creating a virtual environment using the virtualenv package.

You can install virtualenv with pip using the following:

`pip install virtualenv`

Next, change into the backend directory (if not there already) and run the following to create a new virtualenv environment.

`virtualenv -p Python3 .`

Then run the following to activate your virtualenv environment.

`source bin/activate`

Install all the required packages using pip. 

`pip install -Ur requirements.txt -t ./lib/python3.8/site-packages`

- - - -

### Frontend
In your other terminal window, change into the frontend directory and simply run the following to complete initial setup.

`npm install`

- - - -

## Running the Program
Open two terminal windows (if you don’t have them open already), one for the backend, and one for the frontend. 

### Backend
Change into the backend directory (if not there already) in one of your terminal windows. 

Run the following to ensure your virtualenv environment is activated.
`source bin/activate`

Run the following

`export FLASK_APP=app.py`

followed by

`flask run`

to start the backend.

### Frontend
Change into the frontend directory (if not there already) in your other terminal window, and run the following command.

`npm start`



