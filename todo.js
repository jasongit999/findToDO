var express = require('express');
var http = require('http');
var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');
var fileUtil = require('./helper/fileUtil');
//
var app = new express();
var srv = http.createServer(app);
srv.listen(8080);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./UI/ToDO.html'));
});




app.post('/', (req, res) => {

    //console.log(req.body.txtpath);
    var dir = req.body.txtpath;

    res.writeHeader(200, {"Content-Type": "text/html"}); 
    res.write('<h1>ToDO File(s)</h1>'); 
    res.write('<br/><br/>'); 
    res.write('<table border="1"><tr><th>Files</th></tr>'); 
    fileUtil.getFiles(dir, (err, results)=>{
        
        fileUtil.findToDo(results, (resToDO)=>{
     
            resToDO.forEach(element => {
                res.write('<tr><td>' + element +  '</td></tr>')
            });
            res.write('</table>'); 
            res.end();

        })

    })

});

