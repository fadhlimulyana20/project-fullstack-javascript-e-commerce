const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig.development);

knex.raw('SELECT 1')
  .then(() => {
    console.log('Koneksi ke database berhasil!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Koneksi ke database gagal:', err);
    process.exit(1);
  });
