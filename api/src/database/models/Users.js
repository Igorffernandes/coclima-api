import bcrypt from 'bcrypt';
import { Model, DataTypes } from 'sequelize';

const SALT_ROUNDS = 10;

export default class Users extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      mail: DataTypes.STRING,
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
      sequelize,
    });
  }

  async comparePassword(plainTextPassword) {
    // console.log(this.password, plainTextPassword);
    const isSame = await bcrypt.compare(plainTextPassword, this.password);
    return isSame;
  }
}
