/************************************************************************
 Product    : Home information and control
 Date       : 2017-03-04
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-sysinfo/js/classes/nodes/support/generateInfo.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

exports.presentNodeInfo = function (nodeInfo,callback) {

    var deviceIndex;
    var varaibleIndex;
    
    callback(   null,
                { order: "info_present",
                  node: nodeInfo.name },
                { time: Math.floor((new Date())/1000),
                  date: new Date(),
                  name: nodeInfo.name,
                  rev: nodeInfo.rev,
                  type: nodeInfo.type });
            
    for (deviceIndex = 0; deviceIndex < nodeInfo.devices.length; deviceIndex = deviceIndex + 1) {
        if (nodeInfo.devices[deviceIndex].datatype !== undefined) {
            callback(   null,
                        { order: "info_present",
                          node: nodeInfo.name,
                          device: nodeInfo.devices[deviceIndex].name },
                        { time: Math.floor((new Date())/1000),
                          date: new Date(),
                          name: nodeInfo.devices[deviceIndex].name,
                          rev: nodeInfo.devices[deviceIndex].rev,
                          datatype: nodeInfo.devices[deviceIndex].datatype,
                          devicetype: nodeInfo.devices[deviceIndex].devicetype,
                          outvar: 1 });
            
        }
        
        for (variableIndex = 0; variableIndex < nodeInfo.devices[deviceIndex].variables.length; variableIndex = variableIndex + 1) {
            callback(   null,
                        { order: "info_present",
                          node: nodeInfo.name,
                          device: nodeInfo.devices[deviceIndex].name,
                          variable: nodeInfo.devices[deviceIndex].variables[variableIndex].name},
                        { time: Math.floor((new Date())/1000),
                          date: new Date(),
                          name: nodeInfo.devices[deviceIndex].variables[variableIndex].name,
                          rev: nodeInfo.devices[deviceIndex].variables[variableIndex].rev,
                          datatype: nodeInfo.devices[deviceIndex].variables[variableIndex].datatype,
                          devicetype: nodeInfo.devices[deviceIndex].variables[variableIndex].devicetype,
                          outvar: 1 });
            
        }
        
    }
};

