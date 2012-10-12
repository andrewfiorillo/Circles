var img = {
	
	initialize: function() {
		this.elements();
		this.getParams();
		this.build();
		this.controls();
	},
	
	elements: function() {
		this.output   = $("#output");
		this.presets  = $$("#more_list li a");
		this.toggle   = $("#control_toggle");
		this.form     = $("#form");
		this.submit   = $("#submit")
		this.url      = $("#imageurl");
		this.size     = $("#imagesize");
		this.count    = $("#count");
		this.rotation = $("#rotation");
		this.duration = $("#duration");
	},
	
	build: function() {
		
		var url       = this.url.value
			imagesize = this.size.value,
			count     = this.count.value,
			rotation  = this.rotation.value,
			duration  = this.duration.value,
			decr      = imagesize/count,
			open      = "",
			close     = "";
			
		for(var i = 0; i < count; i++) {
			
			var offset = decr * i,
				size   = imagesize - offset,
				rotate = rotation * (i + 1),
				animation = "";
			
			if (duration > 0) animation = '\
				-webkit-animation-duration         : '+ duration +'s;\
				-webkit-animation-name             : rotate;\
    			-webkit-animation-iteration-count  : infinite;\
    			-webkit-transition-timing-function : linear;';
			
			open +='<div class="unit" style="\
				width               : '+ size +'px;\
				height              : '+ size +'px;\
				margin-top          : -'+ size/2 +'px;\
				margin-left         : -'+ size/2 +'px;\
				background-position : -'+ offset/2 +'px -'+ offset/2 +'px;\
				background-size     : '+ imagesize +'px '+ imagesize +'px;\
				background-image    : url('+ url +');\
				-webkit-transform   : rotate('+ rotate +'deg);\
				-moz-transform      : rotate('+ rotate +'deg);\
				'+ animation +'\
				">';
			close +='</div>';
		}
		
		this.output.innerHTML = open + close;
		
	},
	
	controls: function() {
		
		var that = this;
		
		this.toggle.onclick = function() {
			toggleClass(document.body, "closed")
		};
		
		this.form.onsubmit = function() {
			that.build();
			event.preventDefault();
		}
		
		for(var i = 0; i < this.presets.length; i++) {
			this.presets[i].onclick = function() {
				that.url.value = event.target.href;
				event.preventDefault();
			}
		}
		
	},
	
	getParams: function() {
		
		var pairs = window.location.hash.replace("#","").split("&"),
			params = {};
		
		for(var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split("=");
			params[pair[0]] = pair[1];
		}
		
		var sliders = ["imageurl", "imagesize", "tilesize", "tilemargin", "radius", "tiletint", "tiletintop", "rotate", "blur"];
		
		for(var i = 0; i < sliders.length; i++) {
			if(params[sliders[i]]) $("#" + sliders[i]).val(params[sliders[i]]);
		}

	},
	
};