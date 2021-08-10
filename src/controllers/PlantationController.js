/* eslint-disable camelcase */
import Plantation from '../database/models/Plantations';
import Receipts from '../database/models/Receipts';
import Archives from '../database/models/Archives';
import User from '../database/models/Users';

const index = async (req, res) => {
  const user = await User.findByPk(req.userId);

  if (!user) {
    return res.status(400).json({
      msg: 'User not found',
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

  if (plantation.length <= 0) {
    return res.status(400).json({
      error: 'There is no plantation registered',
    });
  }

  let trees = 0;
  // eslint-disable-next-line array-callback-return
  plantation.map((item) => {
    trees += Number(item.trees);
  });

  const carbon = trees * 130;
  return res.status(200).json({
    trees,
    carbon,
    plantation,
  });
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

    const archives = await Archives.findAll({
      where: { plantation_id: id, deleted_at: null },
    });

    const receipt = await Receipts.findByPk(plantation.receipts_id, {
      where: { deleted_at: null },
    });

    const data = {
      ...plantation,
      repasse: receipt ? receipt.value : null,
      archives,
    };

    return res.json(data);
  } catch (err) {
    return res.status(409).json({ msg: err.errors });
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
    return res.status(409).json({ msg: err.errors });
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

    if (plantation.receipts_id) {
      const receipt = await Receipts.findByPk(plantation.receipts_id, {
        where: { id, deleted_at: null },
      });

      if (!receipt) {
        return res.status(400).json({
          error: 'This plantation has no receipts',
        });
      }

      await receipt.update({ deleted_at: new Date() });
    }

    return res.status(204).json({
      msg: 'plantation deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors });
  }
};

const create = async (req, res) => {
  try {
    const {
      date,
      trees,
      geolocation,
      company_id,
      partner_id,
      repasse,
    } = req.body;

    let receipt = null;

    if (repasse) {
      receipt = await Receipts.create({
        date,
        value: repasse,
        company_id,
      });
    }

    const plantation = await Plantation.create({
      date,
      trees,
      geolocation,
      company_id,
      partner_id,
      receipts_id: receipt.id,
    });

    return res.json(plantation);
  } catch (err) {
    console.log('\n\n\n', err, '\n\n\n');
    return res.status(409).json({ msg: err.errors });
  }
};

export default {
  create, show, update, deletePlantation, index,
};
