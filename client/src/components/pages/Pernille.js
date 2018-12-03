import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';

class Pernille extends Component {
  constructor(props) {
    super(props);
    // this.toggle = this.toggle.bind(this);
    this.state = { 
      collapse: false 
    };
  }

  toggle1() {
    this.setState({ 
      collapse: !this.state.collapse 
    });
  }

  toggle2() {
    this.setState({ 
      collapse: !this.state.collapse 
    });
  }

  render() {
    return (
      <div className="firstToggle">
        <Button color="primary" onClick={this.toggle1} style={{ marginBottom: '1rem' }}>Toggle</Button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
            Anim pariatur cliche reprehenderit,
             enim eiusmod high life accusamus terry richardson ad squid. Nihil
             anim keffiyeh helvetica, craft beer labore wes anderson cred
             nesciunt sapiente ea proident.
            </CardBody>
          </Card>
        </Collapse>
      <Button color="primary" onClick={this.toggle2} style={{ marginBottom: '1rem' }}>Toggle</Button>
      <Collapse isOpen={this.state.collapse}>
        <Card>
          <CardBody>
          Anim pariatur cliche reprehenderit,
           enim eiusmod high life accusamus terry richardson ad squid. Nihil
           anim keffiyeh helvetica, craft beer labore wes anderson cred
           nesciunt sapiente ea proident.
          </CardBody>
        </Card>
      </Collapse>
      </div>
    );
  }
}

export default Pernille;