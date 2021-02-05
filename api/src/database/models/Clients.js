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
          is: {
            args: ['([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})', 'i'],
            msg: 'Only this formats: 00000000000, 00000000000000, 000.000.000-00, 00.000.000/0000-00 e até 000000000-00 ou 00000000/0000-00 are allowed in client cpf/cnpj',
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
        },
      },
      site: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Client site can not be empty!',
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
}
