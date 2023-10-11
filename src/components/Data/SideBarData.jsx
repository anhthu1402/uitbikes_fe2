import {
  AccountBalanceWalletRounded,
  CreditCardRounded,
  PasswordRounded,
  PersonRounded,
  ReceiptLongRounded,
} from "@mui/icons-material";

export const SideBarData = [
  {
    title: "Tài Khoản",
    icon: PersonRounded,
    path: "profile",
  },
  {
    title: "Đổi mật khẩu",
    icon: PasswordRounded,
    path: "change-password",
  },
  {
    title: "Quản lý tài chính",
    icon: AccountBalanceWalletRounded,
    path: "balance",
  },
  {
    title: "Nạp tiền",
    icon: CreditCardRounded,
    path: "charge-request",
  },
  {
    title: "Đơn mua",
    icon: ReceiptLongRounded,
    path: "invoice",
  },
];
