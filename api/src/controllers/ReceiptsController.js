import Receipts from '../database/models/Receipts';

const create = async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    date, value, client_id,
  } = req.body;

  const receipts = await Receipts.create({
    date, value, client_id,
  });

  return res.json(receipts);
};

export default { create };
