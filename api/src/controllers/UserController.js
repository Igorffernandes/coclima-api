import User from '../database/models/Users';

const index = async (req, res) => {
  const clients = await User.findAll({ where: { deleted_at: null } });

  if (!clients) {
    return res.status(400).json({
      error: 'There is no client registered',
    });
  }
  return res.json([req.userId, clients]);
};

const show = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id, deleted_at: null } });

  if (!user) {
    return res.status(404).json({
      error: 'User not found.',
    });
  }
  return res.json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      error: 'This user is not registered',
    });
  }
  await user.update({ deleted_at: new Date() });

  return res.status(204).json({
    msg: 'user deleted!',
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, password, mail,
  } = req.body;
  const user = await User.findByPk(id);

  if (!user) {
    return res.status(400).json({
      error: 'This user is not registered',
    });
  }
  await user.update({
    name, password, mail,
  });
  return res.json(user);
};

const create = async (req, res) => {
  const { name, password, mail } = req.body;

  const user = await User.create({ name, password, mail });

  if (!user) {
    return res.status(400).json({
      error: 'This user is already registered',
    });
  }
  return res.json(user);
};

export default {
  create, show, update, deleteUser, index,
};
