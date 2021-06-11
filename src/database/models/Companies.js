import { Model, DataTypes } from 'sequelize';

export default class Companies extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Company name can not be empty!',
          },
          is: {
            args: ['^\\D+$', 'i'],
            msg: 'Only letters and special characters are allowed in company name',
          },
        },
      },
      cpfcnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Company cpf can not be empty!',
          },
          isInt: {
            args: true,
            msg: 'Company cpf/cnpj must be only numbers. Ex: 00011122244',
          },
          len: {
            args: [11, 14],
            msg: 'Must contain 14 characters or 11 characters',
          },
        },
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Company street can not be empty!',
          },
        },
      },
      number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cep: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Company phone can not be empty!',
          },
          isInt: {
            args: true,
            msg: 'Company phone must be only numbers!',
          },
        },
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      api_address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      access_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      date_expiration_access_token: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_expiration_refresh_token: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      date_activated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      store_id: {
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
