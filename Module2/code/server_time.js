require("http").createServer((inRequest, inResponse)=> {
const requestModule = require("request");
requestModule(
"http://worldtimeapi.org/api/timezone/America/Los_Angeles",
function (inErr, inResp, inBody){
inResponse.end(`Hello from my first node web server: ${inBody}`);
});
}).listen(80);