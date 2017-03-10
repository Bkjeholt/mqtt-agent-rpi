/************************************************************************
 Product    : Home information and control
 Date       : 2016-05-25
 Copyright  : Copyright (C) 2016 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 ---------------------------------------------------------
 File       : MqttAgentRPi/agentBody.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

var mqtt = require('mqtt');
//var nodeHandler = require('./nodeHandler');
var nodeHandler = require('./nodes/nodes');
var mqttSupport = require('./support/mqttBasics');

var agentBody = function(ci) {
    var self = this;
    this.ci = ci;

    this.mqttConnected = false;
    this.gateWayReady = false;
    
    console.log("MQTT connect :");

    this.mqttSubscribe = function() {
        var subscriptions = ["info/request/" + self.ci.agent.name + "",
                             "info/request/" + self.ci.agent.name + "/#",
                             "data/response/" + self.ci.agent.name + "/#",
                             "status/alive/" + self.ci.agent.name + ""];
        var i = 0;
        
        for (i=0; i < subscriptions.length; i=i+1) {
            console.log("MQTT subscribe: ", subscriptions[i]);
            self.mqttClient.subscribe(subscriptions[i]);
        }

    };
 

    this.mqttConnect = function(connack) {
//        console.log("MQTT connected :",connack);
        self.mqttConnected = true;
        self.ci.mqtt.connected = true;
        self.mqttSubscribe();
        mqttSupport.mqttPublishInfo(self.mqttClient,
                                    self.nodeClient,
                                    { name: self.ci.agent.name,     // Agent name
                                      rev: self.ci.agent.rev });    // Agent rev
    };
    
    this.mqttMessage = function(topicStr, messageStr, packet) {

        mqttSupport.topicStrToJson(topicStr, messageStr, function(err,topic,payload) {
                var utc = Math.floor((new Date())/1000);
                
                switch (topic.group) {
                    case 'data':
                        break;
                    case 'info':
                        switch (topic.order) {
                            case 'request':
                                mqttSupport.mqttPublishInfo(self.mqttClient,
                                                            self.nodeClient,
                                                            { name: self.ci.agent.name,     // Agent name
                                                              rev: self.ci.agent.rev });    // Agent rev
                                break;
                            default:
                                break;
                        };
                        break;
                    default:
                        break;
                };
            });
    };

    this.mqttDisconnect = function () {
        self.mqttConnected = false;
        self.ci.mqtt.connected = false;
        
    };
    
    this.mqttError = function (error) {
        self.mqttConnected = false;
        self.ci.mqtt.connected = false;
        console.log("MQTT Error = ",error);
    };
    
    (function setup (ci) {
        (function mqttSetup (ci) {
            self.mqttClient = mqtt.connect("mqtt://"+ci.mqtt.ip_addr,
                                           { connectTimeout: 5000 });
//console.log(self.mqttClient);
            self.mqttClient.on('close',(self.mqttDisconnect));
            self.mqttClient.on('connect',(self.mqttConnect));
            self.mqttClient.on('error',(self.mqttError));
            self.mqttClient.on('message',(self.mqttMessage));
        }(ci));
        
        (function nodeSetup (ci) {
            self.nodeClient = nodeHandler.create(ci); 
                        
        })(ci);    
    })(this.ci);
    
    console.log("Start timers");
    
    setInterval(function () {
                    
                    var currTime = Math.floor((new Date())/1000);

  //                  console.log("Intervall scan data from " + self.nodeClient.nodeInfoList.length + " nodes");

                    if (true) {
                        
                        if (self.ci.mqtt.connected) {
                            mqttSupport.mqttPublishData(
                                    self.mqttClient,
                                    self.nodeClient,
                                    { name: self.ci.agent.name,     // Agent name
                                      rev: self.ci.agent.rev });
                                                        
                         

                            /*
                             * Scan for new devices
                             */
                            
//                            self.publishInfo({},{});                        
                        }
                    }
                },ci.node.scan_node_data);
                    
    setInterval(function () {
//        console.log("Check to see if the mqtt brooker is connected", self.mqttConnected);
                        if (!self.mqttConnected) {
                            console.log("MQTT broker connection is down. Connect ...");
                            self.mqttClient = mqtt.connect("mqtt://"+ci.mqtt.ip_addr,
                                                           { connectTimeout: 5000 });

                        }
                        
                    },10000);

};

exports.create = function (ci) {
    return new agentBody(ci);
};




