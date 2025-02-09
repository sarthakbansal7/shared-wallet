# Shared Wallet Smart Contract

## Overview
The **Shared Wallet** smart contract is a decentralized Ethereum-based solution that allows users to securely manage funds, allocate allowances, and perform transactions with transparency. The contract is managed by the owner **(@sarthakbansal7)** and enables fine-grained control over wallet operations.

This repository contains:
- The **Smart Contract** written in Solidity
- A **Web3.js Frontend** for interaction
- Comprehensive **Error Handling** and **Security Measures**

---

## Features
✅ **Secure Wallet Connection** - Connect with MetaMask
✅ **Allowance System** - Set and renew spending limits for users
✅ **Transaction Management** - Send and receive funds securely
✅ **Error Handling** - Properly managed contract errors displayed in UI
✅ **Admin Panel** - For contract owner to set allowances

---

## Getting Started
### **1. Prerequisites**
Before setting up the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS Version)
- [MetaMask Extension](https://metamask.io/)
- [Hardhat](https://hardhat.org/) (For smart contract deployment and testing)

### **2. Clone the Repository**
```sh
git clone https://github.com/sarthakbansal7/shared-wallet.git
cd shared-wallet
```

### **3. Install Dependencies**
```sh
npm install
```

### **4. Compile and Deploy Smart Contract**
To deploy the smart contract on a local blockchain (using Hardhat):
```sh
npx hardhat compile
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

For deployment on **Ethereum Testnet (Goerli, Sepolia, etc.)**, update `hardhat.config.js` with your Infura/Alchemy API key and run:
```sh
npx hardhat run scripts/deploy.js --network goerli
```

---

## Smart Contract Functions
### **1. Contract Deployment**
The smart contract is deployed to Ethereum and managed by the owner.
```solidity
constructor() {
    owner = msg.sender;
}
```

### **2. Renew Allowance**
The contract owner can set a spending limit for a user.
```solidity
function renewAllowance(address user, uint256 amount, uint256 duration) public onlyOwner {
    allowances[user] = amount;
    allowanceExpiry[user] = block.timestamp + duration;
}
```

### **3. Spend Coins**
Users can send funds as long as their allowance permits.
```solidity
function spendCoins(address recipient, uint256 amount) public {
    require(allowances[msg.sender] >= amount, "Allowance exceeded");
    allowances[msg.sender] -= amount;
    payable(recipient).transfer(amount);
}
```

### **4. Get Wallet Balance**
Check the contract’s ETH balance.
```solidity
function getWalletBalance() public view returns (uint256) {
    return address(this).balance;
}
```

---

## Web3 Frontend Guide
The frontend interacts with the contract via **Web3.js**.

### **Connect Wallet**
```javascript
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
walletContract = new ethers.Contract(contractAddress, abi, signer);
```

### **Renew Allowance (Admin Only)**
```javascript
const account = document.getElementById("user").value;
const amount = document.getElementById("allowance").value;
const tx = await walletContract.renewAllowance(account, amount, 86400);
await tx.wait();
```

### **Spend Coins**
```javascript
const account = document.getElementById("receiver").value;
const amount = document.getElementById("amount").value;
const tx = await walletContract.spendCoins(account, amount);
await tx.wait();
```

---

## Error Handling
Errors from smart contract transactions are captured and displayed in the UI.

### **Handling Revert Reasons**
```javascript
const getRevertReason = (error) => {
    if (error.data && error.data.message) {
        return error.data.message.replace("execution reverted: ", "").trim();
    }
    return "Transaction failed. Please check the console for details.";
};
```

### **Displaying Error Messages**
```javascript
const showError = (message) => {
    const errorElement = document.getElementById("error-container");
    errorElement.textContent = message;
    errorElement.style.display = "block";
    setTimeout(() => errorElement.style.display = "none", 5000);
};
```

---

## Security Considerations
✔ **Only Contract Owner Can Modify Allowances**
✔ **Revert Reasons Properly Handled**
✔ **Prevent Unauthorized Transactions**
✔ **Frontend Validations for Inputs**

---

## Contributing
Contributions are welcome! If you'd like to improve this project, feel free to fork and submit a pull request.

### **Steps to Contribute**
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes and commit (`git commit -m "Added new feature"`)
4. Push the branch (`git push origin feature-branch`)
5. Submit a pull request

---

## License
This project is licensed under the **MIT License**.

---

## Contact
📧 Email: sarthakb675@gmail.com  

