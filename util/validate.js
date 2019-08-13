const Joi = require('joi');

function validate(inputData) {

    const objectSchema = {
        registratorName: Joi.string().required(),
        teamName: Joi.string().required(),
        emailId: Joi.string().email().required(),
        phoneNumber: Joi.number().required(),
        payReceiveId: Joi.string().required(),
        matchType: Joi.string().required(),

        memberOneName: Joi.string().required().error(errors => {
            return {
                message: "Member One Name is required."
            };
        }),
        memberOneCharId: Joi.number().required().error(errors => {
            return {
                message: "Character ID One is required."
            };
        }),
        memberTwoName: Joi.string().required().error(errors => {
            return {
                message: "Member Name Two is required."
            };
        }),
        memberTwoCharId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Two is required."
            };
        }),
        memberThreeName: Joi.string().required().error(errors => {
            return {
                message: "Member Name Three is required."
            };
        }),
        memberThreeCharId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Three is required."
            };
        }),
        memberFourName: Joi.string().required().error(errors => {
            return {
                message: "Member Name Four is required."
            };
        }),
        memberFourCharId: Joi.number().required().error(errors => {
            return {
                message: "Character ID Four is required."
            };
        }),
    };

    return Joi.validate(inputData, objectSchema);
}

module.exports = validate;