import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"

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
dayjs.extend(utc)
export const FormatDate = (string) => {
    return dayjs.utc(new Date(string)).local().format('DD/MM/YYYY');
}

export const FormatDateTime = (string) => {
    return dayjs.utc(new Date(string)).local().format('HH:mm:ss DD/MM/YYYY');
    // return new Date(string).toLocaleString(undefined, {
    //     hour: '2-digit',
    //     minute: '2-digit',
    //     second: '2-digit',
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    // // });
    // return new Date(string).toLocaleString()
}

export const getPaymentHistory = (status) => {
    switch (status) {
        case 3: {
            return "Hủy";
        }
        default: {
            return "Thanh toán";
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

export const optionsEInvoice = [
    {
        status: -1,
        value: "Tất cả",
    },
    {
        status: 0,
        value: "Chờ xác nhận",
    },
    {
        status: 1,
        value: "Đang giao",
    },
    {
        status: 2,
        value: "Đã giao",
    },
    {
        status: 3,
        value: "Đã hủy",
    },
];

export const typeData = [
    {
        id: 0,
        name: "Tất cả",
    },
    {
        id: 1,
        name: "Xe số",
    },
    {
        id: 2,
        name: "Xe tay ga",
    },
    {
        id: 3,
        name: "Xe phân khối lớn",
    },
]
