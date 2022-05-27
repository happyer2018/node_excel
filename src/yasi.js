let xlsx = require('node-xlsx');
let fs = require('fs')
const sheets = xlsx.parse('yasi.xlsx')
// 获取xlsx第一个标签栏的数据
const sheetData = sheets[1].data;

// 定义数据列表
let testList = [];
// 循环拼装数据
console.log(sheets.length)
sheets.forEach((item, i) => {
    var itemList = []
    console.log(item.data.length)
    item.data.forEach((data, index) => {
        if (index == 0) {
            // 去除标题栏
            return;
        } else {
            if (data[0]) {
                itemList.push({
                    english: data[0],
                    chinese: data[1],
                    para: data[2],
                });
            }

        }
    })
    const jsonObj= chunk(itemList,100);
    fs.writeFileSync("build/yasi"+i+".json", JSON.stringify(jsonObj));
    testList.push(itemList)
})

// 压缩的情况
fs.writeFileSync("build/yasi.json", JSON.stringify(testList));
// fs.writeFileSync("build/yasiRandom.json", JSON.stringify(randomJsonObj));

console.log('长度' + testList.length)

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

