const {Sequelize, QueryTypes, DataTypes } = require ('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/test'); // Example for postgres
const Profile = require("./profileModel")



//distinguish between model name and table name
const User = sequelize.define('user', { 
    name: {
        type:DataTypes.STRING,
        validate: {
                notEmpty: {
                    args: true,
                    msg: "الإسم مطلوب"
                }
        }
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "أدخل بريد إلكتروني صحيح"
            }
        }
    }, 
    password: {
        type:DataTypes.STRING,
        validate: {
            len: {args: [6,], msg: "كلمة المرور يجب أن تستوفي 6 حروف"},
        
        },
    }, 
    userType: {
        type: DataTypes.ENUM ("doctor", "normal"), 
    }, 
    latitude: {
        type: DataTypes.FLOAT,
        validate: {
            isFloat: {
                args: true, 
                msg: "مدخل خاطئ"
            }
        }
    }, 
    longitude: {
        type: DataTypes.FLOAT, 
        validate: {
            isFloat: {
                args: true, 
                msg: "مدخل خاطئ"
            }
        }
    }}
); 


User.hasOne(Profile); 

User.sync() //this  is an async fucntion in case of an error 
//Profile.sync({alter: true})
Profile.sync()

module.exports = User; 