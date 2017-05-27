/**
 * Created by Administrator on 2017/5/27 0027.
 */
import  fs from 'fs';
import  path from 'path';
import  handlebars from 'handlebars';

let helper={
    getHTMLFormTemplate(templateName,data,cb){
        let filePath=path.join(__dirname,"template/"+templateName+".hbs");
        fs.readFile(filePath,"utf8",(err,page)=>{
            let html=handlebars.compile(page.toString())(data);
            err!=undefined?cb(err,null):cb(null,html);
        })
    }
}

export default helper;