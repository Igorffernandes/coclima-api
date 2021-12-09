import Receipts from '../database/models/Receipts';
import Company from '../database/models/Companies';

const index = async (req, res) => {
  try {
    const receipts = await Receipts.findAll({ where: { deleted_at: null } });

    if (!receipts) {
      return res.status(400).json({
        error: 'There is no receipt registered',
      });
    }
    return res.json(receipts);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const show = async (req, res) => {
  try {
    const { id } = req.params;

    const receipts = await Receipts.findOne({ where: { id, deleted_at: null } });

    if (!receipts) {
      return res.status(400).json({
        error: 'This receipt is not registered',
      });
    }
    return res.json(receipts);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      // eslint-disable-next-line camelcase
      date, value, client_id,
    } = req.body;

    const receipt = await Receipts.findByPk(id);

    if (!receipt) {
      return res.status(400).json({
        error: 'This receipt is not registered',
      });
    }
    const client = receipt.client_id;
    const clientExist = await Company.findOne({ where: { id: client } });
    if (!clientExist) {
      return res.json({ msg: 'Client not found! ' });
    }
    await receipt.update({
      date, value, client_id,
    });
    return res.json(receipt);
  } catch (err) {
    return res.status(409).json({ msg: err });
    // .errors.map((e) => e.message)
  }
};

const deleteReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const receipts = await Receipts.findByPk(id);

    if (!receipts) {
      return res.status(400).json({
        error: 'This receipts is not registered',
      });
    }
    await receipts.update({ deleted_at: new Date() });

    return res.status(204).json({
      msg: 'Receipts deleted!',
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

const createPublic = async (req, res) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      store_id,
      amount,
    } = req.body;

    console.log('\n\n', 'store_id', store_id, amount, '\n\n\n');

    const companyExist = await Company.findOne({ where: { store_id } });

    if (!companyExist) {
      return res.json({ msg: 'Client not found! ' });
    }

    const receipts = await Receipts.create({
      date: new Date(), value: amount, company_id: companyExist.id,
    });

    return res.json(receipts);
  } catch (err) {
    return res.status(409).json({ msg: err.message });
  }
};

const create = async (req, res) => {
  try {
    const {
      // eslint-disable-next-line camelcase
      date, value, client_id,
    } = req.body;

    const client = req.body.client_id;
    const clientExist = await Company.findOne({ where: { id: client } });
    if (!clientExist) {
      return res.json({ msg: 'Client not found! ' });
    }
    const receipts = await Receipts.create({
      date, value, client_id,
    });
    return res.json(receipts);
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  create, show, update, deleteReceipt, index, createPublic,
};
