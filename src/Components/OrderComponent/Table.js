import { message, Table } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AwaitButton, CancelButton, ComfirmButton, CompleteButton, OngoingButton } from '../../Constants/ItemColumnOrder';
import Constants from '../../Constants/Constants';
import { useNavigate } from 'react-router-dom';
const TableCom = (props) => {
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
          page: tableParams.pagination.current-1,
        },
        headers: {
        'Authorization': Authorization,
        'Content-Type': 'application/json',
      }})
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

  if(props.status === Constants.STATUS.AWAIT) {
    return (
      <Table columns={AwaitButton} rowKey={(record) => record._id}
        dataSource={data} pagination={tableParams.pagination}
        loading={loading} onChange={handleTableChange}
        style={{width: '95%'}} size='small'
      />
    );
  } else if (props.status === Constants.STATUS.COMFIRM) {
    return (
      <Table
        columns={ComfirmButton} rowKey={(record) => record._id}
        dataSource={data} pagination={tableParams.pagination}
        loading={loading} onChange={handleTableChange}
        style={{width: '95%'}} size='small'
      />
    );
  } else if (props.status === Constants.STATUS.ONGOING) {
    return (
      <Table
        columns={OngoingButton} rowKey={(record) => record._id}
        dataSource={data} pagination={tableParams.pagination}
        loading={loading} onChange={handleTableChange}
        style={{width: '95%'}} size='small'
      />
    );
  } else if (props.status === Constants.STATUS.COMPLETE) {
    return (
      <Table
        columns={CompleteButton} rowKey={(record) => record._id}
        dataSource={data} pagination={tableParams.pagination}
        loading={loading} onChange={handleTableChange}
        style={{width: '95%'}} size='small'
      />
    );
  } else {
    return (
      <Table
        columns={CancelButton} rowKey={(record) => record._id}
        dataSource={data} pagination={tableParams.pagination}
        loading={loading} onChange={handleTableChange}
        style={{width: '95%'}} size='small'
      />
    );
  }
};
export default TableCom;