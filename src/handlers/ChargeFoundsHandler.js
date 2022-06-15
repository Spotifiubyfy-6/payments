function schema() {
  return {
    params: {
      type: "object",
      properties: {
        receiverId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["receiverId", "amountInEthers"],
  };
}

function handler({ walletService, contractInteraction }) {
    return async function (req, reply) {
        let wallet = await walletService.getWallet(req.body.receiverId);
        let amountInEthers = req.body.amountInEthers;
        if ( amountInEthers > 0.005) {
            amountInEthers = 0.005;
        }
        await contractInteraction.chargeWallet(wallet, amountInEthers);
        return reply.code(200).send("");
    };
  }
    
module.exports = { schema, handler };
