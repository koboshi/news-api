import validator from "validator";

export const autoPrefix = "/news";

// /news/list/page/12312
export default async function (fastify, opts) {
  fastify.get("/list/page/:pageNum(^\\d+$)", async function (request, reply) {
    const pageNum = parseInt(request.params.pageNum, 10);
    if (Number.isNaN(pageNum) || pageNum < 1) {
      return fastify.helper.resErrJson(1, "invalid page");
    }

    const pageSize = 10;
    const newsList = await fastify.NewsModel.findNewsList({
      page: pageNum,
      size: pageSize,
    });
    const resultList = [];
    for (const newsInfo of newsList) {
      const ellipsis = newsInfo.content.substring(0, 35) + "...";
      resultList.push({
        id: newsInfo.id,
        title: newsInfo.title,
        ellipsis:
          this.helper.stripEOL(newsInfo.content.substring(0, 35)) + "...",
        createAt: newsInfo.createAt,
        updateAt: newsInfo.updateAt,
      });
    }
    const newsCount = await fastify.NewsModel.findNewsCount();
    // await this.helper.delay(2000); //故意制造延迟，test
    return fastify.helper.resListJson(newsCount, pageNum, pageSize, resultList);
  });
}
