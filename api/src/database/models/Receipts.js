import { Model, DataTypes } from 'sequelize';

export default class Receipts extends Model {
  static init(sequelize) {
    super.init({
      client_id: DataTypes.INTEGER,
      date: DataTypes.DATE,
      value: DataTypes.STRING,
      deleted_at: DataTypes.DATE,
    }, {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Clients, { foreignKey: 'client_id', as: 'clients' });
  }
}
