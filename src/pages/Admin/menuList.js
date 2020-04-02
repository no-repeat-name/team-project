export default [{
    key: '1',
    icon: "home",
    title: '首页',
    path: '/admin/home'
}, {
    key: '2',
    icon: 'user',
    title: '管理员',
    path: '/admin/administartor'
}, {
    key: '3',
    icon: "desktop",
    title: '用户管理',
    path: '/admin/user',
    children: [{
            key: '3-1',
            title: "用户添加",
            path: '/admin/useradd'
        },
        {
            key: '3-2',
            title: "用户列表",
            path: '/admin/userlist'
        }
    ]
}, {
    key: '4',
    icon: "shopping",
    title: '商品管理',
    path: '/admin/goods',
    children: [{
            key: '4-1',
            title: '商品信息',
            path: '/admin/goodsInfo'
        },
        {
            key: '4-2',
            title: '商品添加',
            path: '/admin/goodsInfoAdd'
        }
    ]
}, {
    key: '5',
    icon: 'area-chart',
    title: "统计分析",
    path: '/admin',
    children: [{
        key: '5-1',
        title: '数据分析',
        path: '/admin/analysis'
    },
    {
        key: '5-2',
        title: '数据监控',
        path: '/admin/monitoring'
    }
]
}, {
    key: '6',
    icon: 'contacts',
    title: '会员管理',
    path: '/admin/vip'
}, {
    key: '9',
    icon: "setting",
    title: '设置',
    path: '/admin/set'
}]