import { Alert, Space } from 'antd';
import { useState, useEffect } from 'react';


const AlertComp = () => {
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      console.log('is Online: ', isOnline)
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);
    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <div>
  <Space
    direction="vertical"
    style={{
      width: '100%',
      height: '100%'
    }}
  >
    {isOnline ? (
        <AlertComp style={{width: '40%'}} message="Kết nối internet thành công" type="success" showIcon closable/>
      ) : (
        <Alert style={{width: '40%'}} message="Không có kết nối internet" type="error" showIcon closable/>
      )}
    </Space>
    </div>
);
}

export default AlertComp;
