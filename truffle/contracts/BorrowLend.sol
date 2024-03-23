// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract BorrowLend {
    struct Loan {
        address owner;
        uint amount;
        uint interest;
        uint timestamp;
        bool isPaid;
    }

    mapping(bytes32 => Loan) public availableLoans;
    bytes32[] public availableLoansKeys;

    mapping(bytes32 => Loan[]) public loansTaken;

    function createLoan(uint _amount, uint _interest) public payable {
        Loan memory loan = Loan(msg.sender, _amount, _interest, block.timestamp, false);
        bytes32 hashValue = keccak256(abi.encodePacked(loan.owner, loan.amount, loan.timestamp));
        availableLoans[hashValue] = loan;
        availableLoansKeys.push(hashValue);
    }

    function getLoan(bytes32 _loanId, uint _amount) public {
        require(availableLoans[_loanId].amount - _amount > 0, "not enough amount");
        availableLoans[_loanId].amount -= _amount;
        loansTaken[_loanId].push(Loan(msg.sender, _amount, availableLoans[_loanId].interest, block.timestamp, false));
        payable(msg.sender).transfer(availableLoans[_loanId].amount);
    }

    function repayLoan(bytes32 _loanId) public payable  {
        uint total_principle = availableLoans[_loanId].amount * availableLoans[_loanId].interest/100 + availableLoans[_loanId].amount;
        require(msg.value == total_principle, "Please pay the exact amount");
        uint _amount = msg.value;
        for(uint i = 0; i < loansTaken[_loanId].length; i++) {
            if(loansTaken[_loanId][i].owner == msg.sender && loansTaken[_loanId][i].amount == _amount) {
                loansTaken[_loanId][i].isPaid = true;
            }
        }
        payable(availableLoans[_loanId].owner).transfer(msg.value);
    }

    function getAvailableLoans() public view returns (Loan[] memory) {
        Loan[] memory allLoans = new Loan[](availableLoansKeys.length);
        for(uint i = 0; i < availableLoansKeys.length; i++) {
            allLoans[i] = availableLoans[availableLoansKeys[i]];
        }
        return allLoans;
    }

    function getAvailableLoansKeys() public view returns(bytes32[] memory) {
        return availableLoansKeys;
    }

}
