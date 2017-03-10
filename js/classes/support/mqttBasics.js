/************************************************************************
 Product    : Home information and control
 Date       : 2017-02-02
 Copyright  : Copyright (C) 2107 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : mqtt-agent-tellstick/js/Classes/support/mqttBasics.js
 Version    : 0.1.1
 Author     : Bjorn Kjeholt
 *************************************************************************/

exports.topicStrToJson = function (topicStr, msgStr, callback) {
        var t = str.split("/");
        var topicJson = {group: '---',
                         order: '---',
                         agent: '---',
                         node: '---',
                         device: '---',
                         variable: '---' };
        var msgJson = JSON.parse(msgStr);
        
        if (t.length > 1) {
            topicJson.group = t[0];
            topicJson.order = t[1];
        
            if (t[2] !== undefined) { 
                topicJson.agent = t[2];
        
                if (t[3] !== undefined) {
                    topicJson.node = t[3];
        
                    if (t[4] !== undefined) { 
                        topicJson.device = t[4];
        
                        if (t[5] !== undefined) 
                            topicJson.variable = t[5];
                    }
                }
            }
            
            
            callback(null,topicJson, msgJson);
        } else {
            // The topic doesn't contain the required 'group' and 'order' field, skip it!
        }
    };
    
exports.mqttPublishData = function(mqttObj, nodeObj, agentInfo) {        
    var topicHeaderArray = { data_present: "data/present/" };
       
    nodeObj.getNodeData(function(err,topicJson,msgJson) {
            var topicStr = null;
            var msgStr = "";
            
            switch (topicJson.order) {
                case "data_present":
                    topicStr = topicHeaderArray.data_present;
                    break;
                default:
                    break;
            }
                
            if ((!err) && 
                (topicStr !== null) && 
                (topicJson.node !== undefined) && 
                (topicJson.device !== undefined)) {

                topicStr = "data/present/" + agentInfo.name + "/" + topicJson.node + "/" + topicJson.device;
                    
                if (topicJson.variable !== undefined) {
                    // Create a variable message
                    topicStr = topicStr + "/" + topicJson.variable;
                }
                  
                msgStr = JSON.stringify(msgJson);
           
//            console.log("Publish: Topic="+topicStr+" Payload="+msgStr);
            
                mqttObj.publish(topicStr,msgStr,{ qos: 0, retain: 1 });
            } else {
//                console.log("AgentBody: Error from getNodeInfo. err=",err);
            }
        });
};

exports.mqttPublishInfo = function(mqttObj, nodeObj, agentInfo) {        
    var topicHeaderArray = { info_present: "info/present/",
                             data_present: "data/present/",
                             data_request: "data/request/" };
       
//    console.log("Publish topic: " + topicHeaderArray.info_present + agentInfo.name);
    
    mqttObj.publish( topicHeaderArray.info_present + agentInfo.name,
                     JSON.stringify({
                                        time: Math.floor((new Date())/1000),
                                        date: new Date(),
                                        name: agentInfo.name,
                                        rev: agentInfo.rev }),
                     { qos: 0, retain: 1 });
                                
    nodeObj.getNodeInfo(function(err,topicJson,msgJson) {
            var topicStr = null;
            var msgStr = "";
            
            switch (topicJson.order) {
                case "info_present":
                    topicStr = topicHeaderArray.info_present;
                    break;
                case "data_request":
                    topicStr = topicHeaderArray.data_request;
                    break;
                default:
                    break;
            }
                
            if ((!err) && (topicStr !== null)) {
                if (topicJson.node !== undefined) {
                    topicStr = topicStr + agentInfo.name + "/" + topicJson.node;
                    msgStr = JSON.stringify(msgJson);
                    
                    if (topicJson.device !== undefined) {
                        topicStr = topicStr + "/" + topicJson.device;
                    
                        if (topicJson.variable !== undefined) {
                            // Create a variable message
                            topicStr = topicStr + "/" + topicJson.variable;
                    
                        }
                    }
//                    console.log("Publish topic: " + topicStr);
                                        
                    mqttObj.publish(topicStr,msgStr,{ qos: 0, retain: 1 });
                }
            } else {
//                console.log("AgentBody: Error from getNodeInfo. err=",err);
            }
        });
};
