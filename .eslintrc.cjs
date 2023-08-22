/*
 * @Descripttion:
 * @version: 1.0.0
 * @Author: lai_hq@qq.com
 * @Date: 2023-02-20 20:48:01
 * @LastEditors: lai_hq@qq.com
 * @LastEditTime: 2023-06-22 15:48:56
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
        node: true,
        jest: true
    },
    globals: {
        ga: true,
        chrome: true,
        __DEV__: true
    },
    // 解析 .vue 文件
    parser: "vue-eslint-parser",
    extends: ["plugin:json/recommended", "vue-global-api", "plugin:vue/vue3-essential", "eslint:recommended", "./.eslintrc-auto-import.json"],
    plugins: ["@typescript-eslint", "prettier"],
    parserOptions: {
        parser: "@typescript-eslint/parser" // 解析 .ts 文件
    },
    rules: {
        // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "prettier/prettier": "error",

        /**
         * 最佳实践
         */
        eqeqeq: 2, // 强制使用 === 和 !==
        "default-case": 1, // 要求 switch 语句中有 default 分支
        "no-empty-function": 1, // 禁止出现空函数
        "no-multi-spaces": 1, // 禁止使用多个空格
        "vue/no-v-model-argument": "off",
        "vue/no-mutating-props": "off",
        "vue/no-multiple-template-root": "off",
        "vue/no-use-v-if-with-v-for": "off",
        "vue/no-inline-styles": 0,
        
        "no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }
        ],
        "vue/no-unused-vars": "warn",
        "vue/multi-word-component-names": "off",
        /**
         * ECMAScript6
         */
        "no-var": 2, // 禁止使用 var 声明变量
        "prefer-arrow-callback": 2, // 要求回调函数使用箭头函数
        "arrow-spacing": ["error", { before: true, after: true }], // 强制箭头函数的箭头前后使用空格
        "space-before-function-paren": ["error", { anonymous: "always", named: "never", asyncArrow: "always" }],
        "init-declarations": ["error", "always"], // 声明变量必须赋值
        "object-shorthand": 2, // 要求使用对象方法名和属性名简写
        "prefer-const": 2, // 使用 const 声明那些声明后不再被修改的变量

        /**
         * 风格指南
         */
        indent: ["error", 4], // 缩进为四个空格
        semi: "off", // 禁止末尾分号
        quotes: ["error", "double"], // 强制使用单引号
        "space-infix-ops": 2, // 操作符周围必须有空格\
        "spaced-comment": ["error", "always"] // 注释后面必须跟随至少一个空白
        // "@typescript-eslint/semi": ["error", "single"],
    }
}
