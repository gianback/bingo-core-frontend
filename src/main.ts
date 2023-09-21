import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "./style.css";
import router from "./router";
import axios from "axios";
import pusherJs from "pusher-js";
import Echo from "laravel-echo";
import { AxiosInterceptor } from "./interceptors/axios.interceptor";
import { baseApi } from "./utils/axios";

const app = createApp(App);
app.use(router);
app.use(pinia);

AxiosInterceptor();

// const echoOptions = {
//   broadcaster: "pusher",
//   key: "local",
//   logToConsole: true,
//   wsHost: window.location.hostname,
//   // authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
//   wsPort: 6001,
//   wssPort: 6001,
//   cluster: "mt1",
//   forceTLS: false,
//   encrypted: true,
//   disableStats: true,
//   enabledTransports: ["ws", "wss"],
//   authorizer: (channel: any, _options: any) => {
//     return {
//       authorize: (socketId: any, callback: any) => {
//         // const uri = "http://bingo-core-backend.test/api/broadcasting/auth";
//         const uri = `${process.env.URL_BACKEND}/api/broadcasting/auth`;

//         const data = {
//           socket_id: socketId,
//           channel_name: channel.name,
//         };
//         // const headers = {
//         //   headers: {
//         //     Accept: "application/json",
//         //     "Content-Type": "application/json",
//         //     Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMDVlNTcyZTEwYmU2MWEzMzllYWRjNmFjMDQ4YzNmNjM5NjgyNDkxNWVmMmFhYjA0YzcyOTNlNGEzNmNkZmY2MjhlNThlM2Y2YzAxNjlkMWYiLCJpYXQiOjE2OTQ5MDE4NzEuOTM4Nzg0LCJuYmYiOjE2OTQ5MDE4NzEuOTM4Nzg3LCJleHAiOjE3MjY1MjQyNzEuODUxNzE1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.FUWbsgGKEjMweQISv3slIth-a1E--rjLG6CquMbDqKxOfP6LtMNfT1wo5V6THBqLAO_BDcZ1BYN9EfjMmMWBrVoLQRNl5rwLnNHVuykwDXzioWOIRf8O0S5DVsRHmFGyV2lmHIvz_CnQnuIhSVmzzjC_JUK4e22WjNI8xhB0VpgMFbYcWa-vqiLhXKTdWO55ln40HxOYmG27rc_Oq9pmu6qQqlYI1BzO2h2hgvmqrOV6-VYVtnIKyUyc1kscUFrcUYk4QkckCVQ5gTdINCh08ysyQqiOwSQ-9wmI9iePGwFKjDwSIFpC32HXB4XfNq7SWbxZ_40h7qMIG_GuUe4KjQGypvh7_Ua4P2hovkvmogmrK4_G-sye45jLsVXFF7U6LzKax3hRQzhT3cywq5uQ5zXVeCCAAktSnhZtKs8Nr1ahkVHxDWDI3grXUbcQ5YSZJzLRnCCgHSH1C3LxfkDFYwr9rHkNk3S-XG5iOYwrh3-2cLO9bLOs4wUVv6hVRYeCyasswfMHm1rwrSV9DtSoqWsBzuAbjWeMRFC9hyZqdwi0SFRNFjmPGPhoQ2OMwnbaQcY8BbXG4D1Lg34EKTsyEpFbCgmu6a9PXHZ30_oHhCmJXsjHwllrG4gTD12Ox8m6ZJ6Ay1NNa87gN4WL87J9kDiJUaOhqq3aZ-3e5eh0xts`,
//         //   },
//         // };
//         baseApi
//           .post(uri, data)
//           .then((response) => {
//             callback(false, response.data);
//           })
//           .catch((error) => {
//             callback(true, error);
//           });
//         // axios
//         //   .post(uri, data, headers)
//         //   .then((response) => {
//         //     callback(false, response.data);
//         //   })
//         //
//       },
//     };
//   },
// };

// window.Pusher = pusherJs;
// window.Echo = new Echo(echoOptions);

app.mount("#app");
