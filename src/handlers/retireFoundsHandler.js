function schema() {
    return {
      params: {
        type: "object",
        properties: {
          senderId: {
            type: "integer",
          },
          address_wallet: {
            type: "string",
          },
          amountInEthers: {
            type: "string",
          },
        },
      },
      required: ["senderId", "address_wallet", "amountInEthers"],
    };
}
  
function handler({ walletService, contractInteraction }) {
    return async function (req, reply) {
        let availableFounds = await walletService.getFounds(req.body.senderId);
        if (availableFounds < req.body.amountInEthers) {
            return reply.code(400).send("Insufficient founds to make this transaction");
        }

        let wallet = await walletService.getWallet(req.body.senderId);
        const res = await contractInteraction.retireFounds(
            wallet, 
            req.body.address_wallet, 
            req.body.amountInEthers,
            contractInteraction
        );
        return reply.code(200).send(res);
    };
}
      
module.exports = { schema, handler };
  