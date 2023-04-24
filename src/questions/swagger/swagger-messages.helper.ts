import { MessagesHelper } from '../../helpers/message.helper';

export const QuestionsMsgSwagger = {
  ALL_200: 'Success! It returns a list of questions.',
  ALL_SUMMARY: 'It returns a list with all the questions.',
  CREATE_200: 'Question created successfully.',
  CREATE_400: 'Invalid data. Ex.' + MessagesHelper.PASSWORD_VALID,
  CREATE_409: 'Conflit data.',
  CREATE_SUMMARY: 'Create a new question',
  FIND_QUESTION_200: 'List all questions successfully.',
  FIND_QUESTION_SUMMARY: 'Fetch one question by Id',
  UPDATE_200: 'Question updated successfully.',
  UPDATE_SUMMARY: 'Update a questions by Id',
  QUESTION_NOT_FOUND: 'Question not found.',
  REMOVE_200: 'Question removed succeffully.',
  REMOVE_SUMMARY: 'Removes a question, it searchs by Id',
};
