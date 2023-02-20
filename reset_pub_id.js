"use strict";

let fs = require('fs');

const file = fs.readFileSync('_data/publications.yml', 'utf8');
let arr = file.split('\n');

let cnt = 0;
for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].slice(0,5) == '  id:') {
        arr[i] = `  id: ${cnt}`;
        cnt += 1;
    }
}

console.log(`max id: ${cnt-1}`);

const file_name = '_data/publications.yml';
fs.writeFileSync(file_name, arr.join('\n'), function(err) {
    if (err) {
        console.log(err);
    }
});

console.log(`${file_name} is saved.`);
