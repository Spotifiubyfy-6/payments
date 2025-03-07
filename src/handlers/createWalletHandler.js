function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "integer",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService, contractInteraction }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(contractInteraction);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
