const Discord = require("discord.js")



module.exports = {
    name: "botinfo", // Coloque o nome do comando do arquivo
    aliases: ["informações do bot"], // Coloque sinônimos aqui

    run: async (client, message, args) => {

        let servidor = client.guilds.cache.size;
        let usuarios = client.users.cache.size;
        let canais = client.channels.cache.size;
        let ping = client.ws.ping;
        let dono_id = "735983724562350140"; // Seu ID
        let dono = client.users.cache.get(dono_id);
        let prefixo = "a.";
        let versao = "^13.10.3";

        let embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL({ dynamic: true }) })
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp(new Date)
            .setDescription(`\ <a:aoba:1016873182000586812> Olá ${message.author}, sou o \`${client.user.username}\`, meu prefixo é **\`${prefixo}\`**.\n\ \ <a:Rotsen:1016873479938769086> Veja meus comandos com \`${prefixo}help\`.
 \ <:alo:1016874684417056829> Atualmente estou gerenciando \`${servidor}\` servidores, \`${usuarios}\` usuários e \`${canais}\` canais de servidores.
 \ <a:rosa:999210942866915369> Meu ping está em \`${ping}\`.
 \ <:dono:1016874850159186012> Fui criado pelo \`${dono.tag}\`, na linguagem JavaScript, utilizando NodeJs e a livraria Discord.Js na versão \`${versao}\`.`);

        message.reply({ embeds: [embed] })



    }
}