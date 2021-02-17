const { Client, WebhookClient, RichEmbed } = require('discord.js')
const client = new Client();
const axios = require('axios')
const { webhook} = require('./config.json')
const {red, green, magenta} = require('chalk')
const token = require('./config.json').token
client.on('ready', () => {
    console.clear()
console.log(magenta(`



                    ╔═╗┬  ┌─┐┬ ┬┌─┐┬─┐┌─┐  ╔╗╔┬┌┬┐┬─┐┌─┐  ┌─┐┌┐┌┬┌─┐┌─┐┬─┐
                    ╚═╗│  ├─┤└┬┘├┤ ├┬┘└─┐  ║║║│ │ ├┬┘│ │  └─┐││││├─┘├┤ ├┬┘
                    ╚═╝┴─┘┴ ┴ ┴ └─┘┴└─└─┘  ╝╚╝┴ ┴ ┴└─└─┘  └─┘┘└┘┴┴  └─┘┴└─


                              Logged in as ${client.user.tag}

                               Listening to ${client.guilds.size} servers

`))

})
let reg = /(\d+)\/(.+)/

const [, webhookID, webhookToken] = webhook.match(reg)

const hook = new WebhookClient(webhookID, webhookToken)
client.on('message', async(message) => {
    if (message.content.includes('discord.gift/') || message.content.includes('discordapp.com/gifts/')) {
    //    try {
            var Nitro = /(discord\.(gift)|discordapp\.com\/gift)\/.+[a-z]/
              var NitroUrl = Nitro.exec(message.content);
            try {
            var NitroCode = NitroUrl[0].split('/')[1] 
            } catch(e) {
                NitroCode = message.content.slice('discord.gift/')
            }
           
         
         axios({
                method: 'POST',
                url: `https://discord.com/gifts/${NitroCode}`,
                headers: {
                    'Authorization': token
                },

            }).then(
                () => {
                    try {
                        var server = message.guild.name
                            } catch(e) {
                             server = 'DM channel'
                            }
                    console.log(green(`  Nitro Sniped \n \n • Server       | ${server} \n • Channel      | ${message.channel.name} \n • Author       | ${message.author.tag} \n • Code         | ${NitroCode}`) + "\n")
                   

                    const embed = new RichEmbed()
                    .setColor()
                    .setTitle('Nitro sniped')
                    .setAuthor(message.author.tag, message.author.displayAvatarURL)
                    .setDescription(`\`\`\` • Server       | ${server} \n • Channel      | ${message.channel.name} \n • Author       | ${message.author.tag} \n • Code         | ${NitroCode}\`\`\``)
                    .setFooter('Nitor sniper by Slayer')
                    hook.edit({avatar: 'https://cdn.discordapp.com/attachments/806787317834317836/807010430768775168/a_88e720a6d524eb8fae04648a5d6ca6f3.gif', name: "Slayer Sniper"})
                    hook.send(embed)
                })
            }
                
})

client.login(token)