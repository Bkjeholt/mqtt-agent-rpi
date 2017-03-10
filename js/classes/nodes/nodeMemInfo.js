/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-04
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-sysinfo/js/classes/nodes/nodeMemInfo.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

var sysInfo = require('systeminformation');

var genData = require('./support/presentData');
var genInfo = require('./support/presentInfo');

var infoNode = {name: "MemoryInfo",
                rev: "0.1.0",
                type: "Memory information",
                devices: [
                    {
                        name: "PhysicalMemory",
                        rev: "0.1.0",
                        json: null,
                        func: function(callback) {
                                    sysInfo.mem(function(data) {
                                            callback(null,data);
                                        });
                                },  
                        variables: [{
                                        name: "total",
                                        dat: "int",
                                        det: "semistatic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.total !== undefined)
                                                    callback(null,Math.round(data.total/(1024*1024)));
                                            }
                                    },
                                    {
                                        name: "used",
                                        dat: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.used !== undefined)
                                                    callback(null,Math.round(data.used/(1024*1024)));
                                            }
                                    },
                                    {
                                        name: "free",
                                        dat: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.free !== undefined)
                                                    callback(null,Math.round(data.free/(1024*1024)));
                                            }
                                    }]
                    },
                    {
                        name: "SwapMemory",
                        rev: "0.1.0",
                        json: null,
                        func: function(callback) {
                                    sysInfo.mem(function(data) {
                                            callback(null,data);
                                        });
                                },  
                        variables: [{
                                        name: "total",
                                        dat: "int",
                                        det: "semistatic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swaptotal !== undefined)
                                                    callback(null,Math.round(data.swaptotal/(1024*1024)));
                                            }
                                    },
                                    {
                                        name: "used",
                                        dat: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swapused !== undefined)
                                                    callback(null,Math.round(data.swapused/(1024*1024)));
                                            }
                                    },
                                    {
                                        name: "free",
                                        dat: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swapfree !== undefined)
                                                    callback(null,Math.round(data.swapfree/(1024*1024)));
                                            }
                                    }]
                    }]
                };
                


var nodeMemInfo = function (ci) {

    var self = this;
    var configInfo = ci;
    
    this.getInfo = function (callback) {
        /*
         * Prepare and send node information
         */
        console.log("nodeMemInfo: ", infoNode);
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
        console.log("nodeMemInfo: create", infoNode);
    return new nodeMemInfo(ci);
};
