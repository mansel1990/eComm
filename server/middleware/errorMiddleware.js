const notFound = (req, res, next) => {
  const err = new Error(`Not found ${req.originalUrl}`);
  console.log(`Error!!, ${err}`.red.bold);
  res.status(404);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  console.log(`!!!${err}!!!`.red.bold);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "prod" ? err.message : err.stack,
  });
};

export { notFound, errorHandler };
