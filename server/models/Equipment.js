module.exports = (sequelize, DataTypes) => {

    const Equipment = sequelize.define("Equipment", {
        image: {
            type: DataTypes.STRING,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
            allowNull:false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.TINYINT(1),
            allowNullable: false
        },

    })
    return Equipment
}