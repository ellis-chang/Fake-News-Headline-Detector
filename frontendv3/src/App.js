
import React, { useState, useEffect } from 'react';
// import { FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Col, Container, Row, Button } from 'react-bootstrap';
import axios from 'axios';

import './App.css';

import Table from './Table';
import PieChart from './Components/Pie';
import FolderList from './Components/List';

export default function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [headline, setHeadline] = useState(null);
  const [result, setResult] = useState("");
  const [history, setHistory] = useState([]); 
  //hardcoded confidence
  const [confidence, setConfidence] = useState(0);

  const handlePredictClick = (event) => {
    setIsLoading(true)
    axios.post(`http://127.0.0.1:5000/predict`,  { headline: headline } )
      .then(res => {
        console.log(res.data)
        setResult(res.data.result)
        console.log(result)
        if (res.data.result) {
          setConfidence(res.data.proba[1])
          setHistory([{name: headline, result: res.data.result, confidence: parseFloat(res.data.proba[1]*100).toFixed(2)}, ...history ])
        }
        else {
          setConfidence(res.data.proba[0])
          setHistory([{name: headline, result: res.data.result, confidence: parseFloat(res.data.proba[0]*100).toFixed(2)}, ...history ])
        }
        setIsLoading(false)
        
        console.log(history)

    })
  }

  const handleCancelClick = () => {
    setHeadline("")
    setResult("")
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setHeadline(event.target.value)
  }


  const pieData = {
      labels: [],
      datasets: [
        {
          data: [confidence, (1.0-confidence)],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)',
            'transparent',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'transparent',
          ],
          borderWidth: 1,
        },
      ],
  };

  const displayAbout = () => {
    document.getElementById('aboutPage').style.display = 'block';
    document.getElementById('backgroundOverlay').style.display = 'block';
  }

  const closeAbout = () => {
    document.getElementById('aboutPage').style.display = 'none';
    document.getElementById('backgroundOverlay').style.display = 'none';
  }

  return (
    <div className="App">
      <header>
        <Button
          id="aboutButton"
          block
          onClick={() => displayAbout()}>ABOUT
        </Button>
      </header>
      <div id="aboutPage">
        <Button 
          id="closeAbout"
          onClick={() => closeAbout()}>X
        </Button>
        <h1 id="aboutTitle">About</h1>
        <p id="aboutText">
          The purpose of this classifier is to help users detect whether or not the headline of the article they are reading is part of 
          a legitimate news source or an untrusted news source. Recently, misinformation in the news has became a major problem and when 
          a survey was conducted, in 2019 from statista, asking people about major problems in the US, 65% of people believe that 
          misinformation in the news as a major problem and 63% of people believe that disinformation in the news is a major problem.
        </p>
        <h3 id="howToUseTitle">How to Use:</h3>
        <p id="howToUseText">
          In order to use the classifer, first you input the headline of the article you are reading or want to know if it is real or fake 
          into the input box. Afterwards, you click on the predict button to have our model predict whether or not it is real or fake. You 
          can also cancel or reset the prediction by clicking the reset prediction button. Afterwards, you will get the result and some 
          recommendations and more information about why our model predicted what it did.
        </p>
      </div>
      <h1 style={{color: '#ffffff'}}>NewsDetective</h1>
      <h5 id="functionality" style={{color: '#ffffff'}}>
        This is a fake or real news predictor. It determines whether or not the headline of an article/news you input is fake or real.
      </h5>
      <div className="form-container">
        <Form>
          <Form.Row>
            <Form.Group as={Col}>
                <Form.Label>News headline</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Insert News Headline" 
                  name="headline"
                  value={headline}
                  onChange={(event) => handleChange(event)} />
              </Form.Group>
          </Form.Row>
          <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={() => handlePredictClick()}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
        </Form>
        <div className="">
          {result === "" ? null :
              (<Row>
                <Col className="result-container">
                  {result ? 
                  <h5 id="result">{`Great! We think that the news is REAL`}</h5>
                  :
                  <h5 id="result">{`We think that the news is FAKE`}</h5>
                  }
                </Col>
              </Row>)
            }
        </div>
        {result === "" ?
        null
        :
        (<div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '20%'}}>
              <PieChart data={pieData}/>
            </div>
          </div>
          {`Condifence/probability percentage: ${parseFloat(confidence*100).toFixed(2)}%`}
        </div>)
        }
      </div>
      <p id="disclaimer" style={{color: '#ffffff'}}>
        Disclaimer: This is just a prediction and should not be taken as a legitimate statement. Please do your own research to
        see if the actual article or headline is a legitimate source or an untrusted source.
      </p>
      {result === false ? (<div className="form-container">
        <FolderList />
      </div>)
      :
      null
      }
      <div className="form-container">
        <Table history={history}/>
      </div>
      <div id="backgroundOverlay"></div>
    </div>

  );
}