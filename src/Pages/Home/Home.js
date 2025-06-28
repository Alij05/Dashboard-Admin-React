import React from 'react'
import './Home.css'
import Features from '../../Components/Features/Features'
import Chart from '../../Components/Chart/Chart'
import WidgetSm from '../../Components/WidgetSm/WidgetSm'
import WidgetLg from '../../Components/WidgetLg/WidgetLg'
import { xAxisData } from '../../datas';

export default function Home() {
  return (
    <div className='home'>
      <Features />
      <Chart title="Month Sale" data={xAxisData} dataKey="Sale" grid />

    </div>
  )
}
