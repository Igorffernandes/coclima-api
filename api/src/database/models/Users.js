import bcrypt from 'bcrypt';
import { Model, DataTypes } from 'sequelize';

const SALT_ROUNDS = 10;

export default class Users extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
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
      role: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
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
