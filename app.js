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
/**************************
* Controller
**************************/

App.searchResultsController=Em.ArrayController.create({
	content:[],
	query:'',
	_idCache: {},

	addTweet: function(tweet) {
    // The `id` from Twitter's JSON
    var id = tweet.get("id");
    // If we don't already have an object with this id, add it.
    if (typeof this._idCache[id] === "undefined") {
      this.pushObject(tweet);
      this._idCache[id] = tweet.id;
    }
 },
 

	reverse:function(){
		return this.toArray().reverse();
	}.property('@each'),

	refresh:function(){
		var self=this;
		var query=self.get("query");
		
			var url="http://search.twitter.com/search.json?q="+query+"&callback=?"
		
			$.getJSON(url,function(data){
					
					
					

						App.TimeInterval.interval();
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
    	}, 5000);
	}
});

