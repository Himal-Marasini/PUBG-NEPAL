const registration = require('../controllers/registration');
const {
    body
} = require('express-validator/check');

const express = require('express');
const Router = express.Router();

Router.get('/register/:id', registration.getRegistration);

Router.post('/register', registration.postRegistration);

Router.post('/pubg/validation', registration.validateData);

// Router.post('/pubg/validation', [
//     body('registratorName')
//         .isEmpty()
//         .withMessage('Registrator Name is required'),
//     body('teamName')
//         .isEmpty()
//         .withMessage('Team Name is required'),
//     body('phoneNumber')
//         .isEmpty()
//         .isLength({ max: 10 })
//         .withMessage('Phone number must be 10 digit'),
//     body('registrator_khaltiId')
//         .isEmpty()
//         .isLength({ max: 10, min: 10 })
//         .withMessage('Khalti ID must be 10 digit'),
//     check('memberOne_name')
//         .isEmpty()
//         .withMessage('Member one name is required'),
//     body('memberTwo_name')
//         .isEmpty()
//         .withMessage('Member two name is required'),
//     body('memberThree_name')
//         .isEmpty()
//         .withMessage('Member three name is required'),
//     body('memberFour_name')
//         .isEmpty()
//         .withMessage('Member four name is required'),
//     body('memberOneCharId')
//         .isEmpty()
//         .withMessage('Member one character Id is required'),
//     body('memberTwoCharId')
//         .isEmpty()
//         .withMessage('Member two character Id is required'),
//     body('memberThreeCharId')
//         .isEmpty()
//         .withMessage('Member three character Id is required'),
//     body('memberFourCharId')
//         .isEmpty()
//         .withMessage('Member four character Id is required')
// ], registration.validateData);

// Router.post('/pubg/validation', [
//     body('registrator_name')
//         .isEmpty()
//         .withMessage('Registrator Name is required'),
//     body('registrator_teamName')
//         .isEmpty()
//         .withMessage('Team Name is required'),
//     body('registrator_phoneNumber')
//         .isEmpty()
//         .isLength({ max: 10 })
//         .withMessage('Phone number must be 10 digit'),
//     body('registrator_khaltiId')
//         .isEmpty()
//         .isLength({ max: 10, min: 10 })
//         .withMessage('Khalti ID must be 10 digit'),
//     body('memberOne_name')
//         .isEmpty()
//         .withMessage('Member one name is required'),
//     body('memberTwo_name')
//         .isEmpty()
//         .withMessage('Member two name is required'),
//     body('memberThree_name')
//         .isEmpty()
//         .withMessage('Member three name is required'),
//     body('memberFour_name')
//         .isEmpty()
//         .withMessage('Member four name is required'),
//     body('memberOne_charId')
//         .isEmpty()
//         .withMessage('Member one character Id is required'),
//     body('memberTwo_charId')
//         .isEmpty()
//         .withMessage('Member two character Id is required'),
//     body('memberThree_charId')
//         .isEmpty()
//         .withMessage('Member three character Id is required'),
//     body('memberFour_charId')
//         .isEmpty()
//         .withMessage('Member four character Id is required')
// ], registration.validateData);


// Router.get('/emuplayer/:id', registration.getEmuForm);

// Router.post('/moboplayer', registration.postMoboForm);

// Router.post('/emuplayer', registration.postEmuForm);

module.exports = Router;