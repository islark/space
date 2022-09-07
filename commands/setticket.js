const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setticket", // Coloque o nome do comando do arquivo
    aliases: ["st"], // Coloque sinônimos aqui

    run: async(client, message, args) => {

       if (!message.member.permissions.has("MANAGE_GUILD")) return message.reply(`\❌ ${message.author} Você não tem permissão para isso!`);

       if (!message.guild.me.permissions.has("ADMINISTRADOR")) return message.reply(`\❌ ${message.author} Eu não tenho permissão para isso!`);

       let channel =  message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

       if (!channel) return message.reply(`\❌ ${message.author} \`!setticket [canal]\`.`);

       let criar = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")

       message.reply(`\✅ ${message.author} O sistema de ticket foi configurado com sucesso.`);
    
       let row = new Discord.MessageActionRow().addComponents(criar)

       let embed = new Discord.MessageEmbed()
       .setTitle(`**Centro de ajuda**`)
       .setDescription(`Nessa seção, você pode tirar suas dúvidas ou entrar em contato com a nossa equipe de suporte.

Para evitar problemas, leia as regras com atenção! `)
       .setColor("RANDOM")
       .setImage("https://media.discordapp.net/attachments/989555949935153192/1015981566234726410/C34757F3-188D-4430-A6C5-5774C867A747.gif")
       .setFooter("espero estar ajudando! 🔨")

       channel.send({embeds: [embed], components: [row]})


        
    }
}
