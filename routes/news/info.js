import validator from "validator";

export const autoPrefix = "/news";

// /news/info/id/12312
export default async function (fastify, opts) {
  fastify.get(
    "/info/id/:newsId(^\\d+_\\d+_\\d+$)",
    async function (request, reply) {
      const newsId = request.params.newsId ? request.params.newsId : "";
      if (validator.isEmpty(newsId)) {
        return fastify.helper.resJson({}, 1, "invalid newsId");
      }
      const newsInfo = await fastify.NewsModel.findNewsInfo(newsId);
      return fastify.helper.resJson({ info: newsInfo }, 0, "");
    }
  );
}
