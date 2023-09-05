export enum UserLocales {
    // Response messages
    USER_EXIST =  "User exists.",
    USER_NOT_FOUND = "User not found!",
    NOT_REGISTERED_BOTH = "User is not registered FB and not added to DB. Enter valid phonenumber and email!",
    REGISTERED_BOTH = "User is registered and added to DB",
    REGISTERED_ONLY_FB = "User is registered FB but didn't create mongo entry.",

    // LOGS
    REGISTERED_FB = "User is authenticated Firebase.",
    CREATED_MONGO_ENTRY = "Created mongoDB user entry.",    
}