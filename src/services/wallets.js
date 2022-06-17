const ethers = require("ethers");
const accounts = [];
var {pool} = require("./db");
const fetch = require("node-fetch");

const getDeployerWallet = ({ config }) => () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (contractInteraction) => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const id = await insertWallet(wallet.address, wallet.privateKey);
  const result = {
    id: id,
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
  const _tx = await contractInteraction.chargeWallet(wallet, 0.001);
  return result;
};

const getWalletsData = () => () => {
  return retrieveWallets();
};

const getWalletData = () => index => {
  let wallet = retrieveWallet(index);
  return wallet;
};

const getWallet = ({}) => async index => {
  const provider = new ethers.providers.InfuraProvider("kovan", process.env.INFURA_API_KEY);
  let wallet = await retrieveWallet(index);
  return new ethers.Wallet(wallet.rows["0"].privatekey, provider);
};

const getFounds = ({config}) => async id => {
  const wallet = await retrieveWallet(id);
  if (!wallet) {
    return null;
  }
  const response = await fetch(
    `https://api-kovan.etherscan.io/api?module=account&action=balance&address=${wallet.rows["0"].address}&tag=latest&apikey=${config.etherscanApiKey}`,
  );
  const balance_info = await response.json();
  return ethers.utils.formatEther(balance_info.result);
}

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
  getFounds: getFounds({ config }),
});

async function insertWallet(address, privateKey) {
  try {
    const res = await pool.query(
      "INSERT INTO wallets (address, privateKey) VALUES ($1, $2) RETURNING id",
      [address, privateKey]
    );
    return res["rows"][0]["id"];
    //console.log(`Added a wallet with address ${address}`);
  } catch (error) {
    console.error(error)
  }
}

async function retrieveWallet(id) {
  try {
    const res = await pool.query("SELECT * FROM wallets WHERE id="+id);
    //console.log(res.rows);
    return res;
  } catch (error) {
    console.error(error);
  }
}

async function retrieveWallets() {
  try {
    const res = await pool.query("SELECT * FROM wallets");
    //console.log(res.rows);
    return res;
  } catch (error) {
    console.error(error);
  }
}
