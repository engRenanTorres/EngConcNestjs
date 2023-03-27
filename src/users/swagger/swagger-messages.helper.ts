import { MessagesHelper } from '../../../src/helpers/message.helper';

export const UsersMsgSwagger = {
  ALL_200: 'Lista retornada com sucesso.',
  ALL_SUMMARY: 'Lista todos os usuarios cadastrados.',
  CREATE_200: 'Usuário criado com sucesso.',
  CREATE_400: 'Dados inválidos. Ex.' + MessagesHelper.PASSWORD_VALID,
  CREATE_409: 'Email already exist.',
  CREATE_SUMMARY: 'Cria um novo usuario',
  FIND_USER_200: 'Lista retornada com sucesso.',
  FIND_USER_SUMMARY: 'Busca um usuario pelo Id',
  UPDATE_200: 'Usuário atualizado com sucesso.',
  UPDATE_SUMMARY: 'Atualiza um usuário pelo id',
  USER_NOT_FOUND: 'Usuário não encontrado.',
  REMOVE_200: 'Usuário removido com sucesso.',
  REMOVE_SUMMARY: 'Remove um usuário, buscando-o pelo email',
};
