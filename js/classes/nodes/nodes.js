/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-03
 Copyright  : Copyright (C) 2016-2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : MqttAgentRPi/nodes.js
 Version    : 0.4.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

// var owfsClient = require('owfs').Client;
/*
var fs = require('fs');
var spawn = require("child_process").spawn;
var cpuLoad = require('cpu-load');
var network = require('network');
var sysInfo = require('systeminformation');
*/
// var vcgencmd = require('vcgencmd');

var nodeMemInfo = require('./nodeMemInfo');
var nodeNetwork = require('./nodeNetwork');

var nodes = function (ci) {
    var self = this;
    
    this.ci = ci;

    this.getNodeData = function (callback) {
        if (self.objNodeMem !== undefined)
            self.objNodeMem.getData(function(err,headerJson,bodyJson) {
                callback(err,headerJson,bodyJson);
            });
        
        if (self.objNodeNetwork !== undefined)
            self.objNodeNetwork.getData(function(err,headerJson,bodyJson) {
                callback(err,headerJson,bodyJson);
            });
    };

    this.getNodeInfo = function (callback) {
        if (self.objNodeMem !== undefined)
            self.objNodeMem.getInfo(function(err,headerJson,bodyJson) {
                callback(err,headerJson,bodyJson);
            });
        
        if (self.objNodeNetwork !== undefined)
            self.objNodeNetwork.getInfo(function(err,headerJson,bodyJson) {
                callback(err,headerJson,bodyJson);
            });
    };

    (function setup(ci) {
        this.objNodeMem = nodeMemInfo.create(self.ci);
        this.objNodeNetwork = nodeNetwork.create(self.ci);
    })(self.ci);

};

exports.create = function(ci){
    return new nodes(ci);
};

