var fs = require('fs');
var http = require('http');
var queryString = require('querystring')
var server = http.createServer((req, res)=>{
    if (req.url == '/'){
        var page = fs.readFile('test.html', (err, data)=>{
            if (err){
                console.log("Error occurred");
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Internal Server Error');
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end()
            }
        });
    }
    else if (req.url == '/login'){
        let body = '';

        req.on('data',chunk => {body += chunk})
        
        req.on('end', ()=>{
            console.log(body)
            const postData = queryString.parse(body);

            const username = postData.username;
            const password = postData.password;

            if (username === 'roshanali' && password === 'roshan'){
                res.writeHead(200, {'Content-Type':'text/plain'})
                res.write('Login Successful')
                res.end()
            }
            else{
                res.writeHead(201, {'Content-Type':'text/plain'})
                res.write("Invalid Login")
                res.end();
            }
        })
    }
})

server.listen(3000);

console.log("Listening on port 3000");