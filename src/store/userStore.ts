import { defineStore } from "pinia";
import { ref } from "vue";

export interface Login {
  data: UserData;
  message: string;
  type: string;
  http_code: number;
  errors: any[];
}

interface UserData {
  id: number;
  name: string;
  token: string;
}

export const userStore = defineStore("user", () => {
  const user = ref<UserData>({
    id: 0,
    name: "",
    token: "",
  });
  let isAuth = ref(false);

  const setUser = (newUser: UserData) => {
    user.value = newUser;
  };
  const setIsAuth = (status: boolean) => {
    isAuth.value = status;
  };

  return { user, setUser, isAuth, setIsAuth };
});
