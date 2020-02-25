module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define("Book", { //class라서 대문자로 작성
        book_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    });

    return Book;
};
