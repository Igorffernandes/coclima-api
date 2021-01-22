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

  return res.json(user);
};

const create = async (req, res) => {
  const { name, password, mail } = req.body;

  const user = await User.create({ name, password, mail });

  return res.json(user);
};

export default { login, create };
