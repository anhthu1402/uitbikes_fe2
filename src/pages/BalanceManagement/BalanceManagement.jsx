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
  TablePagination,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { currency_format } from "../../service";
import { InvoiceData } from "../../components/Data/InvoiceData";
import styled from "@emotion/styled";
import { ChargeRequestData } from "../../components/Data/ChargeRequestData";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "whitesmoke",
    border: 0,
  },
}));

function BalanceManagement() {
  const [balance, setBalance] = useState(432000000);
  const [invoiceData, setInvoiceData] = useState(InvoiceData);
  const [chargeRequestData, setChargeRequestData] = useState(ChargeRequestData);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Grid
        container
        columnSpacing={{ xs: 1, md: 1 }}
        columns={{ xs: 6, md: 12 }}
      >
        <Grid item xs={12} sm={5} md={5}>
          <Box sx={{ marginBottom: 5 }}>
            <h4>Thông tin số dư tài khoản</h4>
            <p>Số dư tài khoản hiện tại:</p>
            <h4 style={{ fontWeight: "bold", color: "#306c6c" }}>
              {currency_format(balance)} VNĐ
            </h4>
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={7}>
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
                        {row.date}
                      </StyledTableCell>
                      <StyledTableCell>
                        Thanh toán hóa đơn {row.id}
                      </StyledTableCell>
                      <StyledTableCell>
                        {currency_format(row.total)} VNĐ
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
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
                <StyledTableCell>Sô tiền</StyledTableCell>
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
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell>{row.account_number}</StyledTableCell>
                    <StyledTableCell>
                      {currency_format(row.money)} VNĐ
                    </StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
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
