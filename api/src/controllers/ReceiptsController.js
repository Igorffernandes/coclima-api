import Receipts from '../database/models/Receipts';

const index = async (req, res) => {
  const receipts = await Receipts.findAll({ where: { deleted_at: null } });

  if (!receipts) {
    return res.status(400).json({
      error: 'There is no receipt registered',
    });
  }
  return res.json(receipts);
};

const show = async (req, res) => {
  const { id } = req.params;

  const receipts = await Receipts.findOne({ where: { id, deleted_at: null } });

  if (!receipts) {
    return res.status(400).json({
      error: 'This receipt is not registered',
    });
  }
  return res.json(receipts);
};

const update = async (req, res) => {
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
  await receipt.update({
    date, value, client_id,
  });
  return res.json(receipt);
};

const deleteReceipt = async (req, res) => {
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
};

const create = async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    date, value, client_id,
  } = req.body;

  const receipts = await Receipts.create({
    date, value, client_id,
  });

  // if (receipts) {
  //   return res.status(400).json({
  //     error: 'This receipt is already registered',
  //   });
  // }
  return res.json(receipts);
};

export default {
  create, show, update, deleteReceipt, index,
};
