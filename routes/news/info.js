import validator from "validator";

export const autoPrefix = "/news";

// /news/info/id/12312
export default async function (fastify, opts) {
  fastify.get(
    "/info/id/:newsId(^\\d+_\\d+_\\d+$)",
    async function (request, reply) {
      const newsId = request.params.newsId ? request.params.newsId : "";
      if (validator.isEmpty(newsId)) {
        return fastify.helper.resErrJson(1, "invalid id");
      }
      const newsInfo = await fastify.NewsModel.findNewsInfo(newsId);
      newsInfo.content = newsInfo.content;
      // await this.helper.delay(2000); //故意制造延迟，test
      return fastify.helper.resInfoJson(newsInfo);
    }
  );
}
