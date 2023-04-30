import { Image } from 'antd'
import React from 'react'

import img from '../../Asset/Img/hcm.webp'
import SelectCheckin from './SelectCheckin'
const BannerContainer = () => {
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <Image height={window.innerHeight/2} width={window.innerWidth} src={img}/>
      <SelectCheckin height={window.innerHeight/2-50}/>
    </div>
  )
}

export default BannerContainer;