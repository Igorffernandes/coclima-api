import { Model, DataTypes } from 'sequelize';

export default class Clients extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client name can not be empty!',
          },
          is: {
            args: ['^\\D+$', 'i'],
            msg: 'Only letters and special characters are allowed in client name',
          },
        },
      },
      cpfcnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client cpf can not be empty!',
          },
          isInt: {
            args: true,
            msg: 'Client cpf/cnpj must be only numbers. Ex: 00011122244',
          },
          len: {
            args: [11, 14],
            msg: 'Deve ser menor que 14',
          },
        },
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client street can not be empty!',
          },
        },
      },
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client street number can not be empty!',
          },
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client phone can not be empty!',
          },
          isInt: {
            args: true,
            msg: 'Client phone must be only numbers!',
          },
        },
      },
      site: {
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
}
