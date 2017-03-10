/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-04
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-sysinfo/js/classes/nodes/nodeNetwork.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

// var sysInfo = require('systeminformation');
var network = require('network');

var genData = require('./support/presentData');
var genInfo = require('./support/presentInfo');

var infoNode = {name: "NetworkInfo",
                rev: "0.1.0",
                type: "Network information",
                devices: [
                    {   name: "Public-IP-addr",
                        rev: "0.1.0",
                        dat: "text",
                        det: "semistatic",
                        outdata: 1,
                        value: null,
                        email: { changes: true,
                                 initial: true },
                        func: function(callback) {
                                network.get_public_ip(function(err, ip) {
                                         callback(err,ip);
                                    });
                            },
                        variables: []
                    }]
                };
                


var nodeNetworkInfo = function (ci) {

    var self = this;
    var configInfo = ci;
    
    this.getInfo = function (callback) {
        /*
         * Prepare and send node information
         */
        genInfo.presentNodeInfo(infoNode,function(err,orderJson,bodyJson) {
            callback(err,orderJson,bodyJson);
        });
    };
    
    this.getData = function (callback) {
        genData.presentNodeData(infoNode,function(err,orderJson,bodyJson) {
            callback(err,orderJson,bodyJson);
        });
    };
};

exports.create = function(ci){
    return new nodeNetworkInfo(ci);
};
