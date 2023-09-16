import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "./style.css";
import router from "./router";
import axios from "axios";
import Echo from "laravel-echo";
import PusherJs from "pusher-js";

const app = createApp(App);
app.use(router);
app.use(pinia);

const echoOptions = {
  broadcaster: "pusher",
  key: "local",
  logToConsole: true,
  wsHost: window.location.hostname,
  // authEndpoint: 'http://127.0.0.1:8000/api/broadcasting/auth',
  wsPort: 6001,
  wssPort: 6001,
  cluster: "mt1",
  forceTLS: false,
  encrypted: true,
  disableStats: true,
  enabledTransports: ["ws", "wss"],
  authorizer: (channel: any, _options: any) => {
    return {
      authorize: (socketId: any, callback: any) => {
        const uri = "http://bingo-core-backend.test/api/broadcasting/auth";

        const data = {
          socket_id: socketId,
          channel_name: channel.name,
        };
        const headers = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTc4MTUyODU1MjM5MWFjNzRlM2E1MjAwNWJjZGM4MDQxYzdkYWQxZTZhZWRiMDg3YzdiMDJmMDdiMjhkNWJmYzQ0MzI0ZTdjN2ZkYmRkMTEiLCJpYXQiOjE2OTQ4ODAzMjcuNTcwOTY5LCJuYmYiOjE2OTQ4ODAzMjcuNTcwOTcxLCJleHAiOjE3MjY1MDI3MjcuNTY1NjcyLCJzdWIiOiIxMDEiLCJzY29wZXMiOltdfQ.l0MtU6kvalnVEjm3sfz7KMEcsWfXPaErLBy2p5UeVIDS9tu68wv4H4Whh8aaPERlxnVBDEdnhEh2CCY3slZr18NR9ooRpD4ttLxirWYY46ltQdqhE2Pzt4gB9m8cxiSY2BF8IxFkJ8xUjInIKuwvw-J9KaYey6I5HqKcncjMsfYpEi8dZ9-VyeWlzV-4x-vTEwgkFc9GxdpGuMah8BXBZKNS09U3rRo9krHPuUwx8p2v9L0EIqRmBjlisGb7wTQITeGH6ATDnmt8JWDy7hPvsHGanNsmaeR7rpBLeGgXIUttOLMyaOS_AOHin0QIU1zI_vNqLA64JXXHEr1HJxLbJ0ZugVV4nhLfc9nAnK4P8T2DtRqojd_b38DPB0MTukfzyoCAJQtDwFfS5d5oz6ZnE_3QnHGyzS27WzLJBJAT54ZCMNd7h47oIEGYT6dVyCevFyaHit652eIfCaRXIE-Ajhp1Iy-WJlJPidy49k7M8R5CaL73D7A2JN7dDqej0FP_eVvWxoD-9_oStABxezz1gMVmUE7vDznknTU1y6DCS1Drg894VCtxcGKiqzDrjMM_S68X7a-E-LFCy42y0T21Ej8ypXHmsqC8iMtHEGmvFsNOQDY88dMScUSYC6cCIEjv6-93rPHJEQNKmiSt6DoFRoHxUoeffOjurhcNlpbOjP8`,
          },
        };

        axios
          .post(uri, data, headers)
          .then((response) => {
            callback(false, response.data);
          })
          .catch((error) => {
            callback(true, error);
          });
      },
    };
  },
};

window.Pusher = PusherJs;
window.Echo = new Echo(echoOptions);

app.mount("#app");
