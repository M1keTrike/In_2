const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).send({ message: 'No token provided.'});

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).send({ message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ message: 'Failed to authenticate token.'});
    req.userId = decoded.id;
    next();
  });
};


