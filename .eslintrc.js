module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "no-unused-vars": [
            "warn", 
            {
                "vars": "all",
                "args": "after-used",
                "caughtErrors": "all",
                "ignoreRestSiblings": false,
                "reportUsedIgnorePattern": false
            }
        ]
    }
}
