const fs = require('fs')
const path = require('path')
const CsvReader = require('promised-csv')
const reader = new CsvReader()
const tokenize = require("kuromojin")
const yaml = require('js-yaml')
const csvDir = path.join(__dirname, 'csv');
const dictDir = path.join(__dirname, 'dict');

/*
let fileList = [];

fs.readdir(csvDir, function(err, files){
  if (err) throw err;
  files.filter(function(file){
  	return fs.statSync(path.join(csvDir, file)).isFile() && /.*\.csv$/.test(file);
  }).forEach(function(file){
    let filePath = path.join(csvDir, file);
    fileList.push(filePath);
  });
});
*/

function readdirPromise(dir){
  return new Promise(function(resolve, reject){
    fs.readdir(dir, function(err, files){
      if (err){
        reject(err);
      }
      resolve(files);
    });
  });
}

function createEntry(file){
  return reader.read(file, function (data) {
  	let entry = {
      fix_form: null,
      supplemental: `表外音訓, ${data[0]}, ${data[2]}, ${data[4]}`,
      tokens: [
        {
          surface_form: data[5],
          pos:          data[9],
          pos_detail_1: data[10],
          pos_detail_2: data[11],
          pos_detail_3: data[12],
          conjugated_type: data[13],
          conjugated_form: data[14],
          basic_form:   data[15],
          reading:      data[16],
          pronunciation: data[17]
        }
      ]
  	}
    return entry;
  });
};

readdirPromise(csvDir)
  .then(function(files){
  	Promise.all(files.map(function(file){
  	  let filePath = path.join(csvDir, file);
  	  return createEntry(filePath);
  	})).then(function(results){

  	  let dictData = {
  	  	message: "表外音訓",
  	  	dict:  []
  	  };

  	  results.forEach(function(result){
  	  	if(result.length > 0) {
  	  	  dictData.dict = dictData.dict.concat(result);
  	  	}
  	  });
      console.dir(dictData);
  	  fs.writeFileSync(path.join(dictDir, 'hyogai-onkun.yml'), yaml.safeDump(dictData));

  	});
  });

/* `表外音訓, ${data[0]}, ${data[2]}, ${data[4]}`
function readCsv(file){
  return reader.read(file, function (data){
  	let entry = {
      fix_form: null,
      supplemental: `表外音訓 | ${data[0]} | ${data[2]} | ${data[4]}`,
      tokens: [
        {
          surface_form: data[5],
          pos:          data[9],
          pos_detail_1: data[10],
          pos_detail_2: data[11],
          pos_detail_3: data[12],
          conjugated_type: data[13],
          conjugated_form: data[14],
          basic_form:   data[15],
          reading:      data[16],
          pronunciation: data[17]
        }
      ]
  	};
  	return entry;
  });
};
*/
