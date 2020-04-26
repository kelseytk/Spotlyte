
var fs = require('fs'); 

module.exports=class FileReader{
    readFile(filename, callback){
        fs.readFile(filename, "utf8", (error,data)=>{
          console.log(error)
          //console.log(JSON.parse(data))
          console.log("file read")
          callback(data)
        })
    }
}