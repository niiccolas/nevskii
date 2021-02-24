const { resolve } = require('path');
const csv = require('csvtojson');
const Spinnies = require('spinnies');
const { bold } = require('chalk');

/**
 * Return array-like position of string in Set
 * @param {Set} set
 * @param {string} string
 */
const getIdIndex = (set, string) =>
  string ? Array.from(set).indexOf(string) : null;

/**
 * Return PostgreSQL-friendly equivalent of given French month
 * @param {string} month
 */
const parseMonthFR = month => {
  const MONTHS_FR = {
    janvier: 'jan',
    février: 'feb',
    mars: 'mar',
    avril: 'apr',
    mai: 'may',
    juin: 'jun',
    juillet: 'jul',
    aout: 'aug',
    août: 'aug',
    septembre: 'sep',
    octobre: 'oct',
    novembre: 'nov',
    décembre: 'dec',
  };

  return month.replace(/[a-zéû]+/, MONTHS_FR[month.split(' ')[1]]);
};

/**
 * Return singular equivalent of given table name for use as primary ID name
 * @param {string} tableName
 * @returns {string}
 */
const generateIdName = tableName => {
  switch (tableName.slice(-3)) {
    case 'ies':
      return 'id_' + tableName.slice(0, -3) + 'y';
    case 'ses':
      return 'id_' + tableName.slice(0, -2);
    default:
      return 'id_' + tableName.slice(0, -1);
  }
};

/**

 * Parse CSV to an array of JSON objects
 * @param {string} sourceFile
 */
const parseCSV = async sourcefile => {
  const csvFilepath = resolve(__dirname, '../assets/csv/', sourcefile);

  return await csv({
    delimiter: ';',
    checkType: true,
  })
    .fromFile(csvFilepath)
    .on('done', () => spinnies.succeed('csv'));
};

/**
 * CLI spinner
 */
const spinner = () => {
  const CINE_SNACKS = {
    interval: 150,
    frames: ['🍿', '🍭', '🍩', '🎬', '🍦', '🥤', '🍏'],
  };

  const spinnies = new Spinnies({
    succeedColor: 'white',
    spinner: CINE_SNACKS,
  });

  return spinnies;
};
const spinnies = spinner();

/**
 * Logs provided error and terminates process with exit code 1.
 *
 * If provided, EAN of problematic item is logged first.
 *
 * @param {Error} error
 * @param {string} EAN
 */
const logExit = (error, EAN = '') => {
  if (EAN) console.log(bold.red(`Item EAN: ${EAN}`));
  console.log('\n', error);
  process.exit(1);
};

/**
 * Generates a random integer within [min, max] interval
 * @param {number} min
 * @param {number} max
 */
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max + 1 - min) + min);

/**
 * Display usage information for the automated DB seed script
 */
const usage = () =>
  console.log(`USAGE
yarn seed [-dmh] [-i number] [-o number]   

OPTIONS
-m | --mint           use restricted dataset that has no missing columns
-d | --deploy         deploy generated DB to Heroku
-h | --help           display this help menu
-i | --items number   change default number (400) of sourcefile items to seed
-o | --order number   change default number (500) of mock orders to seed

EXAMPLE
yarn seed --items 50 --orders 500 --mint --deploy
`);
module.exports = {
  getIdIndex,
  parseMonthFR,
  generateIdName,
  parseCSV,
  spinnies,
  logExit,
  randomInt,
  usage,
};
