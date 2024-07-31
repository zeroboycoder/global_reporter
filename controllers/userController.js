const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");
const { fetchData } = require("../util/apiQuery");

exports.fetchUsers = async (req, res) => {
  try {
    const {
      page = 1,
      showPerPage = 10,
      sort = "desc",
      name = undefined,
      id = undefined,
    } = req.query;

    // Config for filter
    const where = {};
    name ? (where.fullName = { startsWith: name }) : null;
    id ? (where.id = parseInt(id)) : null;

    const include = {
      country: {
        select: {
          name: true,
        },
      },
      userDevices: {
        select: {
          type: true,
        },
      },
    };

    const users = await fetchData(
      res,
      "user",
      page,
      showPerPage,
      sort,
      where,
      include
    );

    return response.success(res, "Users fetched successfully", users);
  } catch (error) {
    return response.error(res, "Error fetching users", error.message);
  }
};

exports.fetchUserDetail = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return response.success(res, "User detail fetched successfully", user);
  } catch (error) {
    return response.error(res, "Error fetching user detail", error.message);
  }
};

exports.fetchUserNotiTime = async (req, res) => {
  try {
    const { userId } = req.params;

    return response.success(res, "User noti time fetched successfully", []);
  } catch (error) {
    return response.error(res, "Error fetching user noti time", error.message);
  }
};
