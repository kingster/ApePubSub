//var APSChannel = function(pipe, client) {
APS.channel = function(pipe, client) {
	
	for(var i in pipe.properties){
		this[i] = pipe.properties[i]
	}
	
	this._events = {};
	//this.properties = pipe.properties;
	//this.name = pipe.properties.name;
	this.pubid = pipe.pubid;
	this._client = client;
	this.users = {};
	
	this.addUser = function(u){
		this.users[u.pubid] = u;
	}
	
	this.update = function(o){
		for(var i in o){
			if(this[i] != o[i]) this[i] = o[i];
		}
	}
	
	this.leave = function(){
		this.trigger("unsub", [client.user, this]);
		
		client.sendCmd('LEFT', {"channel": this.name});
		
		this.log("Unsubscribed from ("+this.name+")");
		
		delete client.channels[this.name];
	}
	
	this.send = APS.prototype.send.bind(client, this.pubid);
	
	this.on = client.on.bind(this);
	this.pub = client.pub.bind(client, this.name);
	this.trigger = client.trigger.bind(this);
	this.log = client.log.bind(client, "[channel]", "["+this.name+"]");
	//this.log = client.log.bind(client);
}
