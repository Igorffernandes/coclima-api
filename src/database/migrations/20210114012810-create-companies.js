module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('companies', {
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
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      site: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      api_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      access_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      refresh_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      date_expiration_access_token: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_expiration_refresh_token: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      date_activated: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      store_id: {
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
    queryInterface.bulkInsert('companies', [{
      name: 'Fulano',
      email: 'fulano@gmail.com',
      cpfcnpj: '08586983900',
      street: 'rua abc',
      number: '123',
      city: 'Guarapuava',
      state: 'PR',
      cep: '85000-000',
      phone: '42991422029',
      site: 'www.google.com',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Ciclano',
      email: 'ciclano@gmail.com',
      cpfcnpj: '09409409494',
      street: 'rua abc',
      number: '123',
      city: 'Guarapuava',
      state: 'PR',
      cep: '85000-000',
      phone: '42991422029',
      site: 'www.pimbosite.com',
      created_at: new Date(),
      updated_at: new Date(),
    }]);
  },

  down: (queryInterface) => queryInterface.dropTable('companies'),
};
