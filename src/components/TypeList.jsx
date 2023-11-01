import { Box, Button } from "@mui/material";
import React from "react";
import { TypeData } from "./Data/TypeData";

function TypeList({ handleChangeType }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        textAlign: "center",
        marginBottom: 5,
      }}
    >
      {TypeData.map((child, index) => (
        <div
          key={index}
          className="catBtn"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Button
            className="catBtnItem"
            variant="contained"
            onClick={() => handleChangeType(child.id)}
            sx={
              sessionStorage.getItem("type")
                ? JSON.parse(sessionStorage.getItem("type")) === child.id
                  ? { backgroundColor: "#306c6c" }
                  : { backgroundColor: "#f2f6f6" }
                : child.id === 0
                ? { backgroundColor: "#306c6c" }
                : { backgroundColor: "#f2f6f6" }
            }
          >
            <child.icon
              className="iconCatBtn"
              sx={
                sessionStorage.getItem("type")
                  ? JSON.parse(sessionStorage.getItem("type")) === child.id
                    ? { color: "white" }
                    : { color: "#77c9c9" }
                  : child.id === 0
                  ? { color: "white" }
                  : { color: "#77c9c9" }
              }
            />
          </Button>
          <p className="catName">{child.name}</p>
        </div>
      ))}
    </Box>
  );
}

export default TypeList;
