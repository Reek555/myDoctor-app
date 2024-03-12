const {Sequelize, QueryTypes, DataTypes } = require ('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@localhost:5432/test'); // Example for postgres


//distinguish between model name and table name
const Profile = sequelize.define('profile', { 

    specialization: {
        type:DataTypes.STRING,
        validate: {
                notEmpty: {
                    args: true,
                    msg: "هذا الحقل مطلوب"
                }
        }
    },
    workingHours: {
        type:DataTypes.STRING,
        validate: {
                notEmpty: {
                    args: true,
                    msg: "هذا الحقل مطلوب"
                }
        }
    }, 
    address: {
        type: DataTypes.STRING,
        unique: true, 
        validate: {
                notEmpty: {
                    args: true,
                    msg: "هذا الحقل مطلوب"
                }
        }
    }, 
    phone: {
        type: DataTypes.STRING,
        validate: {
                notEmpty: {
                    args: true,
                    msg: "هذا الحقل مطلوب"
                },
        }
    }
}
); 



module.exports = Profile; 