/* eslint-disable camelcase */
import Archive from '../database/models/Archives';

const index = async (req, res) => {
  try {
    const archives = await Archive.findAll({ where: { deleted_at: null } });

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
      data, company_id, type, keywords, deleted_at,
    } = req.body;
    const archive = await Archive.findByPk(id);

    if (!archive) {
      return res.status(400).json({
        error: 'This archive is not registered',
      });
    }
    await archive.update({
      data, company_id, type, keywords, deleted_at,
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
      data, company_id, type, keywords, deleted_at,
    } = req.body;
    // const companyCpfCnpj = req.body.cpfcnpj;
    // const companyExist = await Archive.findOne({ where: { cpfcnpj: companyCpfCnpj } });
    // if (companyExist) {
    //   return res.status(400).json({
    //     error: 'This client is already registered',
    //   });
    // }
    const archive = await Archive.create({
      data, company_id, type, keywords, deleted_at,
    });

    return res.json(archive);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deleteArchive, index,
};
