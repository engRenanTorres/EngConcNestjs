import { MessagesHelper } from '../../helpers/message.helper';

export const UsersMsgSwagger = {
  ALL_200: 'All users listed successfully.',
  ALL_SUMMARY: 'It lists all users.',
  CREATE_200: 'User created successfully.',
  CREATE_400: 'Invalid data. Ex.' + MessagesHelper.PASSWORD_VALID,
  CREATE_409: 'Email already exist.',
  CREATE_SUMMARY: 'Creates a new user',
  FIND_USER_200: 'Lists all users.',
  FIND_USER_SUMMARY: 'Fetch an user by Id',
  UPDATE_200: 'User updated successfully.',
  UPDATE_SUMMARY: 'Updates a user. It fetchs by id.',
  USER_NOT_FOUND: 'User not found.',
  REMOVE_200: 'Users removed successfully.',
  REMOVE_SUMMARY: 'Removes an user, It fetchs by email',
};
