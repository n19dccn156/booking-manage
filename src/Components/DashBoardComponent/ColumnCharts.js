import axios from 'axios';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Constants from '../../Constants/Constants';
const data = [
  {ind: 1, month: '4/2020', 'Doanh thu': 0},
  {ind: 2, month: '5/2020', 'Doanh thu': 0},
  {ind: 3, month: '6/2020', 'Doanh thu': 0},
  {ind: 4, month: '7/2020', 'Doanh thu': 0},
  {ind: 5, month: '8/2020', 'Doanh thu': 0},
  {ind: 6, month: '9/2020', 'Doanh thu': 0},
  {ind: 7, month: '10/2020', 'Doanh thu': 0},
  {ind: 8, month: '11/2020', 'Doanh thu': 0},
  {ind: 9, month: '12/2020', 'Doanh thu': 0},
  {ind: 10, month: '1/2021', 'Doanh thu': 0},
  {ind: 11, month: '2/2021', 'Doanh thu': 0},
  {ind: 12, month: '3/2021', 'Doanh thu': 0},
];

const ColumnChart = () => {
  const [revenue, setRevenue] = useState();

  useEffect(() => {
    axios({
			method: 'GET',
			url: Constants.host + '/api/v1/hotels/revenue',
      headers: {'Authorization': localStorage.getItem('authorization')}
		})
    .then((res) => {
      let response = data;
      
      const xmas = new Date();
      const currentMonth = xmas.getMonth() + 1;
      const currentYear = xmas.getFullYear();
      let month = currentMonth + 1;
      let year = currentYear;
      
      if(currentMonth === 1) month = 12;
      if(currentMonth === 12) month = 1;
      if(currentMonth !== 12) year = year - 1;

      response.forEach((dt) => {
        if(month > 12) {
          month = 1;
          year += 1;
        }
        dt.month = month+"-"+year;
        month ++;
      })

      res.data.data.forEach((dt) => {
        response.forEach((i) => {
          if(dt.month === i.month) {
            i['Doanh thu'] = dt.total/1000;
          }
        })

        // neu co data thi se xoa dong nay
        const index = dt.ind - 1;
        // response[index].month = dt.month;
        response[index]['Doanh thu'] = dt.total/1_000_000;
      })

      setRevenue(response);
    })
    .catch((err) => {
      console.log(err)
    })
  })

  return(
    <BarChart width={600} height={300} data={revenue} style={{marginLeft: 32}}>
      <XAxis dataKey="month" stroke="#8884d8" label={{}}>
        {/* <Label value="Doanh thu 12 tháng gần đây" offset={0} position='outside' style={{fontSize: 18, paddingLeft: 500}} /> */}
      </XAxis>
      <YAxis label={{angle: -90, position: 'insideLeft', fontSize: 18}}/>
      <Tooltip />
      <CartesianGrid name='tr' stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="Doanh thu" data={revenue} fill="#8884d8" barSize={30}/>
    </BarChart>
  );
}

export default ColumnChart;