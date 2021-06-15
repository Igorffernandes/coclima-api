/* eslint-disable camelcase */
import Archive from '../database/models/Archives';
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

    if (req.query.type) {
      queryObject.type = req.query.type;
    }

    if (user.company_id) {
      queryObject.company_id = user.company_id;
    }

    if (req.query.company_id) {
      queryObject.company_id = req.query.company_id;
    }

    const archives = await Archive.findAll({ where: queryObject });

    if (!archives) {
      return res.status(400).json({
        error: 'There is no archive registered',
      });
    }
    return res.json(archives);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const archive = await Archive.findOne({ where: { id, deleted_at: null } });

    if (!archive) {
      return res.status(400).json({
        error: 'This archive is not registered',
      });
    }
    return res.json(archive);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      data, company_id, type, keywords, deleted_at, name,
    } = req.body;
    const archive = await Archive.findByPk(id);

    if (!archive) {
      return res.status(400).json({
        error: 'This archive is not registered',
      });
    }
    await archive.update({
      data, company_id, type, keywords, deleted_at, name,
    });
    return res.json(archive);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const deleteArchive = async (req, res) => {
  try {
    const { id } = req.params;
    const archive = await Archive.findByPk(id);

    if (!archive) {
      return res.status(400).json({
        error: 'This archive is not registered',
      });
    }
    await archive.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'archive deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const create = async (req, res) => {
  try {
    const {
      data, company_id, type, keywords, deleted_at, name,
    } = req.body;
    // const companyCpfCnpj = req.body.cpfcnpj;
    // const companyExist = await Archive.findOne({ where: { cpfcnpj: companyCpfCnpj } });
    // if (companyExist) {
    //   return res.status(400).json({
    //     error: 'This client is already registered',
    //   });
    // }
    const archive = await Archive.create({
      data, company_id, type, keywords, deleted_at, name,
    });

    return res.json(archive);
  } catch (err) {
    console.log(err);
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deleteArchive, index,
};
