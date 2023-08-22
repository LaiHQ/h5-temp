/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-02-24 17:48:03
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-02-25 09:05:36
 */
module.exports = {
    // 文件输出路径
    infile: "/docs/log.md",
    skip: {
        bump: true, // 取得当前版本（比如package.json里面的version字段，这里我们定义了packageFiles，所以会从packageFiles.filename取），升版本：1.0.0 => 1.1.0 或者 1.0.0 => 2.0.0等（如何升级可以由参数控制）
        changelog: true, // 自动产出changelog文档
        commit: true, // 提交变动
        tag: true // 在git中增加tag标识
    },
    header: "## 更新日志\n\n",
    // types为Conventional Commits标准中定义，目前支持https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional // "type" commit 类型 // "section" 不同的 commit 类型所在 CHANGELOG.md 中的区域 // "hidden" 是否在 CHANGELOG.md 中显示
    types: [
        { type: "feat", section: "新特性", hidden: false },
        { type: "fix", section: "Bug修复", hidden: false },
        { type: "docs", section: "文档", hidden: false },
        { type: "chore", section: "配置项", hidden: false },
        { type: "style", section: "格式", hidden: false },
        { type: "refactor", section: "重构", hidden: false },
        { type: "perf", section: "性能", hidden: false },
        { type: "test", section: "测试", hidden: false },
        { type: "build", section: "构建", hidden: false },
        { type: "ci", section: "CI", hidden: false },
        { type: "revert", section: "回滚", hidden: false }
    ], // 对比版本的url
    // compareUrlFormat: "{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}", // hash链接(commit的连接，例如：https://git.yoururl.com/blank91/ui/commit/f91dcfdebf89be24f550ccbbd8c4f03029b44812)
    // commitUrlFormat: "{{host}}/{{owner}}/{{repository}}/commit/{{hash}}", //issue链接
    // issueUrlFormat: "http://yourissue/browse/RDC-{{id}}", // 用于检测对问题的引用的前缀数组（必须有此项才会在changelog中显示bug连接，我们用的是jira）
    // issuePrefixes: ["RDC-"], //server-version自动commit的模板
    releaseCommitMessageFormat: "build: {{currentTag}}版本发布", // 识别的tag前缀
    // "tag-prefix": "rb", // 预发版前缀
    prerelease: "dev"
    // bumpFiles: [
    //     {
    //         filename: "version.json", // The `json` updater assumes the version is available under a `version` key in the provided JSON document.
    //         type: "json" // 也可以是 "plain-text"， The `plain-text` updater assumes the file contents represents the version.
    //     }
    // ], //需要server-version更新版本号的文件
    // packageFiles: [
    //     {
    //         filename: "version.json", // The `json` updater assumes the version is available under a `version` key in the provided JSON document.
    //         type: "json"
    //     }
    // ]
}
