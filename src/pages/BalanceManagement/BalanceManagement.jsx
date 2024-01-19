import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  FormatDate,
  FormatDateTime,
  currency_format,
  getChargeRequestStatus,
  getPaymentHistory,
} from "../../service";
import styled from "@emotion/styled";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    textAlign: "center",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
    border: 0,
    textAlign: "center",
  },
}));

function BalanceManagement() {
  const { isAuthed, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(user.customer.balance || 0);
  const [invoiceData, setInvoiceData] = useState([]);
  const [chargeRequestData, setChargeRequestData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        "http://localhost:9090/api/invoices/customer/" +
          user.customer.id +
          "/status/-1"
      )
      .then((res) => {
        if (res.data.length > invoiceData.length) {
          setInvoiceData(res.data.reverse());
          axios
            .get("http://localhost:9090/api/accounts/" + user.username)
            .then((response) => {
              if (response.data.customer.balance !== balance) {
                dispatch(authActions.setAuth(response.data));
                setBalance(response.data.customer.balance);
              }
            })
            .catch((error) => console.log(error));
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:9090/api/requests/customer/" + user.customer.id)
      .then((res) => {
        setChargeRequestData(res.data.reverse());
        axios
          .get("http://localhost:9090/api/accounts/" + user.username)
          .then((response) => {
            if (response.data.customer.balance !== balance) {
              dispatch(authActions.setAuth(response.data));
              setBalance(response.data.customer.balance);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }, [invoiceData, chargeRequestData, user, balance, dispatch]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <h4>Thông tin số dư tài khoản</h4>
      <Box
        sx={{
          marginBottom: 3,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <p>Số dư tài khoản hiện tại:</p>
          <h4 style={{ fontWeight: "bold", color: "#306c6c" }}>
            {currency_format(balance)} VNĐ
          </h4>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#306c6c",
            "&:hover": {
              backgroundColor: "#306c60",
            },
          }}
          onClick={() => navigate("/profile/charge-request")}
        >
          Nạp tiền
        </Button>
      </Box>
      <Box>
        <h4 style={{ marginBottom: 20 }}>Lịch sử thanh toán</h4>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 330, minWidth: 450, marginBottom: 5 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Thời gian</StyledTableCell>
                <StyledTableCell>Mô tả</StyledTableCell>
                <StyledTableCell>Số tiền</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData &&
                invoiceData.map((row) => (
                  <StyledTableRow role="checkbox" key={row.id} tabIndex={-1}>
                    <StyledTableCell component={"th"} scope="row">
                      {FormatDateTime(row.date)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {getPaymentHistory(row.status)} hóa đơn {row.id}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row.status === 3 ? "+" : "-"}
                      {currency_format(row.total)} VNĐ
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <h4 style={{ marginBottom: 20 }}>Lịch sử nạp tiền</h4>
        <TableContainer
          component={Paper}
          sx={{ maxHeight: 330, minWidth: 450 }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>Mã nạp tiền</StyledTableCell>
                <StyledTableCell>Ngày nạp</StyledTableCell>
                <StyledTableCell>Số tài khoản</StyledTableCell>
                <StyledTableCell>Số tiền</StyledTableCell>
                <StyledTableCell>Trạng thái</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {chargeRequestData &&
                chargeRequestData.map((row) => (
                  <StyledTableRow role="checkbox" key={row.id} tabIndex={-1}>
                    <StyledTableCell component={"th"} scope="row">
                      {row.id}
                    </StyledTableCell>
                    <StyledTableCell>{FormatDate(row.date)}</StyledTableCell>
                    <StyledTableCell>{row.accountNumber}</StyledTableCell>
                    <StyledTableCell>
                      {currency_format(row.money)} VNĐ
                    </StyledTableCell>
                    <StyledTableCell>
                      {getChargeRequestStatus(row.status)}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default BalanceManagement;
