module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('archives', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    data: {
      type: Sequelize.TEXT,
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
    plantation_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    keywords: {
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

  down: async (queryInterface) => queryInterface.dropTable('archives'),
};
