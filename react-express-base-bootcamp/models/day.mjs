export default function initDayModel(sequelize, DataTypes) {
  return sequelize.define(
    'day',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tripId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'trips',
          key: 'id',
        },
      },
      countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
       data: {
        type: DataTypes.JSON,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
      tableName: 'days',
       
    }
  );
}