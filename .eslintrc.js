module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "@vue/standard",
        "@vue/typescript/recommended"
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "indent": [2, 4, { SwitchCase: 1 }],
        "space-before-function-paren": [2, { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
        "quotes": [2, "double", { allowTemplateLiterals: true }],
        "@typescript-eslint/ban-ts-ignore": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/interface-name-prefix": 0,
        "@typescript-eslint/camelcase": 0
    }
}
