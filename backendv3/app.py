from flask import Flask, request, jsonify, make_response
import pickle
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "*", "send_wildcard": True}})

classifier = pickle.load(open("model.pkl", "rb"))

@app.route("/predict",  methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type'])
def predict():
    try: 
        formData = request.json
        print("woiks", formData)
        if formData['headline'] == None:
            return jsonify({
                "statusCode": 500,
                "status": "Please include 'headline' in json body.",
                "error": "Please include 'headline' in json body."
            })
        data = [ formData['headline'] ]
        print("data", data)
        prediction = classifier.predict(data)
        proba = classifier.predict_proba(data)
        proba = proba.tolist()
        print("prediction", prediction)
        print("probabilities: ", classifier.predict_proba(data))

        if len(prediction) == 0:
             return jsonify({
                "statusCode": 500,
                "status": "Prediction error.",
                "error": "Prediction error."
            })

        response = jsonify({
            "statusCode": 200,
            "status": "Prediction made",
            "result": bool(prediction[0]),
            "proba": proba[0]
        })
        return response
    except Exception as error:
        return jsonify({
            "statusCode": 500,
            "status": "Could not make prediction",
            "error": str(error)
        })


if __name__ == "__main__":        # on running python app.py
    app.run(debug=True)