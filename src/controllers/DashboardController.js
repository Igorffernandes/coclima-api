import subDays from 'date-fns/subDays';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import { Op } from 'sequelize';
import { getDates } from '../utils/dates';

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
    const firstPlantation = await Plantations.findOne({ where: queryObject, order: [['date', 'ASC']] });
    const datePlantation = differenceInDays(new Date(), firstPlantation.date || new Date()) + 1;

    if (req.query.date_filter) {
      queryObject.date = {
        [Op.gte]: subDays(new Date(), Number(req.query.date_filter)),
      };
    } else {
      queryObject.date = {
        [Op.gte]: subDays(new Date(), Number(datePlantation)),
      };
    }

    const receipts = await Receipts.findAll({ where: queryObject, order: [['date', 'ASC']] });

    const plantations = await Plantations.findAll({ where: queryObject, order: [['date', 'ASC']] });

    const datesToMap = getDates(subDays(new Date(), Number(req.query.date_filter || datePlantation)), new Date());

    const treeChartData = datesToMap.map((item, index) => {
      let trees = 0;
      const plantationData = plantations.filter((a) => format(new Date(a.date), 'yyyy-MM-dd') === format(new Date(item), 'yyyy-MM-dd'));
      if (plantationData) {
        plantationData.map((abc) => trees += Number(abc.trees));
      }
      return {
        x: index,
        y: trees,
      };
    });

    const capitalChartData = datesToMap.map((item, index) => {
      let value = 0;
      const receiptsData = receipts.filter((a) => format(new Date(a.date), 'yyyy-MM-dd') === format(new Date(item), 'yyyy-MM-dd'));
      if (receiptsData) {
        receiptsData.map((abc) => value += Number(abc.value));
      }
      return {
        x: index,
        y: value,
      };
    });

    let plantationsSum = 0;
    let receiptsSum = 0;
    plantations.map((item) => plantationsSum += Number(item.trees));
    receipts.map((item) => receiptsSum += Number(item.value));

    return res.status(200).json({
      trees: plantationsSum,
      capital: receiptsSum,
      carbon: plantationsSum * 5,
      treeChartData,
      capitalChartData,
    });
  } catch (err) {
    console.log(err);
    return res.status(409).json({ msg: err.errors.map((e) => e.message) });
  }
};

export default {
  show,
};
