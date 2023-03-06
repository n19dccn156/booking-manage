import React from 'react';
import { Layout } from 'antd';

import '../../index.css';
const { Footer } = Layout;

const FooterContainer = () => {
  return (
    <Footer style={styleSheet.footer}>
      BOOKING ©2023 Created by students
    </Footer>
  );
}

const styleSheet = {
  footer: {
    margin: '16px 0 0 16px',
    // margin: '0px 16px 32px 8px',
    textAlign: "center",
    fontSize: 12,
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8, 
    borderBottomLeftRadius: 8  
  }
}

export default FooterContainer;