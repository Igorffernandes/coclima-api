import { Model, DataTypes } from 'sequelize';

export default class Archives extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      data: {
        type: DataTypes.TEXT,
        validate: {
          notEmpty: {
            msg: 'File can not be empty!',
          },
        },
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
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Type value can not be empty!',
          },
        },
      },
      keywords: {
        type: DataTypes.STRING,
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

  static associate(models) {
    this.belongsTo(models.Companies, { foreignKey: 'company_id', as: 'companies' });
  }
}
