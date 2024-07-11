const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const countryDatas = require("../seeds/country");

const main = async () => {
  // Create Country
  const countries = await prisma.country.createMany({
    data: countryDatas,
  });
  console.log(countries);
};

main()
  .then(async () => {
    console.log("Successfully seeded 🌱");
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    onsole.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
