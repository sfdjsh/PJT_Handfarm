import React from 'react';
import ReactDOM from 'react-dom';
import {
    MqttConnection,
    MqttComponent,
    Button
} from 'react-mqtt-controls';

const Mqtt2 = () => {

    return (
        <MqttConnection config={{url: '54.180.201.1'}}>
            <MqttComponent
                component={Button}
                topic="/ssafy/c101/temp"
                componentProps={{
                    value: "hello"
                }}

                publishOptions={{
                    qos: 0,
                    retain: true
                }}

                noRBE
            >
                Button Text
            </MqttComponent>
        </MqttConnection>
    );
};

export default Mqtt2;