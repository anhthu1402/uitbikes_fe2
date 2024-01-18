import { Box, Grid, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Home.css";
import ImageSlider from "../../components/ImageSlider/ImageSlider";
import ProductItem from "../../components/Item/Product/ProductItem";
import { Link } from "react-router-dom";
import axios from "axios";
import TypeList from "../../components/TypeList";
import { setPagination } from "../../components/Pagination";

function Home() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [PER_PAGE, setPerPage] = useState(9);

  const [count, setCount] = useState(1);
  const [size, setSize] = useState("medium");
  const [data, setData] = useState(null);
  let _data = [];
  const [type, setType] = useState(
    sessionStorage.getItem("type") != null
      ? JSON.parse(sessionStorage.getItem("type"))
      : 0
  );
  const handleChangeType = (val) => {
    axios
      .get("http://localhost:9090/api/products/details/type/" + val)
      .then((response) => {
        setCurrentPage(1);
        setPage(1);
        _data = setPagination(
          response.data,
          PER_PAGE,
          currentPage,
          setCurrentPage
        );
        setData(response.data);
        setCount(Math.ceil(response.data.length / PER_PAGE));
      })
      .catch((error) => console.log(error));
    setType(val);
    sessionStorage.setItem("type", JSON.stringify(val));
  };
  useEffect(() => {
    if (data == null) {
      axios
        .get("http://localhost:9090/api/products/details/type/" + type)
        .then((response) => {
          setData(response.data);
          setCount(Math.ceil(response.data.length / PER_PAGE));
        })
        .catch((error) => console.log(error));
    }
  }, [type, data, count, currentPage, PER_PAGE]);
  _data = setPagination(data, PER_PAGE, currentPage, setCurrentPage);
  const handleChangePage = (e, p) => {
    setPage(p);
    _data.jump(p);
  };
  window.onresize = function () {
    if (window.innerWidth <= 900) {
      setPerPage(10);
      setCount(Math.ceil(data.length / PER_PAGE));
      if (_data.currentData().length === 0) {
        setPage(page - 1);
        _data.jump(page - 1);
      }
      if (window.innerWidth <= 500) {
        setSize("small");
      } else {
        setSize("medium");
      }
    } else {
      setSize("medium");
      setPerPage(9);
      setCount(Math.ceil(data.length / PER_PAGE));
    }
  };
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setSize("small");
    } else {
      setSize("medium");
    }
  }, [size]);
  return (
    <div>
      <Box sx={{ marginBottom: 5 }}>
        <ImageSlider />
      </Box>
      <TypeList handleChangeType={handleChangeType} />

      <Box sx={{ flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginBottom: 25,
          }}
        >
          <Pagination
            count={count}
            page={page}
            size={size}
            onChange={handleChangePage}
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
        <Grid
          container
          spacing={{ xs: 2, md: 4 }}
          columns={{ xs: 2, sm: 8, md: 12, lg: 12 }}
        >
          {_data &&
            _data.currentData().map((child, index) => (
              <Grid item xs={2} sm={4} md={4} key={index} marginBottom={2}>
                <Link to={"/product-detail/" + child.name} state={child}>
                  <ProductItem item={child} key={index} />
                </Link>
              </Grid>
            ))}
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <Pagination
            count={count}
            page={page}
            size={size}
            onChange={handleChangePage}
            shape="rounded"
            showFirstButton
            showLastButton
          />
        </div>
      </Box>
    </div>
  );
}

export default Home;
