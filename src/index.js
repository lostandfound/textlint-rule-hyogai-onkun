"use strict";

const fs = require('fs');
const kuromojin = require("kuromojin");
const createMatcher = require("morpheme-match-all");
const yaml = require('js-yaml');
const data = yaml.safeLoad(fs.readFileSync(__dirname + "/../dict/hyogai-onkun.yml", 'utf8'));

let dictionaries = [];

data.dict.forEach(function (item) {
  let form = "";
  item.tokens.forEach(function (token) {
    form += token.surface_form;
  });
  dictionaries.push({
    message: data.message + ": \"" + form + "\"",
    tokens: item.tokens
  });
});

const matchAll = createMatcher(dictionaries);

function reporter(context, options = {}) {
    const {Syntax, RuleError, report, getSource, fixer} = context;
    return {
      [Syntax.Str](node){ // "Str" node
        const text = getSource(node); // Get text
        return kuromojin(text).then((actualTokens) => {
          const results = matchAll(actualTokens);
          if (results.length == 0) {
            return;
          }
          results.forEach(function (result) {
            let tokenIndex = result.index;
            let index = getIndexFromTokens(tokenIndex, actualTokens);
            let ruleError = new RuleError(result.dict.message, {
              index: index,
            });
            console.log(node);
            console.log("-----------------------");
            console.log(result);
            report(node, ruleError);
          });
        });
      }
    }
}

function getIndexFromTokens(tokenIndex, actualTokens) {
  let index = 0;
  for ( let i = 0; i < tokenIndex; i++) {
    index += actualTokens[i].surface_form.length;
  }
  return index;
}

module.exports = {
  linter: reporter,
  fixer: reporter
};