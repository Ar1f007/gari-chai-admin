"use client";
import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";
import { settingsActions } from "@/store";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage<"light" | "dark">(
    "color-theme",
    "light"
  );

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    colorMode === "dark"
      ? bodyClass.add(className)
      : bodyClass.remove(className);

    settingsActions.updateTheme(colorMode);
  }, [colorMode]);

  return [colorMode, setColorMode];
};

export default useColorMode;
