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
    async mobosave() {
        const Usermobile = User('usermobile');
        const usermobile = new Usermobile(this);

        const data = await usermobile.save();
        return data;
        // console.log(data, `The data has been console.log line 67`);
    }

    async emusave() {
        const Useremulator = User('useremulator');
        const useremulator = new Useremulator(this);

        const data = await useremulator.save();
        // console.log(data, `The data has been console.log line 75`);
    }
}

module.exports = FormData;