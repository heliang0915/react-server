/**
 * Created by Administrator on 2017/5/27 0027.
 */
var fs = require( 'fs' ),
    stat = fs.stat;

var RootPath=require("path");
/*
 * 复制目录中的所有文件包括子目录
 * @param{ String } 需要复制的目录
 * @param{ String } 复制到指定的目录
 */
var copy = function( src, dst ){
    // 读取目录中的所有文件/目录
    fs.readdir( src, function( err, paths ){
        if( err ){
            throw err;
        }
        paths.forEach(function( path ){
            var _src =RootPath.join(src,"/"+path),
                _dst =RootPath.join(dst,"/"+path),
                readable, writable;

            stat( _src, function( err, st ){
                if( err ){
                    throw err;
                }
                // 判断是否为文件
                if( st.isFile() ){
                    // 创建读取流
                    readable = fs.createReadStream( _src );
                    // 创建写入流
                    writable = fs.createWriteStream( _dst );
                    // 通过管道来传输流
                    readable.pipe( writable );
                }
                // 如果是目录则递归调用自身
                else if( st.isDirectory() ){
                    exists( _src, _dst, copy );
                }
            });
        });
    });
};
// 在复制目录前需要判断该目录是否存在，不存在需要先创建目录
var exists = function( src, dst, callback ){

    fs.exists( dst, function( exists ){
        // 已存在
        if( exists ){
            callback( src, dst );
        }
        // 不存在
        else{
           mkdirs( dst, function(err){
                 console.log(err!=undefined?err:"");
                callback( src, dst );
            });
        }
    });
};


//递归创建目录 异步方法
function mkdirs(dirname, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            //console.log(path.dirname(dirname));
            mkdirs(RootPath.dirname(dirname), function () {
                fs.mkdir(dirname, callback);
            });
        }
    });
}

//递归创建目录 同步方法
function mkdirsSync(dirname) {
    //console.log(dirname);
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(RootPath.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}


//同步删除指定目录下的所前目录和文件,包括当前目录
function rmdirsSync(targetPath) {
    try{
        let files = [];
        if( fs.existsSync(targetPath) ) {
            files = fs.readdirSync(targetPath);
            files.forEach(function(file,index){
                let curPath = targetPath + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    if(!rmdirsSync(curPath)) return false;
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(targetPath);
        }
    }catch(e)
    {
        console.log("remove director fail! path=" + targetPath + " errorMsg:" + e);
        return false;
    }
    return true;
};

//做生产变以前准备
createDist();
function createDist(){
    //先检查buid目录是否存在
    var buildPath=RootPath.join(__dirname,"/../build")
    var ex=fs.existsSync(buildPath);
    if(!ex){
        fs.mkdirSync(buildPath);
    }
    //先清空目录
    var rmdir=RootPath.join(__dirname,"/../build/");
    rmdirsSync(rmdir);
    //将不能被babel编译的文件放入build目录下 
    exists(RootPath.join(__dirname,"/../src/assets/"),RootPath.join(__dirname,"/../build/nodeServer/src/assets"),copy);
    exists(RootPath.join(__dirname,"/../server/template/"),RootPath.join(__dirname,"/../build/nodeServer/server/template"),copy);
}









