import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';
import { secret, expireIn } from '../config/auth';
import User from '../database/models/Users';

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      deleted_at: { [Op.is]: null },
    },
  });

  console.log('\n\n\n', 'USER', user, '\n\n\n');

  if (!user) {
    return res.status(401).json({ error: true, msg: 'User not found' });
  }

  const isPasswordValid = await user.comparePassword(password);

  console.log('\n\n\n', 'password', isPasswordValid, '\n\n\n');

  if (!isPasswordValid) {
    return res.status(401).json({ error: true, msg: 'Invalid user or password' });
  }

  const { id, name, role } = user;

  return res.json({
    user: {
      id,
      name,
      email,
      role,
    },
    token: jwt.sign({ id }, secret, {
      expiresIn: expireIn,
    }),
  });
};

export default {
  login,
};
