const Soviet = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
   if(!['kayıtyapanrolidsi', '2.kayıtçı', '3.'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bu komutu kullanabilmek için <@&YetkiliRolİD> ||<@&YetkiliRolİD2> || <@&YetkiliRolİD3> Rol(ler)ine Sahıp Olmalısınız')
   let user = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   let isim = args[1]
   let yaş = args[2]
   let tag = "tag"
   let kayıtlırole = ""
   //let kayıtlırole2 = ""
   let kayıtsızrole = ""
  // let kayıtsızrole2 = ""


if(!user) return message.channel.send("Bir Kullanıcı Etiketleyin")
if(!isim) return message.channel.send("Bir İsim Girin")
if(!yaş) return message.channel.send("Bir Yaş Girin")

let a = message.guild.member(user)

a.setNickname(`${tag} ${isim} | ${yaş}`)
a.roles.add(kayıtlırole)
//a.roles.add(kayıtlırole2)
a.roles.remove(kayıtsızrole)
//a.roles.remove(kayıtsızrole2)


const soviet = new Soviet.MessageEmbed()

.setTitle("☆ Erkek Kayıt İşlemi Başarılı ☆")
.setColor("RANDOM")
.setDescription(` 
♢${a.user} Adlı Kullanıcının Kayıt İşlemi Başarılı  
♢ Verilen ve Alınan Rol(ler) Sırasıyla : ${kayıtlırole} ,  *\${kayıtlırole2}*\ ${kayıtsızrole}  *\${kayıtsızrole2}*\  
♢ Kayıt Eden Yetkili ${message.author}
♢ Yetkilinin Toplam Kayıt Sayısı : **${kayıtlar}**
♢ Yetkilinin Toplam Erkek Kayıt Sayısı : **${erkek}**`)
.setFooter('Kayıt Zamanı')
.setTimestamp()

message.channel.send(soviet)


const soviet2 = new Soviet.MessageEmbed()
.setTitle(`${message.author} Adlı Yetkili Bir Kişiyi Erkek Olarak Kayıt Etti `)
.setDescription(`Yetkilinin Toplam Kayıt Sayısı ${kayıtlar} Olarak Düzenlendi x Yetkilinin Toplam Erkek Kayıt Sayısı **${erkek}** Olarak Düzenlendi`)
.setColor('RANDOM')
.setTimestamp()
message.channel.cache.get("kanalid").send(soviet2)


  db.add(`kayıtSayi.${message.author.id}`, 1)
  db.add(`erkekUye.${message.author.id}`, 1)
  let erkek = db.get(`erkekUye.${message.author.id}`);
  let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
    

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['e'],
    permlevel: 0
};

exports.help = {
    name: "erkek"
}