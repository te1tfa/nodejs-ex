var express    = require('express');
var bodyParser = require('body-parser');

var mod_express = express();

var port    = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;
var address = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Inicialización del servidor web
var server = mod_express.listen(port, address,
	function () 
	{
		var host = server.address().address;
		var port = server.address().port;
		//logger.log(logMsg.EXP_InitOk, 'Servidor express arrancado listening at //' + host + ':' + port);
    console.log('Servidor web arrancado listening at ' + host + ':' + port);    
	});

mod_express.use(function(req, res, next)
{
	// Habilitamos CORS
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

// Configuración de las páginas estáticas.
mod_express.use(express.static(process.cwd() + '/www'));

// ***************************************************************************
// Procesamiento de una petición GET
// ***************************************************************************
mod_express.get('/PetitionPath', function (req, res)
{
  var str = "GET: PetitionPath" + 
            "-->" + req.url +
            "-->" + JSON.stringify(req.query); 
	res.send(str);
  console.log(str + "\n");
});

// ***************************************************************************
// Procesamiento de una petición POST
// ***************************************************************************
mod_express.post('/PetitionPath', bodyParser.text(), function (req, res)
{
	var str = "POST: PetitionPath" + 
           "-->" + req.url +
           "-->" + JSON.stringify(req.query) + 
           "--> BODY: " + req.body;
  res.send(str);
  console.log(str + "\n");
});