import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import api from '../../api'

class AddedTips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modal: false,
      title: "",
      tips: []
      // location: "",
      // description: ""
    };
  }


  componentDidMount() {
    api.getTip()
      .then(tips => {
        console.log(tips)
        this.setState({
          tips: tips
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
    <div>
    <div>
      <p> Show tip here: </p>
      <table style={{margin: 'auto'}}>  
          <tbody>
            {this.state.tips.map(t => (
              <div>
                <hr/>
              <tr key={t._id}>
                <th>{t.title}</th>
              {/* </tr> */}
             {/* <tr key={t._id}> */}
              <th>{t.location}</th>
              {/* </tr> */}
              {/* <tr key={t._id}> */}
              <th>{t.description}</th>


              </tr>
            </div>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      </div>
      </div>

    );
  }
}

export default AddedTips;