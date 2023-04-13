import { Link } from "react-router-dom";

const ItemsOrder = [
  {
    key: '0',
    label: (<Link style={{color: 'black'}} to={'/order/await'}>Chờ xác nhận</Link>),
  },
  {
    key: '1',
    label: (<Link style={{color: 'black'}} to={'/order/confirm'}>Đặt thành công</Link>),
  },
  {
    key: '2',
    label: (<Link style={{color: 'black'}} to={'/order/ongoing'}>Đang diễn ra</Link>),
  },
  {
    key: '3',
    label: (<Link style={{color: 'black'}} to={'/order/complete'}>Đã hoàn thành</Link>),
  },
  {
    key: '4',
    label: (<Link style={{color: 'black'}} to={'/order/cancel'}>Đã hủy</Link>),
  },
];

export default ItemsOrder;