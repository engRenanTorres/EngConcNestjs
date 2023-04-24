export const MessagesHelper = {
  ACCESS_DENIED:
    'Acesso negado. O usuário não tem permissão de acessar este endpoint.',
  USER_NAME_DESCRIPTION: 'Nome completo do usuário.',
  USER_EMAIL_DESCRIPTION: 'E-mail do usuário',
  USER_ROLES_DESCRIPTION:
    'Nível de Permissões do usuário. 1 = ADM; 2 = STAF; 3 = CLIENT; 4 = READER',
  PASSWORD_VALID:
    'A senha deve conter letras minúsculas e maiúsculas, números, caracters especiais e ser maior que 6 dígitos.',
  PASSWORD_CHECK: 'Usuário e/ou senha são inválidos.',
  ST_AREA_NOT_FOUND: 'Study area not found. Disered id: ',
  QUESTION_TEXT_DESCRIPTION: 'Texto onde será inserida a pergunta da questão',
  QUESTION_ANSWER_DESCRIPTION:
    'Resposta da questão. Aceita apenas os resultados a, b, c, d, e, Correta, Errada',
  CHOICES_VALID:
    'Array das opções. O tamanho pode ser de 0 a 5. Se for passado um array vazio, as opções serão Verdadeiro, ou Falso.',
  ANSWER_VALID: 'Aceita apenas os resultados a, b, c, d, e, Correta, Errada',
  TIP_DESCRIPTION: 'Tips to explains the answers of the questions.',
  YEAR_DESCRIPTION:
    'Year that the test was applied. Min. value is 2010 and the Max is the actual year.',
};
