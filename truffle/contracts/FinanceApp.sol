//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FinanceApp {

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    struct LoanTaken{
        address lender;
        uint amount;
        uint interest;
        uint timestamp;
    }
    struct LoanGiven{
        address borrower;
        uint amount;
        uint interest;
        uint timestamp;
    }
    struct Loan{
        address owner;
        uint amount;
        uint interest;
        uint index;
        uint ownerIndex;
    }
    struct User {
        bool userExists;
        address addr;
        Loan[] loans;
        LoanTaken[] lenders;
        LoanGiven[] borrowers;
    }

    // struct LendMoney{
    //     address owner;
    //     uint amount;
    //     uint interest;
    //     address[] lenders;
    // }

    address private owner;
    // mapping (address => User) public users;
    mapping (address => User) users;
    address[] userAddresses;
    Loan[] public allLoans;

    function addUser(address _user) public onlyOwner{
        require(!users[_user].userExists);
        userAddresses.push(_user);
        users[_user].addr = _user;
        users[_user].userExists = true;
    }

    function listLoan(uint _interest) public payable {
        allLoans.push(Loan(msg.sender,msg.value,_interest,allLoans.length,users[msg.sender].loans.length));
        users[msg.sender].loans.push(Loan(msg.sender,msg.value,_interest,allLoans.length,users[msg.sender].loans.length));
    }

    function borrow(uint _loanIndex, address _lender, uint _lenderIndex, uint _amount) public payable{
        // require();
        allLoans[_loanIndex].amount -= _amount * 1 ether;
        users[msg.sender].lenders.push(LoanTaken(_lender, _amount, users[_lender].loans[_lenderIndex].interest, block.timestamp));
        users[_lender].borrowers.push(LoanGiven(msg.sender, _amount, users[_lender].loans[_lenderIndex].interest, block.timestamp));
        payable(msg.sender).transfer(_amount);
    }

    function viewUserDataExpanded(address _user) public view returns(address, Loan[] memory, LoanTaken[]memory, LoanGiven[] memory){
        return (users[_user].addr, users[_user].loans, users[_user].lenders, users[_user].borrowers);
    } 
    function viewUserData(address _user) public view returns(User memory){
        return (users[_user]);
    } 
}