import React, { useContext } from "react";
import SearchFilterContext from "../../SearchFilterContext";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProductItem from "../../components/Item/Product/ProductItem";
import SearchEmpty from "../../assets/images/search-empty.png";

function SearchPage() {
  const searchFilterContext = useContext(SearchFilterContext);
  const result = searchFilterContext.result;
  return (
    <div style={{ marginTop: 100 }}>
      {result !== "" ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 4 }}
            columns={{ xs: 2, sm: 8, md: 8, lg: 12 }}
          >
            {result.map((child, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
                <Link to={"/product-detail/" + child.name} state={child}>
                  <ProductItem item={child} key={index} />
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={SearchEmpty} alt="" width={300} />
          <p style={{ fontStyle: "italic" }}>
            Rất tiếc, không có sản phẩm bạn đang tìm.
          </p>
          <Link to={"/"}>
            <Button
              variant="contained"
              sx={{
                marginTop: 2,
                backgroundColor: "#306c6c",
                padding: "8px 15px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "#306c60",
                },
              }}
            >
              Trang chủ
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchPage;
