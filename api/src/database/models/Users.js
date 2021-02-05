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
          is: {
            args: ['^\\D+$', 'i'],
            msg: 'Only letters and special characters are allowed in user name',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password can not be empty!',
          },
        },
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
        validate: {
          notEmpty: {
            msg: 'Role can not be empty!',
          },
          isIn: {
            args: [['admin', 'client', 'customer']],
            msg: 'Must be a valid role. Roles: admin,client,customer ',
          },
          isLowercase: true,
        },
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
        beforeUpdate: async (user) => {
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
    // console.log(this.password, plainTextPassword);
    const isSame = await bcrypt.compare(plainTextPassword, this.password);
    return isSame;
  }
}
