function schema() {
    return {
      params: {
        type: "object",
        properties: {
        senderId: {
          type: "integer",
        },
        receiverId: {
          type: "integer",
        },
          amountInEthers: {
            type: "string",
          },
        },
      },
      required: ["senderId", "receiverId", "amountInEthers"],
    };
  }
  
function handler({ walletService, contractInteraction }) {
    return async function (req, reply) {
        let availableFounds = await walletService.getFounds(req.body.senderId);
        if (availableFounds < req.body.amountInEthers) {
            return reply.code(400).send("Insufficient founds to make this transaction");
        }

        let walletSender = await walletService.getWallet(req.body.senderId);
        let walletReceiver = await walletService.getWallet(req.body.receiverId);
        const res = await contractInteraction.sendFounds(
            walletSender, 
            walletReceiver, 
            req.body.amountInEthers,
            contractInteraction
        );
        return reply.code(200).send(res);
    };
  }
      
  module.exports = { schema, handler };
  