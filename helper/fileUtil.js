var http = require('http');
var fs = require('fs');
var path = require('path');

var getFiles = (dir, done) => {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) 
            return done(err);

        var i = 0;

        (function next(){
            var file = list[i++];
            if (!file) 
                return done(null, results);

            file = path.resolve(dir, file);
            fs.stat(file, function(err, stat) {

                if (stat && stat.isDirectory()) {
                    getFiles(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });

                } else {
                    results.push(file);
                    next();

                }

            });

        })();

    });
};



var findToDo = (files, done) => {
    var results = [];
    var i = 0;

    (function next(){

        var file = files[i++];
        if (!file) return done(null, results);

        fs.readFile(file,'utf-8',(err,data) => {

            if(err) throw err;

            if(data.indexOf('TODO') >= 0 && (file != __filename))
                results.push(file);

            if(i > files.length -1)
                return done(results);
            else
                next()
        });

    })();


};

module.exports = { getFiles, findToDo};