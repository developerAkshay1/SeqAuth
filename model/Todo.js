module.exports = (sequelize, DataTypes, Model) => {
  class Todo extends Model {}
  Todo.init(
    {
      userEmail: {
        type: DataTypes.STRING,
        allownull: false,
      },
      // UserId: {
      //   type: DataTypes.INTEGER,
      //   allownull: true,
      // },
      Task: {
        type: DataTypes.STRING,
        allownull: false,
      },

      isCompleted: {
        type: DataTypes.STRING,
        allownull: false,
        defaultValue: "false",
      },
    },
    {
      sequelize,
      modelName: "Todo",
      tableName: "tododetails",
      createdAt: true,
      updatedAt: false,
    }
  );
  return Todo;
};
