require('dotenv').config({ path: './server/.env' });
const axios = require('axios');

module.exports = async function getIPDetails(ip) {
  const apiKey = process.env.IP_API_KEY;
  const url = `https://api.ipgeolocation.io/v2/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  const response = await axios.get(url);
  return response.data;
};