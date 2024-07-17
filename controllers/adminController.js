require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const response = require("../util/response");
const { ADMIN_IP } = process.env;

exports.createAdmin = async (req, res) => {
  try {
    const { fullName, password } = req.body;
    // Generate admin loginId
    let loginId = "";
    const generateAdminLoginId = async () => {
      const alphabets = "abcdefghijklmnopqrstuvwxyz";
      for (let i = 0; i < 4; i++) {
        loginId += alphabets[Math.floor(Math.random() * alphabets.length)];
      }
      loginId += Math.floor(Math.random() * 10);
      loginId += Math.floor(Math.random() * 10);
      const isAlreadyAdminLoginId = await prisma.reporter.findFirst({
        where: {
          loginId,
        },
      });
      isAlreadyAdminLoginId ? generateAdminId() : null;
    };
    generateAdminLoginId();

    // Hashed admin password
    const hashedPassword = bcrypt.hashSync(password, 10);

    const admin = await prisma.admin.create({
      data: {
        loginId,
        fullName,
        password: hashedPassword,
        photoUrl: "www.google.com",
      },
    });

    delete admin.password;
    return response.success(res, "Admin created successfully", admin);
  } catch (error) {
    return response.error(res, "Error creating admin", error.message);
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { loginId, password, ipAddress } = req.body;
    const admin = await prisma.admin.findUnique({
      where: {
        loginId,
      },
    });

    // If not found admin with login Id
    if (!admin) {
      return response.error(res, "Admin not found with this admin loginId");
    }

    // if admin ip isn't match
    if (ipAddress !== ADMIN_IP) {
      return response.error(res, "Admin IP isn't valid.");
    }

    // If password is incorrect
    if (!bcrypt.compareSync(password, admin.password)) {
      return response.error(res, "Password is incorrect");
    }

    delete admin.password;

    return response.success(res, "Admin logged in successfully", admin);
  } catch (error) {
    return response.error(res, "Error logging in admin", error.message);
  }
};
