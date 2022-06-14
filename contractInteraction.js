const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
var {pool} = require("./db");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposits = {};

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        insertReceipt(tx.hash, firstEvent.args.sender, JSON.stringify(firstEvent.args.amount));
        deposits[tx.hash] = {
          senderAddress: firstEvent.args.sender,
          amountSent: firstEvent.args.amount,
        };
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );
  return tx;
};

const getDepositReceipt = ({}) => async depositTxHash => {
  let rec = await retrieveReceipt(depositTxHash);
  return rec.rows["0"];
};

const chargeWallet = ({config}) => async (userWallet, fundsToCharge) => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);  
  const walletDeployer = await ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  const basicPayments = await getContract(config, walletDeployer);

  const tx = await basicPayments.sendPayment(
    userWallet.address,
    ethers.utils.parseEther(fundsToCharge.toString()).toHexString(),
  );

  tx.wait(1).then(receipt => {
    console.log("\nTransaction mined.\n");
    const firstEvent = receipt && receipt.events && receipt.events[0];
    if (firstEvent && firstEvent.event == "PaymentMade") {
      console.log("Payment has been correctly made.");
    } else {
      console.error(`Payment not created in tx ${tx.hash}`);
    }
  });
}

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  chargeWallet: chargeWallet(dependencies),
});

async function insertReceipt(hash, senderAddress, amountsent) {
  try {
    const res = await pool.query(
      "INSERT INTO receipts (hash, senderAddress, amountsent) " 
      + "VALUES ($1, $2, $3) RETURNING *",
      [hash, senderAddress, amountsent]
    );
    return res["rows"][0];
    //console.log(`Added a wallet with address ${address}`);
  } catch (error) {
    console.error(error)
  }
}

async function retrieveReceipt(hash) {
  try {
    const res = await pool.query("SELECT * FROM receipts WHERE hash='"+hash+"'");
    return res;
  } catch (error) {
    console.error(error);
  }
}