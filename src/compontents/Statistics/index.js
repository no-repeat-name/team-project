import React, { Component } from 'react'
import InventoryStatistics from '../InventoryStatistics'
import SalesCategoryPercentage from '../SalesCategoryPercentage'
import { Card } from 'antd'

const tabList = [
    {
        key: 'tab1',
        tab: '销售类别占比',
    },
    {
        key: 'tab2',
        tab: '库存概况',
    },
];

const contentList = {
    tab1: <SalesCategoryPercentage></SalesCategoryPercentage>,
    tab2: <InventoryStatistics></InventoryStatistics>,
};

class Statistics extends Component {
    state = {
        key: 'tab1'
    };

    onTabChange = (key, type) => {
        this.setState({ [type]: key });
    };

    render() {
        return (
            <div>
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        )
    }
}

export default Statistics