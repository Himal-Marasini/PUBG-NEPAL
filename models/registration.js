class Khalti {
    // constructor(data) {
    //     this.data = data;
    // }

    static moboSave(data) {
        return data;
    }

    static checking(verify) {
        console.log(verify.status);
        // console.log('This has been logged from your Function of Khalti', this.data);
        console.log('This has been logged from your Function of Khalti', Khalti.moboSave());
    }
}

// exports.FormData = FormData;
exports.Khalti = Khalti;