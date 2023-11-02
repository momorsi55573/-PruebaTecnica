const loggingMiddleware = (db) =>
  async  (req, res, next) => {
        const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress || '').split(',')[0].trim();
        const headers = JSON.stringify(req.headers);
        const originalUrl = req.originalUrl;
        // Persist this info on DB
      await  db.logging.bulkCreate([{
            action: originalUrl,
            headers,
            ip
        }])
        next();
    }

module.exports = loggingMiddleware;