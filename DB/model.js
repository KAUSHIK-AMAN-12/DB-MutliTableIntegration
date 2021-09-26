const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect : 'mysql',
    database : '5july',
    username : '5julyuser',
    password : '5julypass'
})

const User = db.define('user',{
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    email : {
        type : Sequelize.DataTypes.STRING(50),
        unique : true,
        allowNull : false
    },
    username : {
        type : Sequelize.DataTypes.STRING(20),
        unique : true,
        allowNull : false
    }
})

const Post = db.define('post',{
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    title : {
        type : Sequelize.DataTypes.STRING(70),
        allowNull : true
    }
})

const Comment = db.define('comment',{
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    commentbody : {
        type : Sequelize.DataTypes.TEXT,
        allowNull : true
    }
})

const Userdetail = db.define('userdetail',{
    id : {
        type : Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },
    profession : {
        type : Sequelize.DataTypes.TEXT,
        allowNull : true
    }
})

User.hasMany(Post) ;  //yaha pe "Posts" me "userId" banjayega jo source table ki id ko point karega
Post.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

//ham user se comment ko post throught sidha access nahi kar sakte hai isliye hume User Model
// ko connect karna padega Comment model se
User.hasMany(Comment);
Comment.belongsTo(User);
     
User.hasMany(Userdetail);
Userdetail.belongsTo(User);

module.exports = {
    User,Post,Comment,Userdetail
}
//db.authenticate();
//db.sync({force : true});