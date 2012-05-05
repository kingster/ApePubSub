//Pushpub Command
Ape.registerCmd("inlinepub", false, function(params, info) {
	//Global password
	if (params.password == password) {
		
		if ($defined(params.to) && $defined(params.raw) && $defined(params.data)){
			
			if(params.toType == "multi"){
				var to = Ape.getChannelByPubid(params.to);
			}else{
				var to = Ape.getUserByPubid(params.to);
				Ape.log("User to User");
			}
			
			if (!$defined(to.pipe)) return ["401", "UNKNOWN_CHANNEL"];
			
			//User Source From
			var user = Ape.getUserByPubid(params.from);
			if (!$defined(user.pipe) || !user.pipe) return ["401", "UNKNOWN_USER"];
			
			//Send Data to channel
			to.pipe.sendRaw(params.raw, params.data, {"from": user.pipe});	
			
			return {"name":"pushed","data":{"status":"ok"}}
		} else {
			return 0;
		}
	} else {
		return ["400", "BAD_PASSWORD"];
	}
});