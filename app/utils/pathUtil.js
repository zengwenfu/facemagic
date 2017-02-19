var path = require('path');

/**
 * 获取文件夹下的所有文件
 *     @param root 根目录
 *     @param reg 文件正则匹配
 */
function getAllFiles(root, reg) {
    var res = [];
    var files = fs.readdirSync(root);
    files.forEach(function(file) {
        var pathname = root + '/' + file;
        var stat = fs.lstatSync(pathname);

        if (!stat.isDirectory()) {
            var fitlPath = path.resolve(root, file).replace(/\\/g, '/');
            if (reg == null || reg.test(fitlPath)) {
                res.push(fitlPath);
            }
        } else {
            res = res.concat(getAllFiles(pathname, reg));
        }
    });
    return res;
}


module.exports = {
    /**
     *  获取绝对路径
     */
    fullPath: function(dir) {
        return path.resolve(__dirname, dir);
    },
    /**
     * 获取所有文件
     */
    getAllFiles: getAllFiles
}