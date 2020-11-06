const { seedDB } = require('./db');
const argv = require('minimist')(process.argv.slice(2));
const { i, items, o, orders, m, mint, deploy, d } = argv;

const options = {
  orders: o || orders || 500,
  itemsRange: [0, items || i || 400],
  sourcefile: `${m || mint ? 'dvd_4412_mint' : 'dvd_8182'}.csv`,
  users: [
    {
      userType: 1, // admin
      firstName: 'NEVSKII',
      lastName: 'ADMIN',
      email: 'admin@nevskii.net',
    },
    {
      firstName: 'Sophia',
      lastName: 'Cappalo',
      email: 'scappalo@mail.com',
      birthDate: '1971-5-14',
    },
    {
      name: 'David Lunch',
      email: 'dlunch@mail.com',
      birthDate: '1946-1-21',
      gender: 'M',
    },
  ],
  deploy: d || deploy ? true : false,
};

seedDB(options);
