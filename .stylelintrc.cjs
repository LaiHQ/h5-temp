// .stylelintrc.cjs
module.exports = {
    root: true,
    extends: ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-recommended-less", "stylelint-config-html/vue"],
    plugins: ["stylelint-order"],
    defaultSeverity: "warning",
    overrides: [
        {
            files: ["*.vue", "**/*.vue"],
            rules: {
                "selector-pseudo-class-no-unknown": [
                    true,
                    {
                        ignorePseudoClasses: ["deep", "global"]
                    }
                ],
                "selector-pseudo-element-no-unknown": [
                    true,
                    {
                        ignorePseudoElements: ["v-deep", "v-global", "v-slotted"]
                    }
                ]
            }
        },
        {
            files: ["**/*.{less}"],
            customSyntax: "postcss-less"
        }
    ],
    rules: {
        "no-empty-source": null,
        "selector-class-pattern": [
            // 命名规范 -
            "^([a-z][a-z0-9]*)(-[a-z0-9]+)*$",
            {
                message: "类选择器应为命名规范错误"
            }
        ],
        // 指定样式的排序
        "order/properties-order": [
            "position",
            "top",
            "right",
            "bottom",
            "left",
            "z-index",
            "display",
            "justify-content",
            "align-items",
            "float",
            "clear",
            "overflow",
            "overflow-x",
            "overflow-y",
            "padding",
            "padding-top",
            "padding-right",
            "padding-bottom",
            "padding-left",
            "margin",
            "margin-top",
            "margin-right",
            "margin-bottom",
            "margin-left",
            "width",
            "min-width",
            "max-width",
            "height",
            "min-height",
            "max-height",
            "font-size",
            "font-family",
            "text-align",
            "text-justify",
            "text-indent",
            "text-overflow",
            "text-decoration",
            "white-space",
            "color",
            "background",
            "background-position",
            "background-repeat",
            "background-size",
            "background-color",
            "background-clip",
            "border",
            "border-style",
            "border-width",
            "border-color",
            "border-top-style",
            "border-top-width",
            "border-top-color",
            "border-right-style",
            "border-right-width",
            "border-right-color",
            "border-bottom-style",
            "border-bottom-width",
            "border-bottom-color",
            "border-left-style",
            "border-left-width",
            "border-left-color",
            "border-radius",
            "opacity",
            "filter",
            "list-style",
            "outline",
            "visibility",
            "box-shadow",
            "text-shadow",
            "resize",
            "transition"
        ]
    }
}
