#!/usr/bin/env node
const path = require('path');
const { copy : copyClipboard } = require('copy-paste');
const { exit } = require('process');
const args = process.argv.slice(2);


let reverse = false;
let copy = false;
let paths = [];


function displayHelp() {
    console.log(`
Usage: relative-path-tool [options] <fromPath> <toPath>

Options:
  -r, --reverse    Reverse the order of the paths
  -c, --copy       Copy the result to the clipboard
  -h, --help       Display this help message

Examples:
  relative-path-tool /path/to/first/file /path/to/second/file
  relative-path-tool -r /path/to/first/file /path/to/second/file
  relative-path-tool -c /path/to/first/file /path/to/second/file
    `);
    process.exit(0);
}


for (let arg of args) {
    switch (true){
        case arg === '-r' || arg === '--reverse':
            reverse = true;
            break;
        case arg === '-c' || arg === '--copy':
            copy = true;
            break;
        case arg === '-h' || arg === '--help':
            displayHelp();
            exit(0);
            break;
        default:
            paths.push(arg)
            break;
    }
}

if (paths.length !== 2) {
    console.error('You must provide exactly two paths.');
    displayHelp();
    process.exit(1);
}


if (reverse) paths = paths.reverse();


const [fromPath, toPath] = paths;
const relativePath = path.relative(path.dirname(fromPath), toPath);

console.log(relativePath);

if (copy) {
    copyClipboard(relativePath);
    console.log(`have written to clipboard for you`);
}