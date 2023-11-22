import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";

function ForgotPassword({ handleOpenForgotPw }) {
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const emailRef = useRef();
  const codeRef = useRef();
  const handleSendCode = () => {
    const email = emailRef.current.value;
    setEmail(email);
    let resultSuccess = document.getElementById("success");
    let resultError = document.getElementById("error");
    if (email !== "" && email.match(/^(?=.*[@])(?=.*[.]).{8,}$/)) {
      axios
        .get(`http://localhost:9090/api/accounts/email/${email}`)
        .then((res) => {
          if (res.data === true) {
            setDisabled(true);
            resultError.style.display = "none";
            axios
              .get(`http://localhost:9090/api/mail/send-code/email/${email}`)
              .then((resCode) => {
                setCode(resCode.data);
                console.log("Email sent!");
                resultSuccess.style.display = "block";
                resultError.style.display = "none";
                resultSuccess.innerHTML =
                  "Mã xác nhận đã được gửi đến email của bạn.";
                handleNext();
                setDisabled(false);
              })
              .catch((err) => console.log(err));
          } else {
            resultSuccess.style.display = "none";
            resultError.style.display = "block";
            resultError.innerHTML = "Email này chưa đăng ký tài khoản!";
          }
        });
    } else {
      resultError.style.display = "block";
      resultError.innerHTML = "Vui lòng nhập email đúng định dạng!";
    }
  };
  const handleSendPassword = () => {
    const codeTemp = codeRef.current.value;
    let resultError = document.getElementById("error");
    let resultSuccess = document.getElementById("success");
    if (codeTemp === code) {
      setDisabled(true);
      axios
        .get(`http://localhost:9090/api/mail/send-new-password/email/${email}`)
        .then((res) => {
          resultSuccess.style.display = "block";
          resultError.style.display = "none";
          resultSuccess.innerHTML =
            "Mật khẩu mới đã được gửi đến email của bạn.";
          handleNext();
          setDisabled(false);
        })
        .catch((err) => console.log(err));
    } else {
      resultSuccess.style.display = "none";
      resultError.style.display = "block";
      resultError.innerHTML = "Mã xác nhận không đúng!";
    }
  };
  const steps = [
    {
      label: "Nhập email",
      button: "Gửi mã code",
      inputRef: emailRef,
    },
    {
      label: "Nhập mã code",
      button: "Gửi mật khẩu mới",
      inputRef: codeRef,
    },
    {
      label: "Hoàn thành",
      inputRef: null,
      button: "Đăng nhập",
    },
  ];

  return (
    <div className="signin">
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Box
                className="content"
                sx={{
                  mb: 2,
                  mt: 3,
                }}
              >
                <TextField
                  hidden={index === 2 ? true : false}
                  variant="outlined"
                  fullWidth
                  className="textfield"
                  inputRef={step.inputRef}
                  autoComplete="true"
                />
                <Button
                  disabled={disabled}
                  variant="contained"
                  onClick={
                    index === 0
                      ? handleSendCode
                      : index === 1
                      ? handleSendPassword
                      : handleOpenForgotPw
                  }
                  sx={{
                    textTransform: "none",
                    mt: 3,
                    backgroundColor: "#306c6c",
                    "&:hover": {
                      backgroundColor: "#306c60",
                    },
                  }}
                >
                  {step.button}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <p id="error" style={{ marginTop: "10px" }}></p>
      <p id="success" style={{ marginTop: 3 }}></p>
    </div>
  );
}

export default ForgotPassword;
