const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    }, {
      freezeTableName: true,
    });
    const SALT_ROUNDS = 10;
    const password = await bcrypt.hash('123456', SALT_ROUNDS);
    queryInterface.bulkInsert('users', [{
      name: 'admin',
      password,
      email: 'admin@gmail.com',
      role: 'admin',
      company_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: (queryInterface) => queryInterface.dropTable('users'),
};
