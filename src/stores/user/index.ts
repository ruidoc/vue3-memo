import { defineStore } from "pinia";
import type { UserType } from "./types";
import { ImitateHttp, localSetItem, localGetItem } from "@/utils";

const userStore = defineStore("user", {
  state: () => ({
    userInfo: null as UserType | null,
  }),
  actions: {
    login(form: UserType) {
      let user: UserType | null = localGetItem("regis_user");
      return ImitateHttp((s, f) => {
        if (!user) {
          f("用户未注册");
        } else {
          if (user.phone == form.phone && user.password == form.password) {
            user.login_at = +new Date();
            this.setUser(user);
            s("登录成功");
          } else {
            s("手机号或密码错误");
          }
        }
      });
    },
    register(form: UserType) {
      return ImitateHttp((s, f) => {
        form.user_id = parseInt(form.phone.slice(-4));
        localSetItem("regis_user", form);
        s("ok");
      });
    },
    setUser(user: UserType) {
      localSetItem("login_user", user);
      this.userInfo = user;
    },
    getUser() {
      let data = localGetItem("login_user");
      if (data) {
        this.userInfo = data;
      }
    },
    logout() {
      localStorage.removeItem("login_user");
      this.userInfo = null;
    },
  },
});

export default userStore;
