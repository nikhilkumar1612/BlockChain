import React,{Component} from 'react';
import {Form,Button} from 'react-bootstrap';
import web3 from './web3';
import myProject from './abiandaddress';

class CreateRequest extends Component {
    constructor(props){
        super(props);
        this.state = {amount:'', description:'', receiver:''}
    }

    amountChangedHandler = (event)=>{
        this.setState({amount:event.target.value});
    }

    descChangeHandler = (event)=>{
        this.setState({description:event.target.value});
    }

    recvChangedHandler = (event)=>{
        this.setState({receiver:event.target.value});
    }

    formSubmitHandler = async (event)=>{
        event.preventDefault();
        //add await ethereum.enable();
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);
        await myProject.methods.createReq(this.state.description, this.state.amount, this.state.receiver).send({from: accounts[0]});
    }

    render(){
        return (
          <div>
            <h3>Fill the below form:</h3>
            <Form onSubmit={this.formSubmitHandler}>
              <Form.Group>
                <Form.Label style={{color: 'white'}}>Description</Form.Label>
                <Form.Control type="text" onChange={this.descChangeHandler} value={this.state.description} placeholder="reason for the request"></Form.Control>
                <Form.Label style={{color: 'white'}}>Amount</Form.Label>
                <Form.Control type="text" onChange={this.amountChangedHandler} value={this.state.amount} placeholder="in Wei"/>
                <Form.Label style={{color: 'white'}}>Public Address Of Receiver</Form.Label>
                <Form.Control type="text" onChange={this.recvChangedHandler} value={this.state.receiver} placeholder="address of receiver"/>
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        )
    }
}

export default CreateRequest;