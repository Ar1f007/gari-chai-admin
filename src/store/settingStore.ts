import { proxy } from "valtio";

type ColorTheme = "dark" | "light";

type Settings = {
  theme: ColorTheme;
};

export const settingsStore = proxy<Settings>({
  theme: "light",
});

export const settingsActions = {
  updateTheme: (val: ColorTheme) => {
    settingsStore.theme = val;
  },
};
