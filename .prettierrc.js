/*
 * @Descripttion: 代码格式化
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2021-12-13 20:10:38
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-02-23 16:03:15
 */
// .preitterrc.js
module.exports = {
    // 一行的字符数，如果超过会进行换行，默认为80
    printWidth: 1000,
    // 一个tab代表几个空格数，默认为80
    tabWidth: 4,
    // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
    useTabs: false,
    // 字符串是否使用单引号，默认为false，使用双引号
    singleQuote: false,
    // 行位是否使用分号，默认为true
    semi: false,
    // 是否使用尾逗号，有三个可选值"<none|es5|all>"
    trailingComma: "none",
    // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    bracketSpacing: true,
    // 代码的解析引擎，默认为babylon，与babel相同
    // "parser": "babylon",
    endOfLine: "lf"
}
