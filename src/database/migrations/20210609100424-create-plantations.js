module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('plantations', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    trees: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    geolocation: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'companies', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
  }),

  down: async (queryInterface) => queryInterface.dropTable('plantations'),
};
