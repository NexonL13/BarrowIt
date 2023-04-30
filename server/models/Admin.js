module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        email: {
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false
        },
    })

    // Admin.associate = (models) => {
    //     Admin.hasMany(models.Equipment, {
    //         onDelete: "cascade",
    //     })
    // }

    return Admin
}