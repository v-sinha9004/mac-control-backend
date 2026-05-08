function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  const apiToken = process.env.API_TOKEN;

  if (!apiToken) {
    console.error('API_TOKEN is not configured in environment variables');
    return res.status(500).json({ error: 'Server misconfiguration' });
  }

  if (token === apiToken) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Invalid or missing token.' });
  }
}

module.exports = authMiddleware;
