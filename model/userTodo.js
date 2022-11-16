require("dotenv").config();
module.exports = (sequelize, DataTypes, User,Todo) => {
  const UserTodo = sequelize.define(process.env.DB_TABLE, {
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    TodoId: {
      type: DataTypes.INTEGER,
      references: {
        model: Todo,
        key: "id",
      },
    },
    
    
  },{
    timestamps:false
  });
  return UserTodo;
};
