const contractAddress = "0xF4Ef996bF8d60B1C17aFb174f3D0a5434139001c";
var walletContract;

const showError = (message) => {
  const errorElement = document.getElementById("error-message");
  errorElement.textContent = message;
  errorElement.style.display = "block";

  // Hide error message after 5 seconds
  setTimeout(() => {
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }, 5000);
};

const getRevertReason = (error) => {
  if (error.data && error.data.message) {
    return error.data.message.replace("execution reverted: ", "").trim();
  }
  if (error.reason) {
    return error.reason;
  }
  if (error.message.includes("User denied transaction")) {
    return "Transaction rejected by user.";
  }
  return "Transaction failed. Please check console for details.";
};

const connect = async () => {
  try {
    showError(""); // Clear previous errors
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    walletContract = new ethers.Contract(contractAddress, abi, signer);

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];

    document.getElementById("wallet-address").textContent =
      account.substring(0, 5) + "..." + account.substring(37, 42);

    document.getElementById("pending-allowance").textContent =
      await walletContract.myAllowance();

    document.getElementById("wallet-balance").textContent =
      await walletContract.getWalletBalance();
  } catch (err) {
    console.error("Connection Error:", err);
    showError(getRevertReason(err));
  }
};

const renew = async () => {
  try {
    showError("");
    const account = document.getElementById("user").value;
    const amount = document.getElementById("allowance").value;

    console.log("Account is: ", account);
    var tx = await walletContract.renewAllowance(account, amount, 86400);
    await tx.wait();
  } catch (err) {
    console.error("Renew Allowance Error:", err);
    showError(getRevertReason(err));
  }
};

const spend = async () => {
  try {
    showError("");
    const account = document.getElementById("receiver").value;
    const amount = document.getElementById("amount").value;

    var tx = await walletContract.spendCoins(account, amount);
    await tx.wait();
  } catch (err) {
    console.error("Spend Coins Error:", err);
    showError(getRevertReason(err));
  }
};
