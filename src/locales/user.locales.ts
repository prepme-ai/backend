export enum UserLocales {
  // Response messages
  INTERNAL_ERROR = 'Error is not handled correctly!',

  USER_EXIST = 'User exists.',
  NOT_REGISTERED_BOTH = 'User is not registered FB and not added to DB. Enter valid phonenumber and email!',
  REGISTERED_BOTH = 'User is registered and added to DB',
  REGISTERED_ONLY_FB = "User is registered FB but didn't create mongo entry.",

  USER_NOT_FOUND = 'User not found!',

  LOGGED_IN_SUCCESS = 'Logged in successfully!',
  NOT_LOGGED_IN = 'Not logged in!',
  PASSWORD_WRONG = 'Password is wrong!',

  TOKEN_REFRESHED = 'Token is refreshed!',
  TOKEN_NOT_REFRESHED = 'Token is not refreshed!',

  // LOGS
  REGISTERED_FB = 'User is authenticated Firebase.',
  CREATED_MONGO_ENTRY = 'Created mongoDB user entry.',
}
