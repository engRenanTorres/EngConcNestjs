const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{6,}$/;
const answer = /^([a-e]|verdadeiro|falso)$/;

export const RegexHelper = { password, answer };
