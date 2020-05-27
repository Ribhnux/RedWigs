import { ColorHues } from "@chakra-ui/core";

export enum Scheme {
  ArkDark = "arkDark",
  Darker = "darker",
  DeepOcean = "deepOcean",
  Dracula = "dracula",
  Github = "github",
  Lighter = "lighter",
  LightOwl = "lightOwl",
  MonokaiPro = "monokaiPro",
  NightOwl = "nightOwl",
  Oceanic = "oceanic",
  OneDark = "oneDark",
  OneLight = "oneLight",
  Palenight = "palenight",
  SolarizedDark = "solarizedDark",
  SolarizedLight = "solarizedLight",
}

export const ThemeSchemeColorKeys: ThemeSchemeColors = {
  background: "background",
  foreground: "foreground",
  text: "text",
  selectionBackground: "selectionBackground",
  selectionForeground: "selectionForeground",
  buttons: "buttons",
  secondBackground: "secondBackground",
  disabled: "disabled",
  contrast: "contrast",
  active: "active",
  border: "border",
  highlight: "highlight",
  tree: "tree",
  notifications: "notifications",
  accentColor: "accentColor",
  excludedFilesColor: "excludedFilesColor",
  commentsColor: "commentsColor",
  linksColor: "linksColor",
  functionsColor: "functionsColor",
  keywordsColor: "keywordsColor",
  tagsColor: "tagsColor",
  stringsColor: "stringsColor",
  operatorsColor: "operatorsColor",
  attributesColor: "attributesColor",
  numbersColor: "numbersColor",
  parametersColor: "parametersColor",
};

export type ColorHuesCustom = ColorHues & { 0: string };

export type ThemeSchemeColors = {
  background: string;
  foreground: string;
  text: string;
  selectionBackground: string;
  selectionForeground: string;
  buttons: string;
  secondBackground: string;
  disabled: string;
  contrast: string;
  active: string;
  border: string;
  highlight: string;
  tree: string;
  notifications: string;
  accentColor: string;
  excludedFilesColor: string;
  commentsColor: string;
  linksColor: string;
  functionsColor: string;
  keywordsColor: string;
  tagsColor: string;
  stringsColor: string;
  operatorsColor: string;
  attributesColor: string;
  numbersColor: string;
  parametersColor: string;

  _background?: ColorHuesCustom;
  _foreground?: ColorHuesCustom;
  _text?: ColorHuesCustom;
  _selectionBackground?: ColorHuesCustom;
  _selectionForeground?: ColorHuesCustom;
  _buttons?: ColorHuesCustom;
  _secondBackground?: ColorHuesCustom;
  _disabled?: ColorHuesCustom;
  _contrast?: ColorHuesCustom;
  _active?: ColorHuesCustom;
  _border?: ColorHuesCustom;
  _highlight?: ColorHuesCustom;
  _tree?: ColorHuesCustom;
  _notifications?: ColorHuesCustom;
  _accentColor?: ColorHuesCustom;
  _excludedFilesColor?: ColorHuesCustom;
  _commentsColor?: ColorHuesCustom;
  _linksColor?: ColorHuesCustom;
  _functionsColor?: ColorHuesCustom;
  _keywordsColor?: ColorHuesCustom;
  _tagsColor?: ColorHuesCustom;
  _stringsColor?: ColorHuesCustom;
  _operatorsColor?: ColorHuesCustom;
  _attributesColor?: ColorHuesCustom;
  _numbersColor?: ColorHuesCustom;
  _parametersColor?: ColorHuesCustom;
};
