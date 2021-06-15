/* eslint-disable camelcase */
import Plantation from '../database/models/Plantations';
import User from '../database/models/Users';

const index = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role !== 'admin' && !user.company_id) {
      return res.status(400).json({
        msg: 'you cant acess this resource',
      });
    }
    const queryObject = {
      deleted_at: null,
    };

    if (user.company_id) {
      queryObject.company_id = user.company_id;
    }

    if (req.query.company_id) {
      queryObject.company_id = req.query.company_id;
    }

    const plantation = await Plantation.findAll({ where: queryObject });

    if (!plantation) {
      return res.status(400).json({
        error: 'There is no plantation registered',
      });
    }
    let trees = 0;
    // eslint-disable-next-line array-callback-return
    plantation.map((item) => {
      trees += Number(item.trees);
    });

    const carbon = trees * 5;
    return res.status(200).json({
      trees,
      carbon,
      plantation,
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const plantation = await Plantation.findOne({ where: { id, deleted_at: null } });

    if (!plantation) {
      return res.status(400).json({
        error: 'This plantation is not registered',
      });
    }
    return res.json(plantation);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date, trees, geolocation, company_id,
    } = req.body;

    const plantation = await Plantation.findByPk(id);

    if (!plantation) {
      return res.status(400).json({
        error: 'This plantation is not registered',
      });
    }
    await plantation.update({
      date, trees, geolocation, company_id,
    });
    return res.json(plantation);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const deletePlantation = async (req, res) => {
  try {
    const { id } = req.params;
    const plantation = await Plantation.findByPk(id);

    if (!plantation) {
      return res.status(400).json({
        error: 'This plantation is not registered',
      });
    }
    await plantation.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'plantation deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  try {
    const {
      date, trees, geolocation, company_id,
    } = req.body;
    // const companyCpfCnpj = req.body.cpfcnpj;
    // const companyExist = await Archive.findOne({ where: { cpfcnpj: companyCpfCnpj } });
    // if (companyExist) {
    //   return res.status(400).json({
    //     error: 'This client is already registered',
    //   });
    // }
    const plantation = await Plantation.create({
      date, trees, geolocation, company_id,
    });

    return res.json(plantation);
  } catch (err) {
    console.log('\n\n\n', err, '\n\n\n');
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deletePlantation, index,
};
