import React,{Component} from 'react';
import myProject from './abiandaddress';
import {Table, Button} from 'react-bootstrap';
import web3 from './web3';

class requestlist extends Component{
  constructor(props){
    super(props);
    this.state = {requests:[]}
  }

  async componentDidMount(){
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    console.log(myProject);
    const length = await myProject.methods.getLength().call();
    console.log(length);
    const requests = [];
    for(let i=0;i<length;i++){
      let temp = await myProject.methods.allRequests(i).call();
      requests.push(temp);
    }
    console.log(requests);
    this.setState({requests: requests});
  }

  async approveHandler(i){
    console.log(i);
    const accounts = await web3.eth.getAccounts();
    await myProject.methods.approveRequest(i).send({from: accounts[0]})
  }

  async finalizeHandler(i){
    console.log(i);
    const accounts = await web3.eth.getAccounts();
    await myProject.methods.finalize(i).send({from: accounts[0]})
  }

  render(){
    return (
      <div>
        <h3>Requests:</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Request No.</th>
              <th>Description</th>
              <th>Amount(in Wei)</th>
              <th>Receiver</th>
              <th>Completed</th>
              <th>No.Of App</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.requests.map((item, i) => {
              return (
                <tr key={item.description}>
                  <td>{i}</td>
                  <td>{ item.description }</td>
                  <td>{ item.amount }</td>
                  <td>{ item.receiver }</td>
                  <td>{ item.complete.toString() }</td>
                  <td>{ item.numberOfApp}</td>
                  <td><Button onClick={()=> this.finalizeHandler(i)} variant="success">Finalize</Button><Button onClick={()=> this.approveHandler(i)} variant="warning">Approve</Button></td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default requestlist;
