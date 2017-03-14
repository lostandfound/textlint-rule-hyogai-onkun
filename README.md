# textlint-rule-hyogai-onkun

**Caution Work In Progress**

Check Hyogai Onkun(Kanji reading that has not been approved by Japanese government).

表外音訓を検出します。形態素解析を使っています。辞書は随時追加します。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install textlint-rule-hyogai-onkun

## Usage

Via `.textlintrc`(Recommended)

```json
{
    "rules": {
        "hyogai-onkun": true
    }
}
```

Via CLI

```
textlint --rule hyogai-onkun README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

    npm run build

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester "textlint-tester").

    npm test

## License

MIT © Hiroshi Takase
