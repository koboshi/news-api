import fp from "fastify-plugin";

const helper = {
  //助手类
  resJson: function (result, errCode, errMsg) {
    return {
      error_code: errCode,
      error_message: errMsg,
      result: result,
    };
  },
};

export default fp(async function (fastify, opts) {
  fastify.decorate("helper", helper);
});
