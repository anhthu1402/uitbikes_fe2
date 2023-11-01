import dayjs from "dayjs";

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
export const getEInvoiceStatus = (status) => {
    switch (status) {
        case 0: {
            return "Chờ xác nhận";
        }
        case 1: {
            return "Đang giao";
        }
        case 2: {
            return "Đã giao";
        }
        default: {
            return "Đã hủy";
        }
    }
}
export const notiEInvoiceStatus = (invoiceId, status) => {
    switch (status) {
        case 0: {
            return {
                statusNoti: "Chờ xác nhận",
                noti: "Đơn hàng có số hóa đơn " + invoiceId + " đang chờ xác nhận."
            }
        }
        case 1: {
            return {
                statusNoti: "Đang giao",
                noti: "Đơn hàng có số hóa đơn " + invoiceId + " đang được giao."
            }
        }
        case 2: {
            return {
                statusNoti: "Giao thành công",
                noti: "Đơn hàng có số hóa đơn " + invoiceId + " đã được giao thành công."
            }
        }
        default: {
            return {
                statusNoti: "Hủy đơn hàng",
                noti: "Đơn hàng có số hóa đơn " + invoiceId + " đã bị hủy."
            }
        }
    }
}
export const FormatDate = (string) => {
    return dayjs(string).format('DD/MM/YYYY');

}

export const FormatDateTime = (string) => {
    return dayjs(new Date(string).toLocaleString()).format('DD/MM/YYYY HH:mm:ss');
}

export const getPaymentHistory = (status) => {
    switch (status) {
        case 2: {
            return "Thanh toán";
        }
        default: {
            return "Hủy";
        }
    }
}

export const getChargeRequestStatus = (status) => {
    switch (status) {
        case 1: {
            return "Thành công";
        }
        default: {
            return "Đang xác nhận";
        }
    }
}