export default async function (fastify, opts) {
  fastify.get("/ping", async function (request, reply) {
    return "pong!";
  });
}

export const autoPrefix = "/test";
