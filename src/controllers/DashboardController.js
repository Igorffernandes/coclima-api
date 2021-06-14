/* eslint-disable no-return-assign */
import Receipts from '../database/models/Receipts';
import Plantations from '../database/models/Plantations';
import User from '../database/models/Users';

const show = async (req, res) => {
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

    const receipts = await Receipts.findAll({ where: queryObject });
    const plantations = await Plantations.findAll({ where: queryObject });

    let plantationsSum = 0;
    let receiptsSum = 0;
    plantations.map((item) => plantationsSum += Number(item.trees));
    receipts.map((item) => receiptsSum += Number(item.value));

    return res.status(200).json({
      trees: plantationsSum,
      capital: receiptsSum,
      carbon: plantationsSum * 5,
    });
  } catch (err) {
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  show,
};
