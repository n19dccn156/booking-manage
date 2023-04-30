import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
import { Button, Col, DatePicker, Empty, Image, Rate, Row, Tag, Typography } from 'antd';
import HeaderContainer2 from '../../Containers/HomePageContainer/HeaderContainer';
import logo from '../../Asset/Img/hcm.webp';
import logo2 from '../../Asset/Img/hcm2.jpeg';
import logo3 from '../../Asset/Img/hcm3.jpeg';
import { ArrowRightOutlined, EnvironmentOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import Colors from '../../Constants/Colors';
import RoomInOrderContainer from '../../Containers/HotelDetailContainer/RoomInOrderContainer';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Constants from '../../Constants/Constants';
import { useSelector } from 'react-redux';

dayjs.extend(customParseFormat);
const dateFormat = 'YYYY-MM-DD';

const { Title } = Typography;
const width = window.innerWidth;
const height = window.innerHeight;
const marginLeft = window.innerWidth/18;
const marginRight = window.innerWidth/18;

const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 
              'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple']
const HotelDetailPage = () => {
    let { id } = useParams(); 
	const navigate = useNavigate();
	const [rooms, setRooms] = useState([]);
	const [hotel, setHotel] = useState();
	const [checkin, setCheckin] = useState(localStorage.getItem('ci'));
	const [checkout, setCheckout] = useState(localStorage.getItem('co'));
	const [facilities, setFacilities] = useState([]);
	const isAddRoom = useSelector((state) => state.addRoom);
	const [allowOrder, setAllowOrder] = useState(false);

	const clickContinue = () => {
		localStorage.setItem('hotelId', id);
		navigate('/confirm');
	}
	const changeDate = (data) => {
		const ci = `${data[0].y}-${data[0].M+1}-${data[0].D}`;
		const co = `${data[1].y}-${data[1].M+1}-${data[1].D}`;
		setCheckin(ci);
		setCheckout(co);
		localStorage.setItem('ci', ci);
		localStorage.setItem('co', co);
	}
	useEffect(() => {
		const orders = localStorage.getItem('orders');
		if(orders !== null && orders !== undefined && orders.length > 2) {
			setAllowOrder(true);
			return;
		}
		setAllowOrder(false);
	}, [isAddRoom])

	useEffect(() => {
		axios({
			method: 'GET',
			url: `${Constants.host}/api/v1/hotels/${id}`,
		})
		.then((res) => {
			setHotel(res.data.data);
		})
		.catch((err) => {
			navigate('/404')
		})
		axios({
			method: 'GET',
			url: `${Constants.host}/api/v1/facilities/hotel/${id}`,
		})
		.then((res) => {
			setFacilities(res.data.data);
		})
		.catch((err) => {
			console.log(err)
		})
		axios({
			method: 'GET',
			url: `${Constants.host}/api/v1/room-type/hotel/${id}`,
			params: {
				"checkin": checkin,
				"checkout": checkout
			}
		})
		.then((res) => {
			setRooms(res.data.data);
		})
		.catch((err) => {
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id])

	const clickFind = () => {
		axios({
			method: 'GET',
			url: `${Constants.host}/api/v1/room-type/hotel/${id}`,
			params: {
				"checkin": checkin,
				"checkout": checkout
			}
		})
		.then((res) => {
			setRooms(res.data.data);
		})
		.catch((err) => {
		})
	}

  return (
    <div>
      <HeaderContainer2/>
			<div style={{backgroundColor: Colors.bgAbove}}>
			<div style={{marginLeft: marginLeft, marginRight: marginRight}}>
				<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
					<Title level={2}>{hotel?.name}</Title>
					<Title style={{marginLeft: 40, color: '#595959'}} level={5}><EnvironmentOutlined/>{hotel?.address}</Title>
				</div>
				<div>
					<Rate style={{marginTop: -40, marginBottom: 16}} allowHalf value={parseFloat(hotel?.rating)} disabled/>
					({hotel?.numRating} review)
				</div>
				<div>
					<Row>
						<Col span={12} style={{}}>
							<Image style={{borderTopLeftRadius: 12, borderBottomLeftRadius: 12, minHeight: height/2-marginLeft, minWidth: width/2-marginRight, maxHeight: height/2}} src={logo}/>
						</Col>
						<Col span={6} style={{}}>
							<Image style={{minHeight: height/2, maxHeight: height/2}} src={logo2}/>
						</Col>
						<Col span={6}>
							<Row>
								<Image style={{borderTopRightRadius: 12, maxHeight: height/4, minHeight: height/4, minWidth: width/6+marginLeft}} src={logo3}/>
							</Row>
							<Row style={{backgroundColor: '#8c8c8c', borderBottomRightRadius: 12}}>
								<Image style={{borderBottomRightRadius: 12, maxHeight: height/4, minHeight: height/4, minWidth: width/6+marginLeft, opacity: 0.2}} src={logo} preview={false} />
								<div style={{position: 'absolute', marginTop: height/10, marginLeft: width/12, fontSize: 40, color: 'white' }}>+3</div>
							</Row>
						</Col>
					</Row>
				</div>
				<div>
					<Row>
						<Col span={14}>
							<Title level={4}>Nội dung mô tả</Title>
							<TextArea rows={10} size='large' value={hotel?.description} bordered={false} onChange={() => {}}/>
						</Col>
						<Col span={2} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 32}}>
							{/* <div style={{border: '2px solid rgb(0, 44, 140)'}}></div> */}
						</Col>
						<Col span={8}>
							<Title level={4}>Những tiện ích</Title>
							<div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
								{facilities !== null && facilities !== undefined ? 
								(facilities.map((data, index) => (
									<Tag
										key={index}
										style={{ display: 'flex', height: 40, fontSize: 18, alignItems: 'center', marginTop: 8 }} 
										color={colors[index % 12]}>
										{data.name}
									</Tag>
								)))
								: 
								(<>False</>)}
							</div>
						</Col>	
					</Row>
				</div>
				<Title level={3} style={{display: 'flex', justifyContent: 'center'}}>Danh sách phòng</Title>
				<Row style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', marginTop: 32}}>
					<Col span={4} style={{display: 'flex', justifyContent: 'flex-start'}}>
						<DatePicker.RangePicker defaultValue={[dayjs(checkin), dayjs(checkout)]} format={dateFormat} size='large' style={{minWidth: window.innerWidth/4}} onChange={changeDate}/>
					</Col>
					<Button type='primary' onClick={clickFind}>Tìm phòng</Button>
				</Row>
				<div>
					<Row>
						{rooms.length > 0 ?
						(rooms.map((data, index) => (
							<Col key={index} span={12}>
								<RoomInOrderContainer room={data} isActive={true}/>
							</Col>
						)))
						:
						(<Col span={24} style={{marginTop: 48}}><Empty description='Không có phòng trống'/></Col>)}
					</Row>
					<Row style={{display: 'flex', justifyContent: 'center'}}>
						<Button type='primary' 
								danger icon={<ArrowRightOutlined />} 
								style={{display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 12, minWidth: width/6, height: 40, fontSize: 20, marginBottom: 32, marginTop: 32}} 
								disabled={!allowOrder}
								onClick={clickContinue}>
							Tiếp tục đặt phòng
						</Button>
					</Row>
				</div>
			</div>
			</div>
    </div>
  )
}

export default HotelDetailPage;
