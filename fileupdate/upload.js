const inspect = require('koa');
const path = require("path");
const os = require('os');
const fs = require("fs");
const Busboy = require("busboy");

/**
 * 同步穿件文件目录
 * @param {string} dirname 目录绝对地址
 * @return {boolean} 创建目录结果 
 */
function mkdirsSync(dirname) {
	if (fs.existsSync(dirname)) {
		return true
	} else {
		if (mkdirsSync(path.dirname(dirname))) {
			fs.mkdirSync(dirname);
			return true
		}
	}
}

/**
 * 获取上传文件的后缀名
 * @param {string} fileName
 * @return {string} 文件后缀名
 */
function getSuffixName(fileName) {
	let nameList = fileName.split('.')
	return nameList[nameList.length - 1]
}


function uploadFile(ctx, options) {
	let req = ctx.req;
	let res = ctx.res;
	let busboy = new Busboy({
		headers: req.headers
	});

	let fileType = options.fileType || 'common'
	let filePath = path.join(options.path, fileType)
	let mkdirResult = mkdirsSync(filePath);

	return new Promise((resolve, reject) => {
		console.log('文件上传中');
		let result = {
			success: false,
			formData: {},
		}

		busboy.on("file", function (fieldname, file, filename, encodingm, mimetype) {
			let fileName = Math.random().toString(16).substr(2) + "." + getSuffixName(fileName);
			let _uploadFilePath = path.join(filePath, fileName);
			let saveTo = path.join(_uploadFilePath)


			file.pipe(fs.createWriteStream(saveTo));

			file.on('end', () => {
				result.success = true;
				result.message = "文件上传成功"
				console.log("文件上传成功！")
				resolve(result)
			})
		});

		busboy.on('filed', function (fieldname, val, fieldnameTruncated, valTruncated, endcoding, mimetype) {
			console.log('表单字段数据[' + fieldname + ']:value:' + inspect(val));
			result.formData[fieldname] = inspect(val);
		});

		busboy.on("error", function () {
			console.log("文件上传出错");
			reject(result)
		})

		req.pipe(busboy)

	})
}
module.exports = {
	uploadFile
}