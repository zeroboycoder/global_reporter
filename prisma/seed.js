const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const main = async () => {
  // Create Countries
  // await prisma.country.createMany({
  //   data: countryDatas,
  // });
  // Create Cities
  // await prisma.city.createMany({
  //   data: cityDatas,
  // });
  // Create Categories
  // await prisma.category.createMany({
  //   data: categoryDatas,
  // });
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
