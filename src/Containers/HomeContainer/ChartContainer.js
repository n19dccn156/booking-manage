import ColumnChart from '../../Components/DashBoardComponent/ColumnCharts';
import PieCharts from '../../Components/DashBoardComponent/PieCharts';
import { Row, Typography } from 'antd';
const { Title } = Typography;

const ChartContainer = () => {
  return (
    <div>
      <Row style={styleSheet.row}>
        <div style={{display: "flex", flexDirection: "column", marginRight: 16, flex: 2, backgroundColor: '#f0f0f0', borderRadius: 8}}>
          <Title style={{display: "flex", justifyContent: "center"}} level={5}>Doanh thu</Title>
          <ColumnChart/>
        </div> 
        <div style={{display: "flex", flexDirection: "column", flex: 1, maxWidth: 600, backgroundColor: '#f0f0f0', borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}>
          <Title style={styleSheet.title} level={5}>Tỉ lệ</Title>
          <PieCharts />
        </div>               
      </Row>
    </div>
  )
}

const styleSheet = {
  row: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: "column", 
    justifyContent: "between",
    marginTop: 16, 
    height: 380
  },
  title: {
    display: "flex", 
    justifyContent: "center"
  }
}

export default ChartContainer;