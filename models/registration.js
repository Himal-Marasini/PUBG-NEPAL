const axios = require('axios');
const User = require('../models/database/schema');
class FormData {
    constructor(client) {
        this.registratorName = client.registratorName;
        this.teamName = client.teamName;
        this.emailId = client.emailId;
        this.phoneNumber = client.phoneNumber;
        this.payReceiveId = client.payReceiveId;
        this.matchType = client.matchType;
        this.members = [{
            name: client.memberOneName,
            characterID: client.memberOneCharId
        }, {
            name: client.memberTwoName,
            characterID: client.memberTwoCharId
        }, {
            name: client.memberThreeName,
            characterID: client.memberThreeCharId
        }, {
            name: client.memberFourName,
            characterID: client.memberFourCharId
        }];
    }
    static async mobosave() {
        const Usermobile = User('usermobile');
        const usermobile = new Usermobile(this);

        const data = await usermobile.save();
        return data;
    }

    static async emusave() {
        const Useremulator = User('useremulator');
        const useremulator = new Useremulator(this);
        await useremulator.save();
    }
}

class Khalti extends FormData {
    constructor(token) {
        super(token);
        this.token = token;
    }

    async verified() {
        var data = {
            "token": this.token,
            "amount": 20000
        };

        var config = {
            headers: {
                "Authorization": "Key test_secret_key_7e905fd8bdd9430897c79ce057af2512"
            }
        };

        const verified = await axios.post("https://khalti.com/api/v2/payment/verify/", data, config);

        if (verified) {
            return true;
        }

        return false;

        // .then(verified => {
        //     FormData.emusave();
        //     console.log("user has been saved to database", verified);
        // })
        // .catch(err => {
        //     console.error(err);
        // });
    }
}

exports.FormData = FormData;
exports.Khalti = Khalti;