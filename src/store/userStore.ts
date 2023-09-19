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
  let isAuth = ref(
    !!JSON.parse(localStorage.getItem("isAuth") as string) || false
  );

  const setUser = (newUser: UserData) => {
    user.value = newUser;
  };
  const setIsAuth = (status: boolean) => {
    isAuth.value = status;
    localStorage.setItem("isAuth", JSON.stringify(status));
  };

  return { user, setUser, isAuth, setIsAuth };
});
