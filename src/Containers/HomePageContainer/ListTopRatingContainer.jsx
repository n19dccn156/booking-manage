import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Constants from '../../Constants/Constants'
import { message } from 'antd';

const ListTopRatingContainer = () => {

	const [hotels, setHotels] = useState([]);

	useEffect(() => {
		axios({
			method: 'GET',
			url: Constants.host+'/api/v1/hotels/top8-rating'
		})
		.then((res) => {
			setHotels(res.data.data);
		})
		.catch((err) => {
			message.error(err.response.data.message);
		})
	}, []);

  return (
    <div>
			{hotels.length > 0 ?
			(<div>
				
			</div>)
			:
			(<></>)	
			}
    </div>
  )
}

export default ListTopRatingContainer
