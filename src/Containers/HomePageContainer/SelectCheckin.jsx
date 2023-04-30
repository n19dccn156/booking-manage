import { EnvironmentOutlined, SwapOutlined } from "@ant-design/icons";
import { Button, DatePicker, Dropdown, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import Constants from '../../Constants/Constants';
import { useDispatch } from "react-redux";
import {FindHotelAction} from '../../Actions/FindHotelAction';
const { RangePicker } = DatePicker;


dayjs.extend(customParseFormat);


let items = [
  {
    key: "1",
    label: ''
  },
  {
    key: "2",
    label: ''
  }
];
const dateFormat = 'YYYY-MM-DD';

const SelectCheckin = (props) => {
	const dispatch = useDispatch();	
  const [provinces, setProvinces] = useState([]);
  const [idProvince, setIdProvince] = useState(localStorage.getItem('prv'));
  const [nameProvince, setNameProvince] = useState(localStorage.getItem('namePrv'));
  const [messageProvince, setMessageProvince] = useState();
  const [messageDate, setMessageDate] = useState();
  const [checkin, setCheckin] = useState(localStorage.getItem('ci'));
  const [checkout, setCheckout] = useState(localStorage.getItem('co'));

  const clickSearch = () => {
    if(idProvince === null || idProvince === undefined) {
      setMessageProvince('Hãy chọn 1 nơi đến !');
      if(checkin === null || checkout === null) {
        setMessageDate('Hãy chọn ngày nhận và ngày trả !');
      }
      return;
    }
    if(checkin === null || checkout === null) {
      setMessageDate('Hãy chọn ngày nhận và ngày trả !');
      return;
    }
    else {
      localStorage.setItem('prv', idProvince);
      localStorage.setItem('ci', checkin);
      localStorage.setItem('co', checkout); 
      dispatch(FindHotelAction())
    }
  }
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  const selectDate = (date) => {
    if(date === null || date === undefined) {
      setCheckin(null);
      setCheckout(null);
      localStorage.removeItem('ci');
      localStorage.removeItem('co');
      setMessageDate('Hãy chọn ngày nhận và ngày trả !');
      return;
    }
    setCheckin(date[0].$y+'-'+(date[0].$M+1)+'-'+date[0].$D);
    setCheckout(date[1].$y+'-'+(date[1].$M+1)+'-'+date[1].$D);
    localStorage.setItem('ci', date[0].$y+'-'+(date[0].$M+1)+'-'+date[0].$D);
    localStorage.setItem('co', date[1].$y+'-'+(date[1].$M+1)+'-'+date[1].$D);
    setMessageDate();
  }
  useEffect(() => {
    axios({
      method: 'GET',
      url: Constants.host+'/api/v1/provinces'
    })
    .then((res) => {
      const values = [];
      // eslint-disable-next-line array-callback-return
      res.data.data.map((data) => {
        values.push(
          {
            key: data.id, 
            label: 
            (<div 
              key={data.id} 
              onClick={() => {
                setIdProvince(data.id);
                setNameProvince(data.name);
                setMessageProvince();
                localStorage.setItem('namePrv', data.name)
              }}>
              {data.name}
            </div>)
          }
        )
      })
      setProvinces(values);
      items = values;
    })
    .catch((err) => {
      message.error(err.response.data.message)
    })
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: (4 * window.innerWidth) / 5,
        height: 100,
        backgroundColor: "#f0f0f0",
        position: "absolute",
        marginLeft: window.innerWidth / 10,
        borderRadius: 10,
        alignItems: "center",
        marginTop: props.height,
        flexDirection: 'row',
        flexWrap: 'wrap'
      }}
    >
      {provinces.length > 0 ?
        (<Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
          arrow
        >
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{color: 'red', marginBottom: 4}}>
              {messageProvince}
            </div>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <Button
                type="dashed"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  height: window.innerHeight/12,
                  width: window.innerWidth / 5,
                  fontSize: 18,
                }}
              >
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                  <div style={{ marginLeft: 12 }}>Chọn nơi đến</div>
                  <Input placeholder={nameProvince ?? "Bạn muốn đi đâu ?"} disabled bordered={false} />
                </div>
                <EnvironmentOutlined style={{fontSize: 24, color: '#bfbfbf'}}/>
              </Button>
            </div>
          </div>
        </Dropdown>)
        :
        (<></>)  
      }
      <SwapOutlined />
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <div style={{color: 'red', marginBottom: 4}}>
          {messageDate}
        </div>
        {
          (checkin === null || checkout === null || checkin === undefined || checkout === undefined) ?
          (
            <DatePicker.RangePicker
              size='large'
              style={{ height: window.innerHeight/12, width: window.innerWidth / 3, fontSize: window.innerHeight/50 }}
              disabledDate={disabledDate}
              onChange={(data) => selectDate(data)}
            />
          )
          :
          ( 
            <RangePicker
              size='large'
              defaultValue={[dayjs(checkin), dayjs(checkout)]}
              format={dateFormat}
              style={{ height: window.innerHeight/12, width: window.innerWidth / 3, fontSize: window.innerHeight/50 }}
              disabledDate={disabledDate}
              onChange={(data) => selectDate(data)}
            />
          )
        }
      </div>

      <Button type="primary" style={{ height: window.innerHeight/16, fontSize: window.innerHeight/50 }} onClick={clickSearch}>
        Tìm kiếm
      </Button>
    </div>
  );
};

export default SelectCheckin;
