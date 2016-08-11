
DateFormat = (function () {
	var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
	var DEFAULT_PATTERN = "yyyy-MM-dd";
	function padding(s, len) {
		var len = len - (s + "").length;
		for (var i = 0; i < len; i++) {
			s = "0" + s;
		}
		return s;
	}
	return ({format:function (date, pattern) {
		pattern = pattern || DEFAULT_PATTERN;
		return pattern.replace(SIGN_REGEXP, function ($0) {
			switch ($0.charAt(0)) {
			  case "y":
				return padding(date.getFullYear(), $0.length);
			  case "M":
				return padding(date.getMonth() + 1, $0.length);
			  case "d":
				return padding(date.getDate(), $0.length);
			  case "w":
				return date.getDay() + 1;
			  case "h":
				return padding(date.getHours(), $0.length);
			  case "m":
				return padding(date.getMinutes(), $0.length);
			  case "s":
				return padding(date.getSeconds(), $0.length);
			}
		});
	}, parse:function (dateString, pattern) {
		var matchs1 = pattern.match(SIGN_REGEXP);
		var matchs2 = dateString.match(/(\d)+/g);
		if (matchs1.length == matchs2.length) {
			var _date = new Date(1970, 0, 1);
			for (var i = 0; i < matchs1.length; i++) {
				var _int = parseInt(matchs2[i]);
				var sign = matchs1[i];
				switch (sign.charAt(0)) {
				  case "y":
					_date.setFullYear(_int);
					break;
				  case "M":
					_date.setMonth(_int - 1);
					break;
				  case "d":
					_date.setDate(_int);
					break;
				  case "h":
					_date.setHours(_int);
					break;
				  case "m":
					_date.setMinutes(_int);
					break;
				  case "s":
					_date.setSeconds(_int);
					break;
				}
			}
			return _date;
		}
		return null;
	}});
})();
Date.prototype.format = function (format) {
	var d = new Array("\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d");
	var E = d[this.getDay()];
	var o = {"E":E, "M+":this.getMonth() + 1, "d+":this.getDate(), "H+":this.getHours(), "m+":this.getMinutes(), "s+":this.getSeconds(), "q+":Math.floor((this.getMonth() + 3) / 3), "S":this.getMilliseconds()};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
};