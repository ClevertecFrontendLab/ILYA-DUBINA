export const REG_RUS =
    /[а-яёА-ЯЁ\\!\\@\\#\\$\\%\\^\\&\\*\\(\\)\\_\\+\\\-\\=\\{\\}\\;\\'\\:\\"\\|\\,\\.\\<\\>\\?]/g;
export const REG_NUM_WORD = /(?=.*[0-9])(?=.*[A-Z])(?=.*[A-Z0-9]).{8,}/;
export const REG_EMAIL = /^([^.@]+)(\.[^.@]+)*@([^.@]+\.)+([^.@]+).{1,}$/;