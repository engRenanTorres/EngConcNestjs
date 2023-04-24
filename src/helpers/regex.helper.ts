const password = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{6,}$/;
const answer = /^([a-e]|Correta|Errada)$/;

export const RegexHelper = { password, answer };
