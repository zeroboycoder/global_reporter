exports.success = (res, msg, data) => {
  return res.status(200).json({
    status: "success",
    msg,
    data,
  });
};

exports.error = (res, message, data) => {
  return res.status(400).json({
    statusCode: 400,
    message,
    data,
  });
};
