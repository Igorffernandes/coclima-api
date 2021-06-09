import jwt from 'jsonwebtoken';
import { secret } from '../config/auth';

const authMiddleware = (req, res, next) => {
  // early return
  if (!req.headers.authorization) {
    return res.status(400).json({ msg: 'Token invalid!' });
  }

  const [, token] = req.headers.authorization.split(' ');
  return jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(400).json({ msg: err.message });
    }

    req.userId = decoded.id;
    return next();
  });
  // res.json(decoded);
};

export default authMiddleware;
