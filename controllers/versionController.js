const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const response = require("../util/response");

exports.createVersion = async () => {
  try {
    const { version, url, type, updatedDate, info, skippable } = req.body;
    const result = await prisma.version.create({
      data: {
        version,
        url,
        type,
        updatedDate,
        info,
        skippable,
      },
    });
    return response.success(res, `Version created successfully`, result);
  } catch (error) {
    console.log(error);
    return response.error(res, `Error creating version`, error.message);
  }
};

exports.getCurrentVersion = async () => {
  try {
    const currentVersion = await prisma.version.findMany({
      orderBy: {
        id: "desc",
      },
      take: 1,
    });
    return response.success(
      res,
      `Current version fetched successfully`,
      currentVersion
    );
  } catch (error) {
    console.log(error);
    return response.error(res, `Error fetching current version`, error.message);
  }
};

exports.getVersionHistories = async () => {
  try {
    const versions = await prisma.version.findMany({
      orderBy: {
        id: "desc",
      },
    });
    return response.success(
      res,
      `Version histories fetched successfully`,
      versions
    );
  } catch (error) {
    console.log(error);
    return response.error(
      res,
      `Error fetching version histories`,
      error.message
    );
  }
};

exports.getVersionDetail = async () => {
  try {
    const { versionId } = req.params;
    const version = await prisma.version.findUnique({
      where: {
        id: parseInt(versionId),
      },
    });
    return response.success(
      res,
      `Version detail fetched successfully`,
      version
    );
  } catch (error) {
    console.log(error);
    return response.error(res, `Error fetching version detail`, error.message);
  }
};

exports.updateVersion = async () => {
  try {
    const { versionId } = req.params;
    const { version, url, type, updatedDate, info, skippable } = req.body;
    const result = await prisma.version.update({
      where: {
        id: parseInt(versionId),
      },
      data: {
        version,
        url,
        type,
        updatedDate,
        info,
        skippable,
      },
    });
    return response.success(res, `Version updated successfully`, result);
  } catch (error) {
    console.log(error);
    return response.error(res, `Error updating version`, error.message);
  }
};
