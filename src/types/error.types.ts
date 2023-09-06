export enum FirebaseAuthenticationErrors{
    /**
     * @description error.code is the error type
     * @description error.name Firebase error etc.
     */
    WRONG_PASSWORD = "auth/wrong-password",
    USER_NOT_FOUND = "auth/user-not-found",
    TOO_MANY_REQUESTS = "auth/too-many-requests"
}