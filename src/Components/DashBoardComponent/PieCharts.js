import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import Constants from '../../Constants/Constants';

const data = [
  // { name: 'Phòng giường đơn', value: 400 },
  // { name: 'Phòng giường đôi', value: 300 },
  // { name: 'Phòng giường đơn view biển', value: 300 },
  // { name: 'Phòng giường đôi view biển', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a8071a', '#003eb3', '#391085'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieCharts = () => {

  const [precent, setPrecent] = useState([]);

  useEffect(() => {
    axios({
			method: 'GET',
			url: Constants.host + '/api/v1/hotels/precent',
      headers: {'Authorization': localStorage.getItem('authorization')}
		})
    .then((res) => {
      const response = data;
      res.data.data.forEach((dt, index) => {
        const obj = {name: dt.name + ' - ' + dt.quantity + ' Phòng', value: dt.quantity*10};
        response[index] = obj;
      })
  
      setPrecent(response);
    })
    .catch((err) => {
      console.log(err.data)
    })
  })

  return (
    <ResponsiveContainer >
      <PieChart>
        <Pie
          data={precent}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          style={{backgroundColor: 'red', position: 'fixed'}}
        >
          {precent.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend/>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieCharts;
