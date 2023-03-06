import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
const data = [
  {name: '4/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '5/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '6/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '7/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '8/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '9/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '10/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '11/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '12/2020', uv: 400, pv: 2400, amt: 2400},
  {name: '1/2021', uv: 400, pv: 2400, amt: 2400},
  {name: '2/2021', uv: 400, pv: 2400, amt: 2400},
  {name: '3/2021', uv: 2000, pv: 2400, amt: 2400},
];

const ColumnChart = () => {
  return(
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="name" stroke="#8884d8" label={{}}>
        {/* <Label value="Doanh thu 12 tháng gần đây" offset={0} position='outside' style={{fontSize: 18, paddingLeft: 500}} /> */}
      </XAxis>
      <YAxis label={{angle: -90, position: 'insideLeft', fontSize: 18}} />
      <Tooltip />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="uv" fill="#8884d8" barSize={30}/>
    </BarChart>
  );
}

export default ColumnChart;