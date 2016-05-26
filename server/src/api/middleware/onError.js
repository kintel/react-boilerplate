// Generic error handler middleware

export default function onError(err, req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.status(err.statusCode || 500).json(err)
}
