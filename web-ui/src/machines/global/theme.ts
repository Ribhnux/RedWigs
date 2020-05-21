import { createMachine, assign, interpret, send } from "xstate";
import { Scheme } from "~types/themes";

export type ThemeSchemeContext = {
  theme: Scheme;
};

export type ThemeSchemeState = {
  value: "active";
  context: ThemeSchemeContext;
};

export type ThemeSettingsEvent =
  | { type: "SWITCH"; context: ThemeSchemeContext }
  | { type: "ROLLBACK"; context: ThemeSchemeContext };

const themeSchemeMachine = createMachine<
  ThemeSchemeContext,
  ThemeSettingsEvent,
  ThemeSchemeState
>({
  id: "themeScheme",
  initial: "active",
  context: { theme: Scheme.Oceanic },
  states: {
    active: {
      on: {
        SWITCH: {
          actions: assign({
            theme: (context, event) => event.context.theme,
          }),
        },
      },
    },
  },
});

export const themeService = interpret(themeSchemeMachine).start();
