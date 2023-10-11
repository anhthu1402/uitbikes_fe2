export const currency_format = (money) => {
    return Intl.NumberFormat('en-DE').format(money);
}
export const formatDate = (day, month, year) => {
    if (month < 10) {
        if (day < 10) {
            return year + "-0" + month + "-0" + day;
        } else return year + "-0" + month + "-" + day;
    } else {
        if (day < 10) {
            return year + "-" + month + "-0" + day;
        } else {
            return year + "-" + month + "-" + day;
        }
    }
}