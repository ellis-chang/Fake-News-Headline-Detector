# # CSE 190 Final Project
### CSE 190 Spring 2021
#### Members:
* Mark Atkisson
* Justyn Radovan
* Albert Estevan
* Ellis Chang

## About
Predicts whether a news headline is fake or real using TFIDF.

## Installation
Open two terminal windows, one for the front-end and one for the back-end.

### Backend
While not required, we highly recommend creating a virtual environment using the virtualenv package.

You can install with pip using the following:

`pip install virtualenv`


Next, change into the backend folder (if not there already) and run the following

`virtualenv -p Python3 .`

Then

`source bin/activate`

Install all the required packages using pip

`pip install -Ur requirements.txt -t ./lib/python3.8/site-packages`

Finally, run  

`export FLASK_APP=app.py`

followed by

`flask run`

to start the backend.

### Frontend
Simply run

`npm install`

followed by

`npm start`

in your other terminal window.
