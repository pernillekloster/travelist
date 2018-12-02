import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import api from '../../api';
import AddedTips from './AddedTips';
import AddFoodTip from './AddFoodTip';

class Pernille extends Component {
  constructor(props) {
    super(props);
    this.toggle1 = this.toggle1.bind(this);
    this.toggle2 = this.toggle2.bind(this);
    this.toggle3 = this.toggle3.bind(this);
    this.state = { 
      collapse1: false,
      collapse2: false,
      collapse3: false,
      // category: "",
      // description: "",
      // title: "",
      // location: "",
      // tips: []
    };
  }

  // api.getTip(id)
  // .then()

  // }
  toggle1() {
    this.setState({ collapse1: !this.state.collapse1 });
  }

  toggle2() {
    this.setState({ collapse2: !this.state.collapse2 });
  }

  toggle3() {
    this.setState({ collapse3: !this.state.collapse3 });
  }

  render() {
    return (
      <div>
      <div>
        <Button color="primary" onClick={this.toggle1} size="lg" block style={{ marginBottom: '1rem'}}>Food &amp; drinks</Button>
        <Collapse isOpen={this.state.collapse1}>
          <Card>
            <CardBody>
            This is where food and drinks tip will appear
            <AddedTips />
            <AddFoodTip />
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div> 
      <Button color="primary" onClick={this.toggle3} size="lg" block style={{ marginBottom: '1rem' }}>Activities</Button>
        <Collapse isOpen={this.state.collapse3}>
          <Card>
            <CardBody>
            This is where activities tip will appear
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div> 
      <Button color="primary" onClick={this.toggle2} size="lg" block style={{ marginBottom: '1rem' }}>Where to stay</Button>
        <Collapse isOpen={this.state.collapse2}>
          <Card>
            <CardBody>
            This is where where to stay tip will appear
            </CardBody>
          </Card>
        </Collapse>
      </div>
      </div>
    );
  }
     
}

export default Pernille;