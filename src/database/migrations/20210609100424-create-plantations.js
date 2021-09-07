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
      allowNull: false,
    },
    company_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    partner_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    receipts_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    tree_value: {
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
  }),

  down: async (queryInterface) => queryInterface.dropTable('plantations'),
};
