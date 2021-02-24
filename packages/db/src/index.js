const { seedDB } = require('./db');
const { usage } = require('./utils');
const argv = require('minimist')(process.argv.slice(2));

// PARSE CLI ARGUMENTS
const { i, items, o, orders, m, mint, deploy, d, help, h } = argv;

const options = {
  orders: o || orders || 500,
  itemsRange: [0, items || i || 400],
  sourcefile: `${m || mint ? 'dvd_4412_mint' : 'dvd_8182'}.csv`,
  users: [
    {
      isAdmin: true,
      firstName: 'NEVSKII',
      lastName: 'ADMIN',
      email: 'admin@nevskii.net',
      password: 'abcdEFGH1',
      avatarUrl: 'https://i.ibb.co/419gFmq/nevskii-avatar.jpg',
    },
    {
      firstName: 'Sophia',
      lastName: 'Cappalo',
      email: 'scappalo@mail.com',
      birthDate: '1971-5-14',
      password: 'abcdEFGH1',
      avatarUrl: 'https://i.ibb.co/7C3LVGp/scappalo-avatar.jpg',
    },
    {
      firstName: 'David',
      lastName: 'Lunch',
      email: 'dlunch@mail.com',
      birthDate: '1946-1-21',
      gender: 'M',
      password: 'abcdEFGH1',
      avatarUrl: 'https://i.ibb.co/ByZLyf4/dlunch-avatar.jpg',
    },
    // https://i.ibb.co/wYLbznP/640px-Jean-Gabin-Casa-Filmului-Acin-no-572.jpg
  ],
  deploy: d || deploy ? true : false,
};

h || help ? usage() : seedDB(options);
