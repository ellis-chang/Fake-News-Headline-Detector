
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
  const [confidence, setConfidence] = useState(0.7);

  const handlePredictClick = (event) => {
    setIsLoading(true)
    axios.post(`http://127.0.0.1:5000/predict`,  { headline: headline } )
      .then(res => {
        console.log(res.data)
        setResult(res.data.result)
        console.log(result)
        setIsLoading(false)
        setHistory([...history, {name: headline, result: res.data.result} ])
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


  return (
    <div className="App">
      <h1 style={{color: '#ffffff'}}>Fake/real news classifier</h1>
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
        {/* <div>
        {`Condifence percentage: ${confidence*100}%`}
        </div> */}
        {result === "" ?
        null
        :
        (<div>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div style={{ width: '20%'}}>
              <PieChart data={pieData}/>
            </div>
          </div>
          {`Condifence percentage: ${confidence*100}%`}
        </div>)
        }
      </div>
      {result === false ? (<div className="form-container">
        <FolderList />
      </div>)
      :
      null
      }
      <div className="form-container">
        <Table history={history}/>
      </div>
    </div>

  );
}