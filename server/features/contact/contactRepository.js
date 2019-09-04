const axios = require('axios');
const { sequelize, contact } = require('../../model/index');
const general = require('../../utils/general');

class studentRepository {
    static async getAll(request, response, next) {
        try {
            const result = await contact.findAll({
                attributes: ['contactid', 'firstname', 'lastname', 'email', 'contact', 'type'],
                where: {
                    userid: request.user.userid,
                    isactive: true
                },
                order: ['firstname']
            });
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async get(request, response, next) {
        try {
            const contactId = request.params.id;
            const result = await contact.findOne({
                attributes: ['contactid', 'firstname', 'lastname', 'email', 'contact', 'type'],
                where: {
                    contactid: contactId
                }
            });
            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }

    static async create(request, response, next) {
        try {
            let contactData = request.body;
            contactData.userid = request.user.userid;
            const result = await contact.create(contactData);
            response.status(200).json({ message: "successful" });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async update(request, response, next) {
        try {
            const contactData = request.body;
            const contactId = request.params.id;
            const result = await contact.update(contactData, {
                where: {
                    contactid: contactId
                }
            });
            response.status(200).json({ message: "successful" });
        } catch (error) {
            next(error);
        }
    }

    static async remove(request, response, next) {
        try {
            const contactId = request.params.id;
            const result = await contact.update({
                isactive: false
            }, {
                where: {
                    contactid: contactId
                }
            });
            response.status(200).json({ message: "successful" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = studentRepository;