/* eslint-disable camelcase */
import Plantation from '../database/models/Plantations';

const index = async (req, res) => {
  try {
    const plantation = await Plantation.findAll({ where: { deleted_at: null } });

    if (!plantation) {
      return res.status(400).json({
        error: 'There is no plantation registered',
      });
    }
    return res.json(plantation);
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
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deletePlantation, index,
};
