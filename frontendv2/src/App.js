import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

import Table from './Table';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        headline: ""
      },
      result: "",
      history: [
        {
          name: "There Are Only 2 Native American Federal Judges. Biden Just Nominated A Third.",
          result: false
        },
        {
          name: "Pros And Cons Of Banning Trump From Social Media Platforms",
          result: true
        },
        {
          name: "Oregon Doctor Barred From Practicing Medicine After Refusing To Wear Mask",
          result: false
        },
        {
          name: "California Tesla Driver Arrested While Riding In Backseat",
          result: false
        },
        {
          name: "Woman Suddenly Realizes She Same Age Parents Were When They Were Her Age",
          result: true
        },
        {
          name: "California Tesla Driver Arrested While Riding In Backseat",
          result: true
        }
      ]
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
   

    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        console.log(response.result)
        this.setState({
          result: response.result,
          isLoading: false
        });
        this.setState({ history: [...this.state.history, {name: formData.headline, result: response.result} ] });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;
    const resultString = "real";

    if(result == 1) {
      resultString = "fake";
    }

    return (
      <Container>
        <div>
          <h1 className="title">FAKE/REAL NEWS CLASSIFIER</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>News headline</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Insert News Headline" 
                  name="headline"
                  value={formData.headline}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            {/* <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Text Field 2</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Text Field 2" 
                  name="textfield2"
                  value={formData.textfield2}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Select 1</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.select1}
                  name="select1"
                  onChange={this.handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Select 2</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.select2}
                  name="select2"
                  onChange={this.handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Select 3</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.select3}
                  name="select3"
                  onChange={this.handleChange}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Form.Control>
              </Form.Group>
            </Form.Row> */}
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{`We think that the news is ${resultString}`}</h5>
              </Col>
            </Row>)
          }
          {/* <Row>
              <Col className="result-container">
                <h5 id="result">{`We think that the news is real`}</h5>
              </Col>
          </Row> */}
          <Table history={this.state.history}/>
        </div>
      </Container>
    );
  }
}

export default App;