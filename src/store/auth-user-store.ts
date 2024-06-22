import { TAuthBasicUserInfo } from "@/schemas/user";
import { IS_CLIENT } from "@/utils/constants";
import { proxy } from "valtio";

import { devtools } from "valtio/utils";

export type TUserStore = {
  user: TAuthBasicUserInfo | null;
  status: "pending" | "loggedOut" | "loggedIn";
};

const initialState: TUserStore = {
  user: null,
  status: "pending",
};

export const userStore = proxy<TUserStore>(initialState);

export const userActions = {
  setUser(user: TAuthBasicUserInfo | null) {
    userStore.user = user;
    userStore.status = user ? "loggedIn" : "loggedOut";
  },
};

devtools(userStore, {
  name: "user",
  enabled: IS_CLIENT,
});
