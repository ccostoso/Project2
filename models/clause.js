module.exports = function (sequelize, DataTypes) {
    const Clause = sequelize.define("Clause", {
        clause_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clause_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clause_requires: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });

    return Clause;
};
