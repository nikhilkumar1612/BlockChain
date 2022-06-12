import React,{Component} from 'react';
import './App.css';
import web3 from './web3';
import myProject from './abiandaddress';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Jumbotron,Container,Button} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import requestlist from './reqlist'
import Contribute from './contribute'
import CreateRequest from './createrequest';

class App extends Component{
  constructor(props){
    super(props);
    this.state = { owner: '',minimum: '', noOfContributes:''};
  }

  async componentDidMount() {
    const owner = await myProject.methods.owner().call();
    const minimum = await myProject.methods.minimum().call();
    const noOfContributes = await myProject.methods.noOfContributes().call();
    this.setState({owner,minimum, noOfContributes});
  }
  render(){
    return(
      <div className="App">
        <Jumbotron fluid>
          <Container>
            <h1>Event Funding</h1>
            <h3>Address: <a href="https://rinkeby.etherscan.io/address/0xbaC46C70F99EFB72993A416bd76E70318bCD5Cb7">{this.state.owner}</a></h3>
            <a href="/contribute"><Button variant="primary">+Contribute</Button></a>
            <p style={{marginTop:"10px"}}>{this.state.minimum} Wei to become an approver</p>
            <p style={{marginTop:"10px"}}>Nnumber of Contributors {this.state.noOfContributes}</p>
            <a href="/createreq"><Button variant="primary">Create Request</Button></a>
            <a href="/reqlist" style={{paddingLeft: "10px"}}><Button variant="primary">Requests History</Button></a>
          </Container>
        </Jumbotron>
        <Container>
          <Router>
            <Switch>
              <Route path="/reqlist" exact component={requestlist}/>
              <Route path="/contribute" exact component={Contribute}/>
              <Route path="/createreq" exact component={CreateRequest}/>
            </Switch>
          </Router>
          <br></br>
          <br></br>
        </Container>
      </div>
    );
  }
}
export default App;
