#!/usr/bin/env node
'use strict';
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
var regex = program.regex || '';
var delim = program.delim || '\n';

if (!filename) {
	console.error('no select file');
	program.outputHelp();
	process.exit(1);
}

if (!fs.existsSync(filename)) {
	fs.writeFileSync(filename, '');
}

var tail = new Tail(filename, delim, {interval: interval});

tail.on('line', function (data) {
	var tailReg = new RegExp(regex, 'g');
	var prevCursor = 0;
	var result;

	if ((result = tailReg.exec(data))) {
		console.log(data);
	} else {
		var resultColoredString = '';
		do {
			var coloredString = data.substring(result.index, tailReg.lastIndex);

			resultColoredString +=
				(data.substring(prevCursor, result.index) + clc.red(coloredString));
			prevCursor = tailReg.lastIndex;
		} while ((result = tailReg.exec(data)) !== null);

		console.log(resultColoredString + data.substring(prevCursor, data.length));
	}
});

tail.watch();
