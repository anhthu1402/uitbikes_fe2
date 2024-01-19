import React, { useContext, useEffect } from "react";
import { useState } from "react";
import SearchFilterContext from "../../SearchFilterContext";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  SwipeableDrawer,
} from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import axios from "axios";
import { currency_format, typeData } from "../../service";
import { useNavigate } from "react-router-dom";
import "./SearchFilter.css";

function priceText(value) {
  return `${currency_format(value)} VNĐ`;
}

function ccText(value) {
  return `${value} cc`;
}

function SearchFilter() {
  const searchFilterContext = useContext(SearchFilterContext);
  const [brandData, setBrandData] = useState(null);
  const [rangePrice, setRangePrice] = useState([]);
  const [rangeDate, setRangeDate] = useState([]);
  const [rangeCc, setRangeCc] = useState([]);
  const [colors, setColors] = useState([]);
  const [price, setPrice] = useState(null);
  const [cc, setCc] = useState(null);
  const [date, setDate] = useState(null);
  useEffect(() => {
    if (brandData === null) {
      axios
        .get("http://localhost:9090/api/brands")
        .then((response) => {
          setBrandData(response.data);
        })
        .catch((error) => console.log(error));
    }
    axios
      .get("http://localhost:9090/api/products/price")
      .then((response) => {
        setRangePrice(response.data);
        if (price == null) {
          setPrice([response.data[0], response.data[1]]);
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:9090/api/products/date")
      .then((response) => {
        setRangeDate(response.data);
        if (date == null) {
          setDate([response.data[0], response.data[1]]);
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:9090/api/products/cc")
      .then((response) => {
        setRangeCc(response.data);
        if (cc == null) {
          setCc([response.data[0], response.data[1]]);
        }
      })
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:9090/api/products/colors")
      .then((response) => {
        setColors(response.data);
      })
      .catch((error) => console.log(error));
  }, [brandData, cc, date, price, rangeCc, rangeDate, rangePrice, colors]);
  const searchFilter = useContext(SearchFilterContext);
  const toggleDrawer = (open) => (event) => {
    if (
      (event && event.type === "keydown" && event.key === "Tab") ||
      event.key === "Shift"
    ) {
      return;
    }
    searchFilter.setOpen(open);
    localStorage.setItem("openSearchFilter", open);
  };
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const handleChooseBrand = (item) => {
    setBrand(item);
  };

  const handleChooseType = (item) => {
    setType(item);
  };
  const priceMarks = [
    {
      value: rangePrice[0],
      label: `${currency_format(rangePrice[0])} VNĐ`,
    },
    {
      value: parseInt(rangePrice[1]),
      label: `${currency_format(rangePrice[1])} VNĐ`,
    },
  ];

  const ccMarks = [
    {
      value: rangeCc[0],
      label: `${rangeCc[0]} cc`,
    },
    {
      value: rangeCc[1],
      label: `${rangeCc[1]} cc`,
    },
  ];

  const dateMarks = [
    {
      value: rangeDate[0],
      label: `${rangeDate[0]}`,
    },
    {
      value: rangeDate[1],
      label: `${rangeDate[1]}`,
    },
  ];
  const [chosenColors, setChosenColors] = useState([]);
  const handleChooseColors = (e) => {
    const {
      target: { value },
    } = e;
    setChosenColors(value);
  };
  const handleChangePrice = (e, newValue) => {
    setPrice(newValue);
  };
  const handleChangeCc = (e, newValue) => {
    setCc(newValue);
  };
  const handleChangeDate = (e, newValue) => {
    setDate(newValue);
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const form = {
      rangePrice: price,
      rangeCc: cc,
      rangeDateManu: date,
      typeId: type,
      brandId: brand,
      colorArray: chosenColors,
    };
    axios
      .post("http://localhost:9090/api/products/search", form)
      .then((response) => {
        searchFilterContext.setResult(response.data);
        localStorage.setItem("searchResult", JSON.stringify(response.data));
        navigate("/search");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div style={{ zIndex: "8", position: "absolute" }}>
      <div>
        <SwipeableDrawer
          variant="persistent"
          onOpen={toggleDrawer(true)}
          onClose={toggleDrawer(false)}
          open={searchFilter.open}
          anchor="left"
        >
          <Box
            sx={{ padding: 3, width: 450, marginTop: 10 }}
            className="filter-container"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <h4 style={{ color: "#306c6c", margin: 0 }}>Bộ lọc tìm kiếm</h4>
              <div onClick={toggleDrawer(false)}>
                <CloseRounded sx={{ color: "#306c6c", cursor: "pointer" }} />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FormControl fullWidth className="select">
                <InputLabel id="select-brand-label">Hãng xe</InputLabel>
                <Select
                  labelId="select-brand-label"
                  id="select-brand"
                  value={brand}
                  onChange={(e) => handleChooseBrand(e.target.value)}
                >
                  {brandData &&
                    brandData.map((child) => (
                      <MenuItem value={child.id} key={child.id} item={child}>
                        {child.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                sx={{ margin: "15px 0" }}
                className="select"
              >
                <InputLabel id="select-type-label">Loại xe</InputLabel>
                <Select
                  labelId="select-type-label"
                  id="select-type"
                  value={type}
                  onChange={(e) => handleChooseType(e.target.value)}
                >
                  {typeData &&
                    typeData.map(
                      (child) =>
                        child.id !== 0 && (
                          <MenuItem
                            key={child.id}
                            item={child}
                            value={child.id}
                          >
                            {child.name}
                          </MenuItem>
                        )
                    )}
                </Select>
              </FormControl>
              <label>Khoảng giá</label>
              <Slider
                value={price}
                valueLabelDisplay="auto"
                sx={{ color: "#306c6c", width: "80%" }}
                max={rangePrice[1]}
                min={rangePrice[0]}
                onChange={handleChangePrice}
                getAriaValueText={priceText}
                valueLabelFormat={priceText}
                marks={priceMarks}
                className="range"
              />
              <label>Năm sản xuất</label>
              <Slider
                value={date}
                valueLabelDisplay="auto"
                sx={{ color: "#306c6c", width: "80%" }}
                max={rangeDate[1]}
                min={rangeDate[0]}
                onChange={handleChangeDate}
                marks={dateMarks}
                className="range"
              />
              <label>Khoảng phân khối</label>
              <Slider
                value={cc}
                valueLabelDisplay="auto"
                sx={{ color: "#306c6c", width: "80%" }}
                max={rangeCc[1]}
                min={rangeCc[0]}
                onChange={handleChangeCc}
                getAriaValueText={ccText}
                valueLabelFormat={ccText}
                className="range"
                marks={ccMarks}
              />
              <FormControl fullWidth sx={{ margin: "15px 0" }}>
                <InputLabel id="select-type-label">Màu xe</InputLabel>
                <Select
                  multiple
                  labelId="select-type-label"
                  id="select-type"
                  value={chosenColors}
                  label="Màu"
                  onChange={handleChooseColors}
                >
                  {colors &&
                    colors.map((child) => (
                      <MenuItem key={child} item={child} value={child}>
                        {child}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              <div onClick={toggleDrawer(false)}>
                <Button
                  variant="contained"
                  onClick={handleSearch}
                  sx={{
                    backgroundColor: "#306c6c",
                    padding: "8px 15px",
                    "&:hover": {
                      backgroundColor: "#306c60",
                    },
                  }}
                >
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </Box>
        </SwipeableDrawer>
      </div>
    </div>
  );
}

export default SearchFilter;
