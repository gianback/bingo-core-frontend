import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
const pinia = createPinia();
import "./style.css";
import router from "./router";

const app = createApp(App);
app.use(router);
app.use(pinia);

app.mount("#app");
