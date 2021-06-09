import { Model, DataTypes } from 'sequelize';

export default class Receipts extends Model {
  static init(sequelize) {
    super.init({
      client_id: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            msg: 'Client association can not be empty!',
          },
          isInt: true,
        },
      },
      date: {
        type: DataTypes.DATE,
        validate: {
          notEmpty: {
            msg: 'Receipt date can not be empty!',
          },
          isDate: true,
        },
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Receipt value can not be empty!',
          },
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
    this.belongsTo(models.Clients, { foreignKey: 'client_id', as: 'clients' });
  }
}
