module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      sno: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      location:{
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
    return User;
  };