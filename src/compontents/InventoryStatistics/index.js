import React, { Component } from 'react'
import { Spin } from 'antd'
import ReactEcharts from 'echarts-for-react'
import Api from '../../api/analysis'

class InventoryStatistics extends Component {
    state = {
        option: {
            title: {
                text: '',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: '10%',
                data: []
            },
            series: [
                {
                    name: '库存类别',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: []
                }
            ]
        },
        spinning: false
    }

    refreshList = async () => {
        this.setState({ spinning: true })
        let shopList = (await Api.kindList()).data.data
        let echartsList = []
        let menuList = []
        shopList.map((item, index) => {
            echartsList.push({ name: item.type, value: item.stock })
            menuList.push(item.type)
            return index
        })
        let { option } = JSON.parse(JSON.stringify(this.state))
        option.legend.data = menuList
        option.series[0].data = echartsList
        this.setState({ option, spinning: false })
    }

    componentDidMount() {
        this.refreshList()
    }

    render() {
        let { spinning, option } = this.state
        return (
            <Spin spinning={spinning}>
                <ReactEcharts option={option} />
            </Spin>
        )
    }
}

export default InventoryStatistics