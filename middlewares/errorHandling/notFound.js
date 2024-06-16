const notFound = (request, response) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  next(error);
};
module.exports = notFound;
