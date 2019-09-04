const general = require('../utils/general');
class ContactModel extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true
            },
            contactid: {
                type: DataTypes.UUID,
                allowNull: true,
                primaryKey: true,
                validate: {
                    isUUID: 4
                },
                defaultValue: () => general.genUUID()
            },
            firstname: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    max: 20
                }
            },
            lastname: {
                type: DataTypes.STRING(20),
                allowNull: true,
                validate: {
                    max: 20
                }
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true,
                validate: {
                    max: 50
                }
            },
            contact: {
                type: DataTypes.STRING(10),
                allowNull: true,
                validate: {
                    len: [10, 10]
                }
            },
            type: {
                type: DataTypes.STRING,
                allowNull: true,
                defaultValue: 'home'
            },
            isactive: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
                defaultValue: true
            }
        }, {
            modelName: "contact",
            sequelize
        });
    }

    getFullName() {
        return `${this.firstname} ${this.lastname}`;
    }

    static associate(models) {
        this.myAssociation = models.contact.belongsTo(models.users, { foreignKey: 'userid', as: 'users' });
    }
}

module.exports = ContactModel;