var http=require('http'); 
url=require('url');
fs=require('fs');
mymodule=require('./mymodule');
query=require('querystring');
processrequest=function(req,resp)
{		u=url.parse(req.url);
		console.log(u);
		switch(u.pathname)
		{
			case '/':
			resp.writeHead(200,{'Content-Type':'text/html'});
			fs.readFile("form.html",function(err,data)
			{
				if(err)
				{
					console.log('Error Server');
				}
				else
				{
					resp.write(data);
				}
			});
			break;
			case '/calculate':
			resp.writeHead(200,{'Content-Type':'text/html'})
			var str="";
			req.on("data",function(d){
				str+=d;
			});
			req.on("end",function(){
			data=query.parse(str);
			console.log(data);
			if(data.opr=='add')
			{	var c=mymodule.addition(data.num1,data.num2);
				resp.end("Additon : "+c);
			}
			else if(data.opr=='sub')
			{
				var c=mymodule.sub(data.num1,data.num2);
				resp.end("Sub : "+c);
			}
			else if(data.opr=='mul')
			{
				var c=mymodule.mul(data.num1,data.num2);
				resp.end("Sub : "+c);
			}
			else if(data.opr=='div')
			{
				var c=mymodule.div(data.num1,data.num2);
				resp.end("Div : "+c);
			}
		
   });
   
   		
			
			break;
			case '/about':
			resp.writeHead(200,{'Content-Type':'text/html'});
			resp.write("Verma");
			resp.end("<h1>IACSD</h1>");
			break;
			default:
			resp.writeHead(200,{'Content-Type':'text/html'});
			resp.end("<h1>Page Not Found</h1>");
			break;
		}
		
		
}
http.createServer(processrequest).listen(1186);
console.log('Running Server at 1186');
 