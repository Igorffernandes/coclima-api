import bcrypt from 'bcrypt';
import { Model, DataTypes } from 'sequelize';

const SALT_ROUNDS = 10;

export default class Users extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'User name can not be empty!',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: 'Email can not be empty!',
          },
          isEmail: {
            msg: 'Invalid email!',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.DATE,
        validate: {
          isDate: true,
        },
      },
    }, {
      hooks: {
        beforeCreate: async (user) => {
          // eslint-disable-next-line no-param-reassign
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        },
      },
      scopes: {
        withoutPassword: {
          attributes: {
            exclude: ['password'],
          },
        },
        active: {
          where: {
            deleted_at: null,
          },
        },
      },
      sequelize,
    });
  }

  async comparePassword(plainTextPassword) {
    const isSame = await bcrypt.compare(plainTextPassword, this.password);
    return isSame;
  }
}
