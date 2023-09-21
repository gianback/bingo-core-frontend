import { defineStore } from "pinia";
import { ref } from "vue";

export interface UserData {
  id: number;
  name: string;
  token: string;
}
type userStore = Pick<UserData, "id" | "name">;

export const userStore = defineStore("user", () => {
  const user = ref<userStore>(
    JSON.parse(localStorage.getItem("user") as string) || {
      id: 0,
      name: "",
    },
  );
  let isAuth = ref(
    !!JSON.parse(localStorage.getItem("isAuth") as string) || false,
  );

  const setUser = (newUser: userStore) => {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  };
  const setIsAuth = (status: boolean) => {
    isAuth.value = status;
    localStorage.setItem("isAuth", JSON.stringify(status));
  };

  return { user, setUser, isAuth, setIsAuth };
});
