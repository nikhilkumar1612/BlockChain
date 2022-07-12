import React,{Component} from 'react';
import {Form,Button} from 'react-bootstrap';
import web3 from './web3';
import myProject from './abiandaddress';

class Contribute extends Component{
  constructor(props){
    super(props);
    this.state = {value:''}
  }

  formChangedHandler = (event)=>{
    this.setState({value:event.target.value})
  }

  formSubmitHandler = async (event)=>{
    event.preventDefault();
    //add await ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    await myProject.methods.contribute().send({from: accounts[0],value: this.state.value});
  }

  render(){
    return (
      <div>
        <h3>Fill the below form:</h3>
        <Form onSubmit={this.formSubmitHandler}>
          <Form.Group>
            <Form.Label style={{color: 'white'}}>Amount:</Form.Label>
            <Form.Control type="text" onChange={this.formChangedHandler} value={this.state.value} placeholder="in Wei" />
            <Form.Text className="text-muted">
              Make sure you have metamask installed
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default Contribute;
