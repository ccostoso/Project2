module.exports = function (sequelize, DataTypes) {
    const Book = sequelize.define("Book", { 
        book_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        book_desc: {
            type: DataTypes.STRING,
            allowNull: true
        } 
    });
//여기서도 콜럼 이름이랑 매치
    return Book;
};
