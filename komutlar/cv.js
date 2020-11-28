const Soviet = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {
if(!message.member.roles.cache.some(r => ["KAyıtçırolid", "2.kayıtçıveyaistediğinizrole"].includes(r.id)) && (!message.member.hasPermission("ADMINISTRATOR")))return message.reply("Bu Komutu Kullanmak İçin Yetkiniz Bulunmamakta.")
 
let kullanıcı = message.mentions.users.first()
if(!kullanıcı) {

let erkek = db.fetch(`erkekUye.${message.author.id}`);
let kadın = db.fetch(`kadinUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
if(erkek === null) erkek = "0"  
if(erkek === undefined) erkek = "0"
if(kadın === null) kadın = "0"
if(kadın === undefined) kadın = "0"
if(kayıtlar === null) kayıtlar = "0"
if(kayıtlar === undefined) kayıtlar = "0"
  
const sovyetsorgu = new Soviet.MessageEmbed()
.setAuthor("Yetkili ✗ " + message.author.username)
.setDescription(`
 Yetkilinin Toplam Kayıtların: \`${kayıtlar}\`
 Yetkilinin Toplam Erkek Kayıtların: \`${erkek}\`
 Yetkilinin Toplam Kadın Kayıtların: \`${kadın}\``)
 return message.channel.send(sovyetsorgu)
};
  
if(kullanıcı) {  
let erkek1 = db.fetch(`erkekUye.${kullanıcı.id}`);
let kadın1 = db.fetch(`kadinUye.${kullanıcı.id}`);
let kayıtlar1 = db.fetch(`kayıtSayi.${kullanıcı.id}`); 
if(erkek1 === null) erkek1 = "0"  
if(erkek1 === undefined) erkek1 = "0"
if(kadın1 === null) kadın1 = "0"
if(kadın1 === undefined) kadın1 = "0"
if(kayıtlar1 === null) kayıtlar1 = "0"
if(kayıtlar1 === undefined) kayıtlar1 = "0"
  
const sovietsorgu = new Soviet.MessageEmbed()
.setAuthor(`Yetkili ✗ ${kullanıcı.username}`)
.setDescription(`
 Yetkilinin Toplam Kayıtların: \`${kayıtlar1}\`
 Yetkilinin Toplam Erkek Kayıtların: \`${erkek1}\`
 Yetkilinin Toplam Kız Kayıtların: \`${kadın1}\``)
 return message.channel.send(sovietsorgu)
  
};
  
  };

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["stat"],
    permLvl: 0,
}
  
exports.help = {  
  name: "cv"
}