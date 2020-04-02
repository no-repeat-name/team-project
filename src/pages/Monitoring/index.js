import React, {Component} from 'react'
import { Card, Icon, Divider, Spin } from 'antd'
import Api from '../../api/monitoring'
import Style from './index.module.less'
import { Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
import ReactEcharts from 'echarts-for-react';
 


class Monitoring extends Component {
    getOption(){
        return{
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }
    render() {
        
        return(
            <div>
                <Card title='实时交易情况'>
                <ReactEcharts option={this.getOption()} />
                </Card>
                
            </div>
        )
        
    }
}

export default Monitoring