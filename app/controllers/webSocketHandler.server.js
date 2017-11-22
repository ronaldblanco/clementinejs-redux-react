// no require needed here, at least, I don't think so
//var config = require('../models/socketData.js');
//var numClients = 0;
// Controller agrees to implement the function called "respond"

module.exports.respond = function(endpoint, socket, act, config, numClients){
    config.act = act;
    var io = endpoint;
    socket.on('event', function(data) {
        //console.log('WEBSOCKETSERVER->'+config);
        //console.log('A client sent us this message:', data.message);
        if(data.message == 'I did add a name to the array!'){
            config.name = data.name;
            config.ope = data.ope;
            io.emit('stats', { numClients: numClients, data: config }); 
            //io.emit('broadcast', config.name + ' was Add by a Client!');
        } 
        else if(data.message == 'I did remove a name to the array!'){
            config.name = data.name;
            config.ope = data.ope;
            io.emit('stats', { numClients: numClients, data: config }); 
            //io.emit('broadcast', config.name + ' was remove by a Client!');
        }
        else if(data.message == 'Send me again please!'){
            //io.emit('stats', { numClients: numClients, data: config }); 
        }
    });
	
	numClients++;
    io.emit('stats', { numClients: numClients, data: config });
    //console.log('Connected clients:', numClients);

    socket.on('disconnect', function() {
        numClients--;
        io.emit('stats', { numClients: numClients, data: config });
        //console.log('Connected clients:', numClients);
    });
};