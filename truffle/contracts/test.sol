// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract test{
    struct Landers{
        address LanderAddr;
        uint amount_landed;
        uint LandRate;
        bytes32 HashCode;
    }
    
    struct Borrowers{
        bytes32 HashCode;
        address borrowers_addr;
        uint amount_given;
        bool isPaid;
    }

    struct Borrowed{
        bytes32 HashCode;
        uint amount_borrowed;
        uint amount_to_be_return;
    }

    struct UserData{
        address UserAddr;
        uint balance;
        uint amount_landed;
        uint rate;
        bytes32 HashCode;
        Borrowers [] borrowers;
        Borrowed [] borrowed;
    }

    // Users data collection
    mapping(address => UserData) public Users;

    mapping(bytes32 => address) private Hash_to_addr;

    Landers []landars;

    bytes32 []LandHash;

    function isUserDoesNotExist() public view returns(bool){
        if(Users[msg.sender].UserAddr == address(0)){
            return true;
        }
        return false;
    }

    function isUserExist() public view returns(bool){
        if(Users[msg.sender].UserAddr != address(0)){
            return true;
        }
        return false;
    }


    function addUser() public {
        require(isUserDoesNotExist(), "User already Exist");
        address TempAddr=msg.sender;
        Users[TempAddr].UserAddr=TempAddr;
        Users[TempAddr].balance=TempAddr.balance;
        Users[TempAddr].HashCode = keccak256(abi.encodePacked(msg.sender, Users[TempAddr].balance,block.timestamp));
        Hash_to_addr[Users[TempAddr].HashCode]=TempAddr;
    }

    function toLand(uint _amount,uint _rate) public payable {
        require(isUserExist(), "User Does Not Exist");
        require(Users[msg.sender].balance >= _amount ,"insufficient balance");
        Users[msg.sender].rate=toUpdateRate(_rate);
        Users[msg.sender].amount_landed +=_amount;
        landars.push(Landers(msg.sender,Users[msg.sender].amount_landed,Users[msg.sender].rate,Users[msg.sender].HashCode));
        // require(Users[msg.sender].balance >= Users[msg.sender].amount_landed +=_amount,"insufficient balance");
    }

    function toBorrow(bytes32 _HashCode, uint _amount_borrowed,uint _amount_to_be_return) public payable {
        require(isUserExist(), "User Does Not Exist");
        payable(msg.sender).transfer(_amount_borrowed);
        //updating in borrowers data
        Users[msg.sender].borrowed.push(Borrowed(_HashCode,_amount_borrowed,_amount_to_be_return));
        //updating in landers data
        Users[Hash_to_addr[_HashCode]].borrowers.push(Borrowers(_HashCode,msg.sender,_amount_borrowed,false));
        Users[Hash_to_addr[_HashCode]].amount_landed -= _amount_borrowed;
    }

    function toUpdateRate(uint _rate) private view returns(uint){
        return _rate;
    }

    function getLanders() public view returns (Landers[] memory){
        return landars;
    }

    function getUserData() public view returns (UserData memory){
        return Users[msg.sender];
    }
}