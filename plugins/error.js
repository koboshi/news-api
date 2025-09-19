import fp from "fastify-plugin";

export default fp(
  async function (fastify, opts) {
    fastify.setErrorHandler(async function (error, request, reply) {
      const result = fastify.helper.resErrJson(500, error.message);
      reply.status(500).send(result);
    });

    fastify.setNotFoundHandler(async function (request, reply) {
      const result = fastify.helper.resErrJson(404, "invalid url");
      reply.status(404).send(result);
    });
  },
  {
    name: "plugin-error",
    dependencies: ["plugin-helper"],
  }
);
