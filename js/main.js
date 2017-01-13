/************************************************************************
 Product    : Home information and control
 Date       : 2016-05-25
 Copyright  : Copyright (C) 2016 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 -------------------------------------------------------------------------
 File       : MqttAgentRPi/main.js
 Version    : 0.1.1
 Author     : Bjorn Kjeholt
 *************************************************************************/

var agent = require('./agentBody');
// var agent = require('./AgentClass');

var agentObj = agent.create_AgentBody({ 
                                    agent: {
                                            name: process.env.npm_package_name,
                                            rev:  process.env.npm_package_version },
                                    mqtt: {
                                            ip_addr: (process.env.MQTT_IP_ADDR !== undefined)? process.env.MQTT_IP_ADDR : process.env.MQTT_PORT_1883_TCP_ADDR,
                                            port_no: (process.env.MQTT_PORT_NO !== undefined)? process.env.MQTT_PORT_NO : process.env.MQTT_PORT_1883_TCP_PORT,
                                            user:    (process.env.MQTT_USER !== undefined)? process.env.MQTT_USER : process.env.MQTT_ENV_MQTT_USER,
                                            passw:   (process.env.MQTT_PASSWORD !== undefined)? process.env.MQTT_PASSWORD : process.env.MQTT_ENV_MQTT_PASSWORD,
                                            connected: false,
                                            link: { 
                                                    status: 'down',
                                                    latest_status_time: (Math.floor((new Date())/1000)),
                                                    timeout: 120 } // seconds
                                          },
                                    node: {
                                            scan_node_data: 30000,
                                            scan_new_nodes: 300000 }
                                  });
var cnt= 0;

setInterval(function() {
    console.log("Status @ " + cnt + "sec. Mqtt link connected:" + agentObj.ci.mqtt.connected);
    cnt = cnt + 10;
},10000);
//abhObj.setup();
