import { defineConfig } from 'vitepress'

import {name,description,version} from "../../package.json"

const sidebar = {
    "/": [
        { text: "TODO", link: "/todo" },
        { text: "项目相关", link: "/project" },
        { text: "业务相关", link: "/business" },
        { text: "更新日志", link: "/updateLog" },
    ]
}
const config = {
    title: name,
    description,
    themeConfig: {
        sidebar,
        lastUpdatedText: '最后更新时间',
        editLink: {
            pattern: '',
            text: '为此页提供修改建议'
        },
        footer: {
            message: '细节决定成败,态度决定一切,心态决定人生',
            copyright: 'Copyright © 2023 前端团队'
        },
        nav: [
            {
                text: '异常监控',
                link: 'https://www.baidu.com',
            },
        ]
    }
}

export default defineConfig(config)

