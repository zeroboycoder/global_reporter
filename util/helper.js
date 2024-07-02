const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const fetchNestedComments = async (commentId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: { replies: true },
  });

  if (comment.replies.length > 0) {
    comment.replies = await Promise.all(
      comment.replies.map(async (reply) => {
        const nestedReplies = await fetchNestedComments(reply.id);
        return nestedReplies;
      })
    );
  }

  return comment;
};

module.exports = {
  fetchNestedComments,
};
