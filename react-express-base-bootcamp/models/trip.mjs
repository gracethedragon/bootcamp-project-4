export default function initTripModel(sequelize, DataTypes) {
  return sequelize.define(
    'trip',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category_id: {
        type: DataTypes.STRING,
         references: {
          model: 'categories',
          key: 'id',
        },
      },
      data: {
        type: DataTypes.JSON
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
       tableName: 'trips',
    }
  );
}