function schema() {
  return {
    params: {
      type: "object",
      properties: {
        id: {
          type: "string",
        },
      },
    },
    required: ["id"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    console.log("1");
    const body = await walletService.getFounds(req.params.id);
    console.log("6");
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
