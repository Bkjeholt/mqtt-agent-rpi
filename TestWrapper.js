/************************************************************************
 Product    : Home information and control
 Date       : 2017-02-15
 Copyright  : Copyright (C) 2017 Kjeholt Engineering. All rights reserved.
 Contact    : dev@kjeholt.se
 Url        : http://www-dev.kjeholt.se
 Licence    : ---
 -------------------------------------------------------------------------
 File       : mqtt-manager/js/TestWrapper.js
 Version    : 0.1.0
 Author     : Bjorn Kjeholt
 *************************************************************************/

    process.env.DOCKER_CONTAINER_NAME = "hic-agent-si";
    process.env.DOCKER_IMAGE_NAME = "mqtt-agent-sysinfo";
    process.env.DOCKER_IMAGE_TAG = "0.7.x";
    
    process.env.DEBUG = 1;
            
    process.env.MQTT_IP_ADDR = "192.168.1.10";
    process.env.MQTT_PORT_NO = "1883";
    process.env.MQTT_USER = "NA";
    process.env.MQTT_PASSWORD = "NA";

require("./js/main.js");
   