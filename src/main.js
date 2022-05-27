let xlsx = require('node-xlsx');
let fs = require('fs')
const sheets = xlsx.parse('source.xlsx')
// 获取xlsx第一个标签栏的数据
const sheetData = sheets[1].data;
// 定义数据列表
let testList = [];
// 循环拼装数据
sheetData.forEach((item, index) => {
        if(item[1]){
            testList.push({
                english: item[1],
                chinese: item[2],
                para: item[3],
            });
        }
});

const jsonObj= chunk(testList,100);
const randomList = randomSort(testList);
const randomJsonObj = chunk(randomList,100);

// 不压缩的情况
// fs.writeFileSync('test-shujuchouqu.json',JSON.stringify(jsonObj, null, "\t"));

// 压缩的情况
fs.writeFileSync("build/output.json", JSON.stringify(jsonObj));
fs.writeFileSync("build/outputRandom.json", JSON.stringify(randomJsonObj));

console.log('长度'+jsonObj.length)
console.log('长度'+randomJsonObj.length)
console.log('文件转换完成')


function chunk(arr, size) {
    const list = [];
    let current = [];
    arr.forEach(t => {
        current.push(t);
        if (current.length === size) {
            list.push(current);
            current = [];
        }
    });
    if (current.length) {
        list.push(current);
    }
    return list;
}

function randomSort(arr) {
    var result = [];

    while (arr.length > 0) {
        var randomIndex = Math.floor(Math.random() * arr.length);
        result.push(arr[randomIndex]);
        arr.splice(randomIndex, 1);
    }

    return result;
}

