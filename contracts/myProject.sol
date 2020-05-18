pragma solidity ^0.4.17;

contract myProject {
    struct request{
        uint amount;
        address receiver;
        string description;
        bool complete;
        uint numberOfApp;
        mapping(address => bool) voted;
    }

    request[] public allRequests;
    address public owner;
    mapping(address => bool) public approvers;
    uint public minimum;
    uint public noOfContributes;

    function myProject(uint _min)public{
        minimum = _min;
        owner = msg.sender;
    }

    function contribute() public payable{
        require(msg.value>minimum);
        noOfContributes++;
        approvers[msg.sender] = true;
    }

    function createReq(string description,uint amount, address receiver) public{
        require(msg.sender == owner);
        request memory newRequest = request({
            amount:amount,
            receiver:receiver,
            description:description,
            complete:false,
            numberOfApp:0
        });
        allRequests.push(newRequest);
    }

    function approveRequest(uint i) public {
        require(approvers[msg.sender] == true);
        require(!allRequests[i].voted[msg.sender]);

        allRequests[i].numberOfApp++;
        allRequests[i].voted[msg.sender] = true;
    }

    function finalize(uint i)public{
        require(msg.sender == owner);
        require(!allRequests[i].complete);
        require(allRequests[i].numberOfApp >= noOfContributes);
        allRequests[i].complete = true;
        allRequests[i].receiver.transfer(allRequests[i].amount);
    }

    function getLength() public view returns(uint){
	return allRequests.length;
    }
}
