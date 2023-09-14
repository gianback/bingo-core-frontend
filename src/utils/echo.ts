import axios from 'axios'

import Echo from "laravel-echo"
import PusherJs from 'pusher-js'

window.Pusher = PusherJs;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'local',
    logToConsole: true,
    wsHost: window.location.hostname,
    // authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
    wsPort: 6001,
    wssPort: 6001,
    cluster: 'mt1',
    forceTLS: false,
    encrypted: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    auth: {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNjk0NjM4MDgzLCJleHAiOjE2OTQ2NDE2ODMsIm5iZiI6MTY5NDYzODA4MywianRpIjoiRTZaNFNjTG93YnZvSXFCNiIsInN1YiI6IjEiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.OetbAJGfrmd_egotYodsAZ8MhbTPJVMg8Svf1inm22s`,
        }
    },
    authorizer: (channel, options) => {
        // console.log({channel});
        // console.log({options});
        return {
            authorize: (socketId, callback) => {

                axios.post('http://127.0.0.1:8000/api/broadcasting/auth', {
                    socket_id: socketId,
                    channel_name: channel.name
                })
                .then(response => {

                    callback(false, response.data);

                })
                .catch(error => {
                    callback(true, error);
                });
            }
        };
    },
});

