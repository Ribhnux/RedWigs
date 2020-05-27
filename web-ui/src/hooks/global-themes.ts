import { useService } from "@xstate/react";
import { themeService } from "machines/global/theme";
import { Scheme, ThemeSchemeColors, ThemeSchemeColorKeys } from "~types/themes";

const useGlobalThemeScheme = (): [
  Scheme,
  ThemeSchemeColors,
  (scheme: Scheme) => void
] => {
  const [themeState, send] = useService(themeService);
  const schemeColors: ThemeSchemeColors = Object.assign(
    {},
    ...Object.keys(ThemeSchemeColorKeys).map((key) => ({
      [key]: `${themeState.context.theme}.${key}`,
    }))
  );

  const scheme = themeState.context.theme;
  const setScheme = (scheme: Scheme) =>
    send({ type: "SWITCH", context: { theme: scheme } });

  return [scheme, schemeColors, setScheme];
};

export default useGlobalThemeScheme;
