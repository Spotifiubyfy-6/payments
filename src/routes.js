const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getFounds = require("./handlers/getFoundsHandler");
const ChargeFounds = require("./handlers/ChargeFoundsHandler")
const sendFounds = require("./handlers/sendFoundsHandler")
const retireFounds = require("./handlers/retireFoundsHandler")

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function getFoundsRoute({ services, config }) {
  return {
    method: "GET",
    url: "/founds/:id",
    schema: getFounds.schema(config),
    handler: getFounds.handler({ config, ...services }),
  };
}

function ChargeFoundsRoute({ services, config }) {
  return {
    method: "POST",
    url: "/charge",
    schema: ChargeFounds.schema(config),
    handler: ChargeFounds.handler({ config, ...services }),
  };
}

function SendFoundsRoute({ services, config }) {
  return {
    method: "POST",
    url: "/sendfounds",
    schema: sendFounds.schema(config),
    handler: sendFounds.handler({ config, ...services }),
  };
}

function RetireFoundsRoute({ services, config }) {
  return {
    method: "POST",
    url: "/retirefounds",
    schema: retireFounds.schema(config),
    handler: retireFounds.handler({ config, ...services }),
  };
}

module.exports = [
  getWalletDataRoute, 
  getWalletsDataRoute, 
  createWalletRoute, 
  createDepositRoute, 
  getDepositRoute,
  getFoundsRoute,
  ChargeFoundsRoute,
  SendFoundsRoute,
  RetireFoundsRoute
];
