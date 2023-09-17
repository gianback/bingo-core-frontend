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

  const setUser = (newUser: UserData) => {
    user.value = newUser;
  };

  return { user, setUser };
});
