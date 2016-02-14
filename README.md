#regex-tail [![Build Status](https://travis-ci.org/se0kjun/regex-tail.svg?branch=master)](https://travis-ci.org/se0kjun/regex-tail)

##Install

	npm install -g regex-tail

##Usage

	Usage: regex-tail [options]

	Options:

	  -h, --help           output usage information
	  -V, --version        output the version number
	  -f, --file [value]   Add file path
	  -i, --interval <n>   Set interval (default: 1000ms)
	  -r, --regex [value]  Set regex
	  -c, --color <n>,<n>  Set color code (default: red and bgWhite)
	  -d, --delim [value]  Set delimeter (default: \n)

##Color table

[color table](https://github.com/medikoo/cli-color#xterm-colors-256-colors-table)

##Development

	git clone https://github.com/se0kjun/regex-tail.git
	cd ./regex-tail
	npm install
	npm link

##LICENSE

MIT © [Seokjun Hong](https://github.com/se0kjun)
