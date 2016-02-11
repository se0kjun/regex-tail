#!/usr/bin/env node
var Tail = require('always-tail');
var fs = require('fs');
var clc = require('cli-color');
var program = require('commander');

program
	.version('0.0.1')
	.option('-f, --file [value]', 'Add file path')
	.option('-i, --interval <n>', 'Set interval')
	.option('-r, --regex [value]', 'Set regex')
	.option('-d, --delim [value]', 'Set delimeter')
	.parse(process.argv);

var filename = program.file;
var interval = program.interval || 1000;
var regex = program.regex || "";
var delim = program.delim || "\n";

if (!filename) {
	console.error("no select file");
	program.outputHelp();
	process.exit(1);
}

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

var tail = new Tail(filename, delim, {interval:interval});

tail.on('line', function(data) {
	var tail_reg = new RegExp(regex, "g");
	var result;

	if((result = tail_reg.exec(data)) != null) {
		var colored_string = data.substring(result.index, tail_reg.lastIndex);

		console.log(
			data.substring(0, result.index) + 
			clc.red(colored_string) + 
			data.substring(tail_reg.lastIndex, data.length));
	} else {
		console.log(data);
	}
});


tail.watch();
