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
                                        data: "int",
                                        det: "semistatic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.total !== undefined)
                                                    callback(null,data.total);
                                                    }
                                    },
                                    {
                                        name: "used",
                                        data: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.used !== undefined)
                                                    callback(null,data.used);
                                            }
                                    },
                                    {
                                        name: "free",
                                        data: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.free !== undefined)
                                                    callback(null,data.free);
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
                                        data: "int",
                                        det: "semistatic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swaptotal !== undefined)
                                                    callback(null,data.swaptotal);
                                                    }
                                    },
                                    {
                                        name: "used",
                                        data: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swapused !== undefined)
                                                    callback(null,data.swapused);
                                            }
                                    },
                                    {
                                        name: "free",
                                        data: "int",
                                        det: "dynamic",
                                        value: null,
                                        func: function(data,callback) {
                                                if (data.swapfree !== undefined)
                                                    callback(null,data.swapfree);
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
    return new nodeMemInfo(ci);
};
