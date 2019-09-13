const Joi = require('joi');

function validate(inputData) {

    const objectSchema = {
        registrator_name: Joi.string().required(),
        registrator_teamName: Joi.string().required(),
        registrator_emailId: Joi.string().email().required(),
        registrator_phoneNumber: Joi.number().required(),
        registrator_khaltiId: Joi.string().required(),
        registrator_matchType: Joi.string().required(),

        memberOne_name: Joi.string().required().error(errors => {
            return {
                message: "Member One Name is required."
            };
        }),
        memberOne_charId: Joi.number().required().error(errors => {
            return {
                message: "Character ID One is required."
            };
        }),
        memberTwo_name: Joi.string().required().error(errors => {
            return {
                message: "Member Name Two is required."
            };
        }),
        memberTwo_charId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Two is required."
            };
        }),
        memberThree_name: Joi.string().required().error(errors => {
            return {
                message: "Member Name Three is required."
            };
        }),
        memberThree_charId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Three is required."
            };
        }),
        memberFour_name: Joi.string().required().error(errors => {
            return {
                message: "Member Name Four is required."
            };
        }),
        memberFour_charId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Four is required."
            };
        }),
    };
    return Joi.validate(inputData, objectSchema);
}

module.exports = validate;