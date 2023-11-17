/*
const flipArray = (array) => {
    const flippedArray = []
    for (let i = 0; i < array.lenth; i++) {
        flippedArray = 
    }
}
*/


const ENVIRONMENT = 'test'

const CONTACTS = [{
    contact: {
        username: 'xyz',
        firstName: 'x',
        lastName: 'z',
        email: 'x',
        id: 2
    },
    notif: {
        sender: 'xyz',
        receiver: 'abc',
        message: 'Hi',
        count: 1,
        date: '4: 17',
        id: 1
    }
}, {
    contact: {
        username: 'yst',
        firstName: 'y',
        lastName: 't',
        email: 'x',
        id: 3
    },
    notif: {
        sender: 'yst',
        receiver: 'abc',
        message: 'Hi',
        count: 0,
        date: '9:04',
        id: 2
    }
}]

const test = {
    user: {
        username: 'abc',
        firstName: 'a',
        lastName: 'c',
        email: 'a',
        passwordHash: 'abc',
        contacts: [ 2, 3, 4],
        messages: [1, 2, 3, 4],
        //The below is not needed
        /* 
           Notification where the current user 
           is the receiver 
        */
       notif: [{
            sender: [2, 3, 4],
            count: Number,
            message: 2
        }],
        id: 1
    },
    contacts: [{
        username: 'xyz',
        firstName: 'x',
        lastName: 'z',
        email: 'x',
        passwordHash: 'xyz',
        contacts: [ 1, 3, 4],
        messages: [1, 2, 3, 4],
        //The below is not needed
        /* 
           Notification where the current user 
           is the receiver 
        */
       notif: [{
            sender: [1, 3, 4],
            count: Number,
            message: 2
        }],
        id: 2
    }, {
        username: 'male',
        firstName: 'm',
        lastName: 'e',
        email: 'm',
        passwordHash: 'male',
        contacts: [ 1, 2, 4],
        messages: [1, 2, 3, 4],
        //The below is not needed
        /* 
           Notification where the current user 
           is the receiver 
        */
       notif: [{
            sender: [1, 2, 4],
            count: Number,
            message: 2
        }],
        id: 3
    }, {
        username: 'female',
        firstName: 'f',
        lastName: 'e',
        email: 'f',
        passwordHash: 'female',
        contacts: [ 1, 2, 3],
        messages: [1, 2, 3, 4],
        //The below is not needed
        /* 
           Notification where the current user 
           is the receiver 
        */
       notif: [{
            sender: [1, 2, 3],
            count: Number,
            message: 3
        }],
        id: 4
    }],
    message: {
        string: 'Yes',
        files: [],
        sender: 1,
        receiver: 3,
        date: new Date(),
        // Keep track of all message number between the same users
        sortNumber: 1,
    }
}

export default {
    ENVIRONMENT,
    CONTACTS
}