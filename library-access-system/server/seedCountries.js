const mongoose = require('mongoose');
const RestrictedCountry = require('./models/RestrictedCountry');
require('dotenv').config({ path: './server/.env' });

const countries = [
  { code: 'US', restricted: true },
  { code: 'CA', restricted: false },
  { code: 'CN', restricted: true },
  { code: 'IN', restricted: false }
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await RestrictedCountry.deleteMany();
    await RestrictedCountry.insertMany(countries);
    console.log('Countries seeded');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Error seeding countries:', err);
    mongoose.disconnect();
  });