/*  tarun Chaudhary 
B tech (EE)
IIT Rajasthan
tarun29061990@gmail.com

tarun29061990@github*/

/**************************
* Application
**************************/

App=Em.Application.create({
	
});

/**************************
* Model
**************************/
App.Tweet=Em.Object.extend({
	

});

App.Master =Ember.Object.extend({
	me_url:null,
	facebook_url:null
});

/**************************
* View
**************************/

App.SearchTextField=Em.TextField.extend({
	
});
var search=App.SearchTextField.create({
	insertNewLine:function(){
		App.SearchResultsController.refresh();
	},

	remove:function(){
		this.remove();
	}

});

App.TweetCountView=Ember.View.extend({
	count:null
});
/**************************
* Controller
**************************/

App.searchResultsController=Em.ArrayController.create({
	content:[],
	query:'',
	_idCache: {},
	tweet_count:'',
	parameter:null,
	
	addTweet: function(tweet) {
    // The `id` from Twitter's JSON
    	var id = tweet.get("id");
    	this.parameter++;
    // If we don't already have an object with this id, add it.
    	if (typeof this._idCache[id] === "undefined") {
      		this.pushObject(tweet);
      		this._idCache[id] = tweet.id;
    	}

    	if(this.parameter>2)
    		{App.TimeInterval.bigInterval();}
    	else
    		App.TimeInterval.interval();
 	
 	},

	reverse:function(){
		return this.toArray().reverse();
	}.property('@each'),

	refresh:function(){
		var self=this;
		var query=self.get("query");
		
			var url="http://search.twitter.com/search.json?q="+query+"&callback=?"
		
			$.getJSON(url,function(data){
					
						
						for (var i = 0; i < data.results.length; i++) 
						{
        					self.addTweet(App.Tweet.create(
        						data.results[i]));
						}
      					
			});
		
	}
});

App.TimeInterval=Ember.ArrayController.create({
	interval:function(){
		setInterval(function() {
      	App.searchResultsController.refresh();
    	}, 20000);
	},

	bigInterval:function(){
		setInterval(function() {
      	App.searchResultsController.refresh();
    	}, 100000);
	}
});

App.masterController=Ember.ArrayController.create({
	content:[
		App.Master.create({
		me_url:"https://graph.facebook.com/tarun29061990/picture/",
		facebook_url:"https://www.facebook.com/tarun29061990/",
		})
	]
});


