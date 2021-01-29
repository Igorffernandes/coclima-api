import jwt from 'jsonwebtoken';
import { secret, expireIn } from '../config/auth';
import User from '../database/models/Users';

const login = async (req, res) => {
  const { mail, password } = req.body;

  const user = await User.findOne({ where: { mail } });
  if (!user) {
    return res.status(401).json({ error: true, msg: 'Invalid user or password' });
  }
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: true, msg: 'Invalid user or password' });
  }
  const { id, name } = user;

  return res.json({
    user: {
      id,
      name,
      mail,
    },
    token: jwt.sign({ id }, secret, {
      expiresIn: expireIn,
    }),
  });
};

export default {
  login,
};
