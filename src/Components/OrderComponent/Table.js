import React from 'react';
import { message, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Constants from '../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
import '../../index.css'
import DetailAwaitComponent from './DetailAwaitComponent';
import DetailComfirmComponent from './DetailComfirmComponent';
import DetailCancelComponent from './DetailCancelComponent';
import DetailCompleteComponent from './DetailCompleteComponent';
import DetailOngoingComponent from './DetailOngoingComponent';

const TableCom = React.memo((props) => {
  const detailButton = [
    { title: 'Thời gian', dataIndex: 'createdAt', align: 'center', },
    { title: 'Họ tên', dataIndex: 'name', align: 'center', },
    { title: 'Số điện thoại', dataIndex: 'phone', align: 'center', },
    { title: 'Ngày nhận', dataIndex: 'checkin', align: 'center', },
    { title: 'Ngày trả', dataIndex: 'checkout', align: 'center', },
    {
      title: 'Xem chi tiết', dataIndex: '_id', align: 'center',
      render: (_id) => {
        // (() => {
        switch (props.status) {
          case Constants.STATUS.AWAIT:
            return (<DetailAwaitComponent id={_id} />)
          case Constants.STATUS.COMFIRM:
            return (<DetailComfirmComponent id={_id} />)
          case Constants.STATUS.ONGOING:
            return (<DetailOngoingComponent id={_id} />)
          case Constants.STATUS.COMPLETE:
            return (<DetailCompleteComponent id={_id} />)
          case Constants.STATUS.CANCEL:
            return (<DetailCancelComponent id={_id} />)
          default:
            return
        }
      },
    }
  ];

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 7,
    },
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      const url = Constants.host + Constants.URL_ORDER_BY_HOTEL;
      const Authorization = localStorage.getItem('authorization');

      axios.get(url, {
        method: 'GET',
        withCredentials: false,
        params: {
          status: props.status,
          page: tableParams.pagination.current - 1,
        },
        headers: {
          'Authorization': Authorization,
          'Content-Type': 'application/json',
        }
      })
        .then((results) => {
          setData(results.data.data.content);
          setLoading(false);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: results.data.data.totalElements,
            },
          });
        })
        .catch((err) => {
          message.error(err.response.data.message);
          navigate('/login');
          return;
        });
    };
    fetchData();
  }, [tableParams.pagination.current, props.reload]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <Table columns={detailButton} rowKey={(record) => record._id}
      dataSource={data} pagination={tableParams.pagination}
      loading={loading} onChange={handleTableChange}
      style={{ width: '95%' }} size='small'
      rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : ''}
    />
  );
}
)

export default TableCom;