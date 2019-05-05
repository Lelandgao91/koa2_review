const fs = require('fs');
const getSqlContentMap = require("./util/get-sql-content-map");
const {
    query
} = require("./util/db");

const eventLog = function (err, sqlFile, index) {
    if (err) {
        console.log(`[ERROR] sql 脚本文件：${sqlFile} 第${index+1}条脚本 执行失败 `)
    } else {
        console.log(`[SUCCESS] sql 脚本文件：${sqlFile} 第${index+1}条脚本 执行成功 `)
    }
}

let SqlContentMap = getSqlContentMap()

const createAllTables = async () => {
    for (let key in SqlContentMap) {
        let sqlShell = SqlContentMap[key]
        let sqlShellList = sqlShell.split(';')

        for (let [i, shell] of sqlShellList.entries()) {
            if (shell.trim()) {
                let result = await query(shell)
                if (result.serverStatus * 1 === 2) {
                    eventLog(null, key, i)
                } else {
                    eventLog(true, key, i)
                }
            }
        }
    }
    console.log("sql脚本执行结束！")
    console.log("请按 ctrl +ｃ　退出")
}

createAllTables();
