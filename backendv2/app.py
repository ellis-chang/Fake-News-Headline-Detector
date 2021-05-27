from flask import Flask, request, jsonify, make_response
from flask_restplus import Api, Resource, fields
# from sklearn.externals import joblib
import pandas as pd
import itertools
import sklearn
import pickle
from sklearn.model_selection import train_test_split    # Split data
from sklearn.feature_extraction.text import TfidfVectorizer     #TF IDF model
from sklearn.linear_model import PassiveAggressiveClassifier    #PA classifier
from sklearn.pipeline import Pipeline   #Bundles the above two into one unit
from sklearn.metrics import confusion_matrix

flask_app = Flask(__name__)
app = Api(app = flask_app, 
		  version = "1.0", 
		  title = "ML React App", 
		  description = "Predict results using a trained model")

name_space = app.namespace('prediction', description='Prediction APIs')

model = app.model('Prediction params', 
				  {'newsHeadLine': fields.String(required = True, 
				  							   description="Headline that you want to determine is real or fake")})

classifier = pickle.load(open("model.pkl", "rb"))

@name_space.route("/")
class MainClass(Resource):

	def options(self):
		response = make_response()
		response.headers.add("Access-Control-Allow-Origin", "*")
		response.headers.add('Access-Control-Allow-Headers', "*")
		response.headers.add('Access-Control-Allow-Methods', "*")
		return response

	@app.expect(model)		
	def post(self):
		try: 
			formData = request.json
			data = [val for val in formData.values()]
			prediction = classifier.predict(data)
			response = jsonify({
				"statusCode": 200,
				"status": "Prediction made",
				"result": "Prediction: " + str(prediction)
				})
			response.headers.add('Access-Control-Allow-Origin', '*')
			return response
		except Exception as error:
			return jsonify({
				"statusCode": 500,
				"status": "Could not make prediction",
				"error": str(error)
			})