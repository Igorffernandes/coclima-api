import { Model, DataTypes } from 'sequelize';

export default class Plantations extends Model {
  static init(sequelize) {
    super.init({
      date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: 'Receipt date can not be empty!',
          },
          isDate: true,
        },
      },
      trees: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Trees value can not be empty!',
          },
        },
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      partner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      receipts_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      geolocation: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    }, {
      sequelize,
    });
  }
}
