import User from '../database/models/Users';

const index = async (req, res) => {
  try {
    const users = await User.scope('withoutPassword', 'active').findAll();
    return res.json(users);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.scope('withoutPassword', 'active').findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: 'User not found.',
      });
    }
    return res.json(user);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.scope('withoutPassword', 'active').findByPk(id);

    if (!user) {
      return res.status(400).json({
        error: 'This user is not registered',
      });
    }
    await user.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'user deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name, password, role,
    } = req.body;
    const user = await User.scope('active').findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: 'This user is not registered',
      });
    }
    await user.update({
      name, password, role,
    });
    const formattedUser = user.get({ plain: true });
    delete formattedUser.password;
    return res.json(formattedUser);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  try {
    const {
      name, password, email, role,
    } = req.body;

    const user = await User.create({
      name, password, email, role,
    });

    if (!user) {
      return res.status(400).json({
        error: 'This user is already registered',
      });
    }
    const newUser = user.get({ plain: true });
    delete newUser.password;
    return res.json(newUser);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, getUser, update, deleteUser, index,
};
