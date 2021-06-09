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
      geolocation: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Company association can not be empty!',
          },
          isInt: true,
        },
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

  static associate(models) {
    this.belongsTo(models.Companies, { foreignKey: 'company_id', as: 'companies' });
  }
}
