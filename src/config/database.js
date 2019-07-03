module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'somethingrealydificult',
  database: 'meetapp',
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
  },
};
