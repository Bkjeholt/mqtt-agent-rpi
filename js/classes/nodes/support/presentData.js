/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-04
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-sysinfo/js/classes/nodes/support/presentData.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

var variableLoop = function (nodeName, devObj, data, callback) {
    if (devObj.variables !== undefined) {
        (function varLoop(data,varIndex) {
                var varObj = null;
                if (varIndex > 0) {
                    varObj = devObj.variables[varIndex-1];
                    if (varObj.func !== undefined) {
                        (varObj.func)(data, function(err,result) {
                            if (!err) {
                                if ((varObj.det === "dynamic") ||
                                    (varObj.value === null) ||
                                    (result !== varObj.value)) {
                                
                                    varObj.value = result;
                                    
                                    // Publish data
                                    console.log ("Publish variable data",result);
                        
                                    callback(null,
                                             { order: "data_present",
                                               node: nodeName,
                                               device: devObj.name,
                                               variable: varObj.name },
                                             { time: Math.floor((new Date())/1000),
                                               date: new Date(),
                                               data: result } );
                                }
                                varLoop(data,varIndex-1, callback);
                            }
                        });
                    }
                } else {
                }
            })(data, devObj.variables.length);
    } else {
        // No variables defined for this device
        callback(null);
    }
};

exports.presentNodeData = function (nodeInfo,callback) {

    (function deviceLoop(deviceIndex) {
        var devObj = null;
        if (deviceIndex > 0) {
            devObj = nodeInfo.devices[deviceIndex-1];
            
            if (devObj.func !== undefined) {
                (devObj.func)(function(err,result) {
                        if (devObj.dat !== undefined) {
                            
                            if ((devObj.det === "dynamic") ||
                                (devObj.value === null) ||
                                (result !== devObj.value)) {
                            
                                devObj.value = result;
                                
                                // Publish data
                                console.log ("Publish device data",result);
                        
                                callback(   null,
                                            { order: "data_present",
                                              node: nodeInfo.name,
                                              device: devObj.name },
                                            { time: Math.floor((new Date())/1000),
                                              date: new Date(),
                                              data: result } );
                            }
                        }
                        
                        variableLoop(nodeInfo.name,devObj,result, callback);
                    });
            } else {
                variableLoop(nodeInfo.name,devObj,null, callback);
            }
            
            deviceLoop(deviceIndex - 1);
        }
    })(nodeInfo.devices.length);
    
};
    