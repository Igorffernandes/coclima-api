import { Model, DataTypes } from 'sequelize';

export default class Clients extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      street: DataTypes.STRING,
      number: DataTypes.STRING,
      phone: DataTypes.STRING,
      site: DataTypes.STRING,
    }, {
      sequelize,
    });
  }
}
