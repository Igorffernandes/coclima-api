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
      email: {
        type: Sequelize.STRING,
        allowNull: true,
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
      complement: {
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
      district: {
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
      site: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
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
      logo: {
        type: Sequelize.TEXT,
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
    queryInterface.bulkInsert('companies', [
      {
        name: 'CoClima',
        email: 'robertaguimaraesdesouza@gmail.com',
        cpfcnpj: '24208879000120',
        street: 'AV ALFREDO BALTHAZAR DA SILVEIRA',
        number: '339',
        complement: 'APT 1402;BLOCO 2',
        city: 'RIO DE JANEIRO',
        state: 'RJ',
        district: 'RECREIO DOS BANDEIRANTES',
        cep: '22790-710',
        phone: '(27) 9924-8999',
        site: 'www.coclima.com',
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
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
        role: 'company',
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
        role: 'partner',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface) => queryInterface.dropTable('companies'),
};
