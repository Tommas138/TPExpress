const { Prisma } = require('@prisma/client');

function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);

  console.error(err && err.stack ? err.stack : err);

  if (err && err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
    return res.status(404).json({ message: 'Recurso no encontrado.' });
  }

  const status = (err && err.status) || 500;
  const message = (err && err.message) || (status === 500 ? 'Error interno del servidor.' : 'Error.');

  const payload = { message };
  if (process.env.NODE_ENV !== 'production') {
    payload.error = err;
  }

  return res.status(status).json(payload);
}

module.exports = errorHandler;
