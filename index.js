var express = require('express');
var http = require('http');

var app = express();

var server = require('./core/server');
var config = require('./config');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

server(config);