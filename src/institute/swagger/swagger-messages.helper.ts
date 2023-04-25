import { MessagesHelper } from '../../helpers/message.helper';

export const InstitutesMsgSwagger = {
  ALL_200: 'All institutes listed successfully.',
  ALL_SUMMARY: 'It lists all institutes.',
  CREATE_200: 'Institute created successfully.',
  CREATE_400: 'Invalid data. Ex.' + MessagesHelper.PASSWORD_VALID,
  CREATE_409: 'Name already exist.',
  CREATE_SUMMARY: 'Creates a new institute',
  FIND_INSTITUTE_200: 'Lists all institutes.',
  FIND_INSTITUTE_SUMMARY: 'Fetch an institute by Id',
  UPDATE_200: 'Institute updated successfully.',
  UPDATE_SUMMARY: 'Updates a institute. It fetchs by id.',
  INSTITUTE_NOT_FOUND: 'Institute not found.',
  REMOVE_200: 'Institutes removed successfully.',
  REMOVE_SUMMARY: 'Removes an institute, It fetchs by Name',
};
