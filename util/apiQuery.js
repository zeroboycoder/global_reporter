const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.fetchData = async (
  res,
  model,
  page,
  showPerPage,
  sort,
  where,
  include,
  select
) => {
  try {
    const data = await prisma[model].findMany({
      where,
      include,
      select,
      skip: (parseInt(page) - 1) * parseInt(showPerPage),
      take: parseInt(showPerPage),
      orderBy: {
        id: sort,
      },
    });

    const totalCount = await prisma[model].count({
      where: where,
    });

    const totalPage = Math.ceil(totalCount / parseInt(showPerPage));

    return {
      data,
      currentPage: parseInt(page),
      totalPage: parseInt(totalPage),
      showPerPage: parseInt(showPerPage),
      totalCount: parseInt(totalCount),
    };
  } catch (error) {
    console.log(error);
    return response.error(res, error.message);
  }
};
