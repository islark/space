// ========================================================== //

//░██████╗██████╗░░█████╗░░█████╗░███████╗
//██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔════╝
//╚█████╗░██████╔╝███████║██║░░╚═╝█████╗░░
//░╚═══██╗██╔═══╝░██╔══██║██║░░██╗██╔══╝░░
//██████╔╝██║░░░░░██║░░██║╚█████╔╝███████╗
//╚═════╝░╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚══════╝


// ========================================================= //




const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767});
const config = require("./config.json"); 


client.login(config.token); 

client.on("ready", () => {

    let space = [

        `estou viva! 🛰`,
        `utilize a.help para ver meus comandos!`
      ],
      fera = 0;
    setInterval( () => client.user.setActivity(`${space[space++ % space.length]}`, {
          type: "PLAYING" //mais tipos: WATCHING / LISTENING
        }), 1000 * 30); 
    client.user
        .setStatus("dnd")
  console.log("Estou pronto(a) para ser utilizado(a)!")
  });
  
  
client.on('messageCreate', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});


client.on('interactionCreate', interaction => {



    let cargo = interaction.guild.roles.cache.get("1015987231288217662"); // Coloque o ID do cargo de verificação.

    if (interaction.isButton()) {
        if (interaction.customId.startsWith("botao_cargo")) {
            try {

            if (interaction.member.roles.cache.get(cargo.id)) {

                interaction.reply({ content: `\ <a:emoji_31:1004734944054095923> Você já está verificado no servidor.`, ephemeral: true })

            } else {

            interaction.member.roles.add(cargo)
            interaction.reply({ content: `\ ✅ Você foi verificado com sucesso.`, ephemeral: true })

            }
            } catch (er) { console.log(er) }
        } else {}

    }

})

client.on('interactionCreate', interaction => {

    let criar = new Discord.MessageButton().setCustomId("c").setLabel("Crie seu ticket").setStyle("PRIMARY")
    let fechar = new Discord.MessageButton().setCustomId("f").setLabel("Feche seu ticket").setStyle("PRIMARY")

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('c')) {

            let achando = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.id}`);

            if (achando) return interaction.reply({ content: `**\❌ ${interaction.user} Você já possui um ticket aberto: ${achando}**`, ephemeral: true })

            interaction.guild.channels.create(`ticket-${interaction.user}`, {
                permissionOverwrites: [
                    {
                id: interaction.guild.roles.everyone,
                deny: ["VIEW_CHANNEL"],
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                    }
                ], 
                
                            }).then(async channel => {

                                interaction.reply({content: `Seu ticket foi criado em: ${channel}`, ephemeral: true})

                                const row = new Discord.MessageActionRow().addComponents(fechar)

                                let embed = new Discord.MessageEmbed()
                                .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                .setDescription(`**> ${interaction.user}.\n> Seu ticket está aberto. \n> Feche seu ticket com o botão abaixo.**`)
                                .setColor("RANDOM")
                                .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))

                                channel.send({ content: `${interaction.user}`,embeds: [embed], components: [row]}).then(msg => {
                                    msg.pin()
                                })
                            })
        }
        if (interaction.customId.startsWith('f')) {

            interaction.reply(`**\🔒 ${interaction.user} Seu ticket será fechado em 5 segundos.**`)

            setTimeout( () => {

                try {

                interaction.channel.delete()

                }
                catch (er) 
                {
                    console.log(er)
                }

            }, 5000)

        }
    }
})

process.on('multipleResolves', (type, reason, promise) => {

    console.log(`🚫 Erro Detectado\n\n` + type, promise, reason)

});
process.on('unhandRejection', (reason, promise) => {
    console.log(`🚫 Erro Detectado:\n\n` + reason, promise)
});
process.on('uncaughtException', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
process.on('uncaughtExceptionMonitor', (error, origin) => {
    console.log(`🚫 Erro Detectado:\n\n` + error, origin)
});
