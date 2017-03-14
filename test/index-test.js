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
                    message: "表外音訓: \"哀しい(カナシイ)\"",
                    line: 1,
                    column: 1
                }
            ]
        },
        // multiple match
        {
            text: `哀しまない
哀しみます
哀しむ
哀しめば
哀しもう`,
            errors: [
                {
                    message: "表外音訓: \"哀しま(カナシマ)\"",
                    line: 1,
                    column: 1
                },
                {
                    message: "表外音訓: \"哀しみ(カナシミ)\"",
                    line: 2,
                    column: 1
                },
                {
                    message: "表外音訓: \"哀しむ(カナシム)\"",
                    line: 3,
                    column: 1
                },
                {
                    message: "表外音訓: \"哀しめ(カナシメ)\"",
                    line: 4,
                    column: 1
                },
                {
                    message: "表外音訓: \"哀しも(カナシモ)\"",
                    line: 5,
                    column: 1
                }
            ]
        },

    ]
});