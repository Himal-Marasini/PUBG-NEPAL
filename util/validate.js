const Joi = require('joi');

function validateWithoutKhaltiData(inputData) {

    const objectSchema = {
        id: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !!!"
            }
        }),
        registrator_name: Joi.string().required().error(err => {
            return {
                message: "PLEASE ENTER THE REGISTRATOR NAME !!!"
            };
        }),
        registrator_teamName: Joi.string().required().error(err => {
            return {
                message: "PLEASE ENTER THE TEAM NAME !!!"
            }
        }),
        registrator_emailId: Joi.string().email({ minDomainSegments: 2 }).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID EMAIL ID !!!"
            };
        }),
        registrator_phoneNumber: Joi.number().integer().min(1000000000).max(9999999999).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID PHONE NUMBER !!!"
            }
        }),
        registrator_khaltiId: Joi.number().integer().min(1000000000).max(9999999999).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID KHALTI ID !!!"
            }
        }),
        registrator_matchType: Joi.string().required(),

        memberOne_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER ONE NAME !!!"
            };
        }),
        memberOne_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER ONE CHARACTER ID !!!"
            };
        }),
        memberTwo_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER TWO NAME !!!"
            };
        }),
        memberTwo_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER TWO CHARACTER ID !!!"
            };
        }),
        memberThree_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER THREE NAME !!!"
            };
        }),
        memberThree_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER THREE CHARACTER ID !!!"
            };
        }),
        memberFour_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER FOUR NAME !!!"
            };
        }),
        memberFour_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER FOUR CHARACTER ID !!!"
            };
        }),
    };

    return Joi.validate(inputData, objectSchema);
}

function validateWithKhaltiData(inputData) {
    const objectSchema = {
        idx: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        token: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        amount: Joi.number().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        mobile: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        product_identity: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        product_name: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        product_url: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        widget_id: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        id: Joi.string().required().error(err => {
            return {
                message: "Sorry, Some problem has occured !! Contact us on (contact@pubgnepal.com)"
            }
        }),
        registrator_name: Joi.string().required().error(err => {
            return {
                message: "PLEASE ENTER THE REGISTRATOR NAME !!!"
            };
        }),
        registrator_teamName: Joi.string().required().error(err => {
            return {
                message: "PLEASE ENTER THE TEAM NAME !!!"
            }
        }),
        registrator_emailId: Joi.string().email({ minDomainSegments: 2 }).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID EMAIL ID !!!"
            };
        }),
        registrator_phoneNumber: Joi.number().min(10).max(10).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID PHONE NUMBER !!!"
            }
        }),
        registrator_khaltiId: Joi.number().min(10).max(10).required().error(err => {
            return {
                message: "PLEASE ENTER THE VALID KHALTI ID !!!"
            }
        }),
        registrator_matchType: Joi.string().required(),

        memberOne_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER ONE NAME !!!"
            };
        }),
        memberOne_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER ONE CHARACTER ID !!! !!!"
            };
        }),
        memberTwo_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER TWO NAME !!!"
            };
        }),
        memberTwo_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER TWO CHARACTER ID !!!"
            };
        }),
        memberThree_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER THREE NAME !!!"
            };
        }),
        memberThree_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER THREE CHARACTER ID !!!"
            };
        }),
        memberFour_name: Joi.string().required().error(errors => {
            return {
                message: "PLEASE ENTER THE MEMBER FOUR NAME !!!"
            };
        }),
        memberFour_charId: Joi.number().required().error(errors => {
            return {
                message: "PLEASE ENTER THE VALID MEMBER FOUR CHARACTER ID !!!"
            };
        }),
    };

    return Joi.validate(inputData, objectSchema);
}

exports.validateWithoutKhaltiData = validateWithoutKhaltiData;
exports.validateWithKhaltiData = validateWithKhaltiData;