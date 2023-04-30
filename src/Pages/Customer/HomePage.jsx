import React, { useEffect, useState } from "react";
import HeaderContainer2 from "../../Containers/HomePageContainer/HeaderContainer";
import { Button, Checkbox, Empty, Image, Rate, Row, Spin } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import BannerContainer from "../../Containers/HomePageContainer/BannerContainer";
import { useSelector } from "react-redux";
import axios from "axios";
import Constants from "../../Constants/Constants";
import { useNavigate } from "react-router-dom";

const formatMoney = (value) => {
  let data = value.replace(/,/g, "");
  return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ListHotelPage = () => {
  const findHotel = useSelector((state) => state.findHotel);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [types, setTypes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const changeTypeHotel = (data) => {
    setTypes(data);
    setPage(1);
    setHotels([]);
  };
  const changePrices = (data) => {
    setPrices(data);
    setPage(1);
    setHotels([]);
  };
  const changeRatings = (data) => {
    setRatings(data);
    setPage(1);
    setHotels([]);
  };
  const clickClear = () => {
    setTypes([]);
    setPrices([]);
    setRatings([]);
  };
  useEffect(() => {
    setLoading(true);
    axios({
      method: "GET",
      url: Constants.host + "/api/v1/hotels",
      params: {
        prv: localStorage.getItem("prv") ?? "",
        ci: localStorage.getItem("ci") ?? "",
        co: localStorage.getItem("co") ?? "",
        ht: types.toString(),
        pri: prices.toString(),
        rt: ratings.toString(),
        size: 1,
        page: page,
      },
    })
      .then((res) => {
        setHotels((pre) => [...pre, ...res.data.data.data]);
        setTotalPage(res.data.data.totalPage);
      })
      .catch((err) => {
        setHotels([]);
        setPage(10);
				setTotalPage(0);
      })
			.finally(() => {
				setLoading(false);
			});
  }, [findHotel, page, types, prices, ratings]);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =
        e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight && page <= totalPage + 1) {
        setPage(page + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPage]);
  return (
    <div>
      <HeaderContainer2 />
      <BannerContainer />
      <div
        style={{
          display: "flex",
          width: window.innerWidth,
          flexDirection: "row",
          paddingTop: 100,
          backgroundColor: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            marginLeft: window.innerWidth / 30,
            marginTop: 16,
          }}
        >
          <Button
            type="primary"
            style={{ marginBottom: 24 }}
            onClick={clickClear}
          >
            Xóa hết lựa chọn
          </Button>
          <div style={{ fontSize: 24, fontWeight: "bold" }}>Loại nhà ở</div>
          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "start",
              fontSize: 24,
              width: "100%",
            }}
            value={types}
            onChange={changeTypeHotel}
          >
            <Row>
              <Checkbox style={{ fontSize: 20 }} checked={true} value={1}>
                Khách sạn
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={2}>
                Homestay
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={3}>
                Villa
              </Checkbox>
            </Row>
          </Checkbox.Group>

          <div style={{ fontSize: 24, fontWeight: "bold", marginTop: 32 }}>
            Mức giá: (VND)
          </div>
          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "start",
              fontSize: 24,
              width: "100%",
            }}
            value={prices}
            onChange={changePrices}
          >
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={21}>
                0 - 500.000
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={22}>
                500.000 - 2.000.000
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={23}>
                2.000.000 - 5.000.000
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={24}>
                Trên 5.000.000
              </Checkbox>
            </Row>
          </Checkbox.Group>

          <div style={{ fontSize: 24, fontWeight: "bold", marginTop: 32 }}>
            Đánh giá
          </div>
          <Checkbox.Group
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "start",
              fontSize: 24,
              width: "100%",
            }}
            value={ratings}
            onChange={changeRatings}
          >
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={15}>
                {/* ⭐ ⭐ ⭐ ⭐ ⭐ (5s) */}
								<Rate defaultValue={parseFloat(5)} disabled/>
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={14}>
								<Rate defaultValue={parseFloat(4)} disabled/>
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={13}>
								<Rate defaultValue={parseFloat(3)} disabled/>
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={12}>
								<Rate defaultValue={parseFloat(2)} disabled/>
              </Checkbox>
            </Row>
            <Row>
              <Checkbox style={{ fontSize: 20 }} value={11}>
								<Rate defaultValue={parseFloat(1)} disabled/>
              </Checkbox>
            </Row>
          </Checkbox.Group>
        </div>
        <div
          style={{
            display: "flex",
            flex: 4,
            flexDirection: "column",
            marginRight: window.innerWidth / 30,
            marginLeft: 32,
          }}
        >
          {hotels.length <= 0 ? (
            <Empty description="Không có dữ liệu" />
          ) : (
            hotels.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: window.innerHeight / 3,
                  margin: "16px 0 16px 0",
                  backgroundColor: "#f0f0f0",
                  borderRadius: 12,
                }}
              >
                <Image
                  style={{
                    maxHeight: window.innerHeight / 3,
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  }}
                  src={Constants.host + data.avatar}
                  preview={false}
                />
                <div
                  style={{
                    display: "flex",
                    flex: 2,
                    flexDirection: "column",
                    marginLeft: 32,
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    onClick={() => navigate(`/hotels/${data.id}`)}
                    style={{ display: "flex", flex: 1, flexDirection: "row" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flex: 2,
                        flexDirection: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ fontSize: 28, fontWeight: "bold" }}>
                        {data.name}
                      </div>
                      <div style={{ fontSize: 20 }}>
                        <EnvironmentOutlined style={{ color: "#8c8c8c" }} />
                        {" " + data.address}
                      </div>
                      <div style={{ fontSize: 20 }}>
                        ⭐ {"" + data.rating}{" "}
                        {"(" + data.numRating + " review)"}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: 24,
                          fontWeight: "bold",
                          color: "#0958d9",
                        }}
                      >
                        {formatMoney(String(data.priceMin))} -{" "}
                        {formatMoney(String(data.priceMax))}
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      flexDirection: "row",
                      flexWrap: "wrap",
                      alignContent: "space-evenly",
                      color: "#8c8c8c",
                    }}
                  >
                    <div style={{ fontSize: 20, marginRight: 16 }}>
                      Cà phê miễn phí mỗi sáng
                    </div>
                    <div style={{ fontSize: 20, marginRight: 16 }}>
                      Cà phê miễn phí
                    </div>
                    <div style={{ fontSize: 20, marginRight: 16 }}>
                      Cà phê miễn phí mỗi sáng
                    </div>
                    <div style={{ fontSize: 20, marginRight: 16 }}>
                      Cà phê miễn phí mỗi sáng
                    </div>
                    <div style={{ fontSize: 20, marginRight: 16 }}>
                      Cà phê miễn phí
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
					{loading === true ? (
            <Spin tip="Đang tải ..." size="large">
              <div className="content" />
            </Spin>
          ) : (
            <div></div>
          )}
          {(page > totalPage && loading === false) && (hotels.length > 0 && loading === false)? (
            <Empty description="Hết !!!" />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListHotelPage;
