export const parameters = {
  options: {
    storySort: (a, b) => {
      // Sort stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
