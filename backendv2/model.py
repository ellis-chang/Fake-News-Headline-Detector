#!/usr/bin/python

# @Author: mark atkisson
# @Date:   2021-05-04T18:30:19-07:00
# @Last modified by:   mark
# @Last modified time: 2021-05-27T19:34:13-07:00

import pandas as pd
import pickle
import itertools
from sklearn.model_selection import train_test_split    # Split data
from sklearn.feature_extraction.text import TfidfVectorizer     #TF IDF model
from sklearn.pipeline import Pipeline   #Bundles the above two into one unit
from sklearn.metrics import confusion_matrix
from sklearn.linear_model import LogisticRegression


def process_data(datapath: str):
    """Reads in csv from datapath, shuffles rows, and splits into training
        and test sets.

    Args:
        datapath (str): Path to csv file to read.

    Returns:
        Training and test sets split from csv.

    """
    # Read dataset CSV - 23502 fake, 21417 real articles.
    news = pd.read_csv(datapath, low_memory=False)

    # Randomise rows
    shuffleNews = news.sample(frac=1, random_state=7)
    labels = shuffleNews['is_real']

    # Split into training, test sets
    X_train, X_test, y_train, y_test = \
    train_test_split(shuffleNews['title'], labels, test_size=0.30, random_state=7)

    return X_train, X_test, y_train, y_test



def train_model(X_train: pd.core.series.Series, y_train: pd.core.series.Series):
    """Short summary.

    Args:
        X_train (pd.core.series.Series): Training data
        y_train (pd.core.series.Series): Training labels

    Returns:
        Newly created model pipeline

    """
    # TfidfVectorizer
    model = TfidfVectorizer()
    classify = LogisticRegression()
    pipe = Pipeline([('tfidf', model), ('pac', classify)])

    # Train model
    pipe.fit(X_train, y_train)

    # Save model for later
    pickle.dump(pipe, open("model.pkl", "wb"))

    return pipe



def test_model(pipe: Pipeline, X_test: pd.core.series.Series, y_test: pd.core.series.Series):
    """Tests the model against the provided test set.

    Args:
        pipe (Pipeline): Model pipeline
        X_test (pd.core.series.Series): Test data
        y_test (pd.core.series.Series): Test labels

    Returns:
        Accuracy score, confusion matrix

    """
    y_pred = pipe.predict(X_test)

    score = pipe.score(X_test, y_test)

    confusion = confusion_matrix(y_test, y_pred)

    return score, confusion



def predict_new(pipe: Pipeline, newHeadline: str):
    """Predict whether a new headline is real or fake news

    Args:
        pipe (Pipeline): Model pipeline
        newHeadline (str): New headline to predict

    Returns:
        The model's prediction

    """
    return pipe.predict_proba([newHeadline])



def load_pipe(datapath: str):
    """Loads model pipeline at specified datapath

    Args:
        datapath (str): Datapath of existing model

    Returns:
        Loaded model pipeline

    """

    return pickle.load(open(datapath, "rb"))



if __name__ == '__main__':
    # Process data
    X_train, X_test, y_train, y_test = process_data('news.csv')

    # Train/retrain model
    #log_pipeline = train_model(X_train, y_train)

    # Load existing model
    log_pipeline = load_pipe("model.pkl")

    # Get accuracy and confusion
    score, confusion = test_model(log_pipeline, X_test, y_test)
    print(f"Accuracy: {(round(score*100,2))}%")
    print(confusion)

    # Predict a new headline with confidence
    prediction = predict_new(log_pipeline, "Test")
    print(prediction)
