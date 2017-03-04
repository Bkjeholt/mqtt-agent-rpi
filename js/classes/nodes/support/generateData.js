/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-04
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-sysinfo/js/classes/nodes/support/generateData.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

exports.presentNodeData = function (nodeInfo,callback) {

    var deviceIndex;
    var variableIndex;
    
    for (deviceIndex = 0; deviceIndex < nodeInfo.devices.length; deviceIndex = deviceIndex + 1) {
        if (nodeInfo.devices[deviceIndex].func !== undefined) {
            (nodeInfo.devices[deviceIndex].func)(function(err,result) {
                        var variableIndex;
                        
                        if (!err) {
                            if (nodeInfo.devices[deviceIndex].datatype !== undefined) {
                                callback(   null,
                                            { order: "data_present",
                                              node: nodeInfo.name,
                                              device: nodeInfo.devices[deviceIndex].name },
                                            { time: Math.floor((new Date())/1000),
                                              date: new Date(),
                                              data: result } );
                            }
                            
                            for (variableIndex = 0; variableIndex < nodeInfo.devices[deviceIndex].variables.length; variableIndex = variableIndex + 1) {
                                (nodeInfo.devices[deviceIndex].variables[variableIndex].func)(result,function(err,result) {
                                            if (!err) {
                                                callback(   null,
                                                            { order: "data_present",
                                                              node: nodeInfo.name,
                                                              device: nodeInfo.devices[deviceIndex].name,
                                                              variable: nodeInfo.devices[deviceIndex].variables[variableIndex].name },
                                                            { time: Math.floor((new Date())/1000),
                                                              date: new Date(),
                                                              data: result } );
                                                
                                            }
                                });
                            }
                        }
            });
            
        } else {
            for (variableIndex = 0; variableIndex < nodeInfo.devices[deviceIndex].variables.length; variableIndex = variableIndex + 1) {
                (nodeInfo.devices[deviceIndex].variables[variableIndex].func)(undefined,function(err,result) {
                            if (!err) {
                                callback(   null,
                                            { order: "data_present",
                                              node: nodeInfo.name,
                                              device: nodeInfo.devices[deviceIndex].name,
                                              variable: nodeInfo.devices[deviceIndex].variables[variableIndex].name },
                                            { time: Math.floor((new Date())/1000),
                                              date: new Date(),
                                              data: result } );
                                                
                            }
                        });
            }
        }        
    }
};
    