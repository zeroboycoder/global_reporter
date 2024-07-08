exports.success = (res, msg, data) => {
  return res.status(200).json({
    status: "success",
    msg,
    data,
  });
};

exports.error = (res, msg, data) => {
  return res.status(400).json({
    status: "error",
    msg,
    data,
  });
};
