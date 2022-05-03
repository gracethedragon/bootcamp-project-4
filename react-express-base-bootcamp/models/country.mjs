export default function initCountryModel(sequelize, DataTypes) {
  return sequelize.define(
    'country',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        timestamps: false
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        timestamps: false
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
      tableName: 'countries',
    }
  );
}