const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(
    `Bot Tekrardan Aktif $Sov'iet`
  );
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const db = require('quick.db')
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const fs = require("fs");
const moment = require("moment");
moment.locale("tr")
const chalk = require("chalk");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);
 



client.on("guildMemberAdd", member => {
  member.roles.add('kayıtsızroleid');
});

client.on("guildMemberAdd", member => {
  member.setNickname('İsim | Yaş');
});


client.on("guildMemberAdd", member => {  
  const kanal = member.guild.channels.cache.find(r => r.id === "göndereceğikanalid");
  const register = "<@&kayıtçıroleid> , <@&kayıtçıroleid2> , <@&kayıtçıroleid3>"
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
 
  var kontrol;
if (kurulus < 1296000000) kontrol = 'Kullanıcı Kayıt Olmaya Uygun Değildir'
if (kurulus > 1296000000) kontrol = 'Kullanıcı Kayıt  Olmaya Uygundur'
  moment.locale("tr");
    const soviet = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
.setDescription("**Sunucu Adı'na Hoşgeldin <@" + member + "> Seninle \`" + member.guild.memberCount + "\` Kişiyiz.\n\nMüsait olduğunda Confirmed Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n<@&kayıtçıid> , <@&kayıtçıid2> , <@&kayıtçıid3> seninle ilgilenecektir. \n\nHesabın Oluşturulma Tarihi: " + moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +  "\n\n"  + kontrol + "\n\nTagımızı alarak **tag** bize destek olabilirsin.**\n")
 .setImage("")
 kanal.send(soviet)   
   kanal.send(register) 
});



client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = 'tag'
  const sunucu = 'sunucuid'
  const kanal = 'kanalid'
  const rol = 'verilecekroleid'

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} => Tagımızı (${tag}) Aldığın İçin <@&${rol}> Rolünü Verdim. Sunucumuzda iyi vakit geçirmeni dilerim.`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`${newUser.username} => Tagımızı (${tag}) Aldığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Verdim. Sunucumuzda iyi vakit geçirmeni dilerim`)
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`${newUser} => Tagımızı (${tag}) Çıkardığın İçin <@&${rol}> Rolünü Aldım`));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**${newUser.username}** => Tagımızı (${tag}) Çıkardığın İçin ${client.guilds.cache.get(sunucu).roles.cache.get(rol).name} Rolünü Aldım`)
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});


