// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const { fetchNestedComments } = require("../util/helper");

// exports.createNews = async (req, res) => {
//   const newNews = await prisma.news.create({
//     data: {
//       thumbnailImg: "img",
//       title: "First News",
//       content: "This is the content of the first news.",
//       categories: {
//         create: {
//           name: "tech",
//         },
//       },
//     },
//   });
//   return res.json({
//     newNews,
//   });
// };

// exports.createUser = async (req, res) => {
//   const user = await prisma.user.create({
//     data: {
//       name: "Dummy",
//       profileUrl: "www.google.com",
//     },
//   });
//   return res.json({
//     user,
//   });
// };

// exports.createComment = async (req, res) => {
//   const { newsId, content, userId, parentCommentId } = req.body;
//   const comment = await prisma.comment.create({
//     data: {
//       newsId: parseInt(newsId),
//       content,
//       userId: parseInt(userId),
//       parentCommentId: parseInt(parentCommentId),
//     },
//   });
//   return res.json({
//     comment,
//   });
// };

// exports.fetchComment = async (req, res) => {
//   const { newsId } = req.body;
//   const topLevelComment = await prisma.comment.findMany({
//     where: {
//       newsId: parseInt(newsId),
//       parentCommentId: null,
//     },
//     include: {
//       replies: true,
//     },
//   });

//   const nestedComment = await Promise.all(
//     topLevelComment.map(
//       async (comment) => await fetchNestedComments(comment.id)
//     )
//   );

//   return res.json({
//     nestedComment,
//   });
// };
