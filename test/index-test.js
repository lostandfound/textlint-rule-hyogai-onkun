"use strict";
const TextLintTester = require("textlint-tester");
const tester = new TextLintTester();
// rule
const rule = require("../src/index");
// ruleName, rule, { valid, invalid }
tester.run("rule", rule, {
    valid: [
        // no problem
        "text"
    ],
    invalid: [
        // single match
        {
            text: "哀しいことです。",
            errors: [
                {
                    message: "表外音訓: \"哀しい\"",
                    line: 1,
                    column: 1
                }
            ]
        },
        // multiple match
        {
            text: `愛しいです。

愛しければ私は`,
            errors: [
                {
                    message: "表外音訓: \"愛しい\"",
                    line: 1,
                    column: 1
                },
                {
                    message: "表外音訓: \"愛しけれ\"",
                    line: 3,
                    column: 1
                }
            ]
        },

    ]
});