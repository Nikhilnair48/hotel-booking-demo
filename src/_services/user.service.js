import { docCLient } from '../AWS';
import { uuidGenerator, asyncLocalStorage } from '../_utils';

export const userService = {
    login,
    logout,
    register,
    getByUsername,
    isSessionActive,
    getUserSession
};

async function login(username, password) {
    
    var params = {
        TableName: "Users",
        FilterExpression: "username = :username and password = :password",
        ExpressionAttributeValues: {
            ":username": username,
            ":password": password
        }
    }
    let scanPromise = new Promise((resolve, reject) => {
        docCLient.scan(params, function(error, user) {
            if(user.Items && user.Items.length > 0) {
                resolve( { status: 200, user: user.Items[0]} );
            } else if(user.Items.length == 0 && error == null) {
                reject({ status: 404, message:  "Incorrect username or password. Please try again." });
            } else {
                reject({ status: 400, message:  "Incorrect username or password. Please try again." });
            }
        })
    });

    return await scanPromise.then(user => user);
}

async function logout() {
    // remove user from local storage to log user out
    await asyncLocalStorage.setItem("user", null);

    return { status: 200, message: "You've been successfully logged out!" };

}

async function getByUsername(username) {

    var params = {
        TableName: "Users",
        FilterExpression: "username = :username",
        ExpressionAttributeValues: {
            ":username": username
        }
    }

    let scanPromise = new Promise((resolve, reject) => {
        // TO DO: ERROR MESSAGES ARE DUPLICATES. NEED MORE DESCRIPTIVE MESSAGES.
        docCLient.scan(params, function(error, user) {
            if(user.Items && user.Items.length > 0) {
                resolve({ status: 200, user: user});
            } else if(user.Items.length == 0 && error == null) {
                reject({ status: 404, message: "Incorrect username or password. Please try again." });
            } else {
                reject({ status: 400, message: "Incorrect username or password. Please try again." });
            }
        })
    });
    
    return await scanPromise.then(success => success, error => error);
}

async function register(user) {
    // CHECK IF USERNAME EXISTS
    let existingUser = await getByUsername(user.username);
    
    // USERNAME EXISTS. REJECT REGISRATION ATTEMPT.
    if(existingUser.status >= 200 && existingUser.status <= 204) {
        return { status: 409, message: "Username already exists. Please try again." };
    } else {
        // NEW USER OBJECT
        var params = {
            Item: {
                "userID" : uuidGenerator.generateUUID(),
                "username": user.username,
                "password": user.password,
                "firstname": user.firstname,
                "lastname" : user.lastname
            },
            ReturnConsumedCapacity: "TOTAL", 
            TableName: "Users"
        };

        // BEGIN PUT ATTEMPT, AND HANDLE IT'S SUCCESS/ERROR RESPONSE.
        let putPromise = new Promise((resolve, reject) => {
            docCLient.put(params, function(error, success) {
                if(success && success.ConsumedCapacity.CapacityUnits > 0) {
                    resolve({ status: 200, message: "Registration successful." });
                } else {
                    reject({ status: 409, message: "The user registration was unsuccessful.", ...error });
                }
            })
        })
        
        return await putPromise.then(registrationResult => registrationResult);
    }
}

function isSessionActive() {
    return localStorage.getItem("user") == null ? false : true;
}

function getUserSession() {
    if(isSessionActive()) {
        return localStorage.getItem("user");
    }

    return null;
}