// Next.js global styles
import '../src/styles/global.scss';
import '../src/styles/storybook.scss';

export const parameters = {
  options: {
    storySort: (a, b) => {
      // Introduction Story at the top
      if (b[1].kind === 'Example/Introduction') {
        return 1;
      }

      // Sort stories by ID
      // https://github.com/storybookjs/storybook/issues/548#issuecomment-530305279
      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, { numeric: true });
    },
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
};
