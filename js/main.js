var img = {
	
	initialize: function() {
		this.elements();
		this.getParams();
		this.build();
		this.controls();
	},
	
	elements: function() {
		this.output    = $("#output");
		this.presets   = $$("#more_list li a");
		this.toggle    = $("#control_toggle");
		this.form      = $("#form");
		this.submit    = $("#submit")
		this.imageurl  = $("#imageurl");
		this.imagesize = $("#imagesize");
		this.count     = $("#count");
		this.rotation  = $("#rotation");
		this.duration  = $("#duration");
		this.closed    = false;
	},
	
	build: function() {
		
		var url       = this.imageurl.value
			imagesize = this.imagesize.value,
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
		
		if (this.closed) addClass(document.body, "closed");
		else removeClass(document.body, "closed");
		
		this.output.innerHTML = open + close;
		this.setParams();
		
	},
	
	controls: function() {
		
		var that = this;
		
		this.toggle.onclick = function() {
			toggleClass(document.body, "closed");
			if (that.closed == true) that.closed = false;
			else that.closed = true;
			that.setParams();
		};
		
		this.form.onsubmit = function() {
			that.build();
			event.preventDefault();
		}
		
		for(var i = 0; i < this.presets.length; i++) {
			this.presets[i].onclick = function() {
				that.imageurl.value = event.target.href;
				event.preventDefault();
			}
		}
		
	},
	
	getParams: function() {
		
		var pairs  = window.location.hash.replace("#","").split("&"),
			fields = ["imageurl", "imagesize", "count", "rotation", "duration"],
			params = {};
		
		for(var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split("=");
			params[pair[0]] = pair[1];
		}
		
		for(var i = 0; i < fields.length; i++) {
			if (params[fields[i]]) this[fields[i]].value = params[fields[i]];
		}
		
		if (params["closed"] == "true") this.closed = true;
		else this.closed = false;

	},
	
	setParams: function() {
		
		var paramStr = "",
			params = [
				{ key: "imageurl",  val: this.imageurl.value },
				{ key: "imagesize", val: this.imagesize.value },
				{ key: "count",     val: this.count.value },
				{ key: "rotation",  val: this.rotation.value },
				{ key: "duration",  val: this.duration.value },
				{ key: "closed",    val: this.closed }
			];
		
		for(var i = 0; i < params.length; i++) {
			if (i > 0 ) paramStr += "&";
			paramStr += params[i].key + "=" + params[i].val;
		}
		
		window.location.hash = paramStr;

	},
	
};