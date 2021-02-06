module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clients', {
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
      cpfcnpj: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING,
        allowNull: true,
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
    });
    queryInterface.bulkInsert('clients', [{
      name: 'joao',
      cpfcnpj: '08586983900',
      street: 'rua abc',
      number: '123',
      phone: '42991422029',
      site: 'www.google.com',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },
  down: (queryInterface) => queryInterface.dropTable('clients'),
};
