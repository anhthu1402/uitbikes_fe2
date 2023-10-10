export const currency_format = (money) => {
    return Intl.NumberFormat('en-DE').format(money);
}