#!/usr/bin/env node
var Tail = require('always-tail');
var fs = require('fs');
var clc = require('cli-color');

var filename = "/tmp/testlog";

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, '\n', {interval:1000});

tail.on('line', function(data) {
	var tail_reg = new RegExp("500", "g");
	var result;

	if((result = tail_reg.exec(data)) != null) {
		var colored_string = data.substring(result.index, tail_reg.lastIndex);

		console.log(result);
		console.log(tail_reg.lastIndex);
		console.log(
			data.substring(0, result.index) + 
			clc.red(colored_string) + 
			data.substring(tail_reg.lastIndex, data.length));
	} else {
		console.log(data);
	}
});

tail.watch();
