const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;


module.exports = client => {
  console.log(`Bot Aktif`);  

  client.user.setActivity("$ov'iet", {
  
  });
};
