import bcrypt from 'bcrypt';
import User from '../database/models/Users';

const SALT_ROUNDS = 10;

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
    console.log('\n\n\n', err, '\n\n\n');
    return res.status(409).json({ msg: err.errors });
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
    console.log('\n\n\n', err, '\n\n\n');
    return res.status(409).json({ msg: err.errors });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      // eslint-disable-next-line camelcase
      name, email, password, role, company_id,
    } = req.body;
    const user = await User.scope('active').findByPk(id);

    if (!user) {
      return res.status(404).json({
        error: 'This user is not registered',
      });
    }

    let newPassword;

    if (password.length > 0) {
      newPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    }

    await user.update({
      name, email, password: newPassword, role, company_id,
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
      // eslint-disable-next-line camelcase
      name, password, email, role, company_id,
    } = req.body;

    const user = await User.create({
      name, password, email, role, company_id,
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
    console.log('\n\n\n', err, '\n\n\n');
    return res.status(409).json({ res });
  }
};

export default {
  create, getUser, update, deleteUser, index,
};
