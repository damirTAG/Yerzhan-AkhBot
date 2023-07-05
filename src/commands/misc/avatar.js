const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Показывает аватар выбранного пользователя",
    options: [
        {
            name: "mention",
            description: "Это пользователь, аватар которого вы хотите отобразить",
            premissions: "0x0000000000000800",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    // devOnly: true,
    // testOnly: true,
    // options: Object[],
    callback: async (client, interaction) => {
        const avatarmention = interaction.options.getUser("mention");
        if (avatarmention) {
            embed = new EmbedBuilder()
                .setTitle(`Аватар ${avatarmention.username}`)
                .setColor("Random")
                .setImage(`${avatarmention.displayAvatarURL({ size: 1024, format: "png", dynamic: true })}`)
                .setFooter({ text: "made by ©damirTAG", iconURL: `${interaction.user.displayAvatarURL()}` });
        }
        return interaction.reply({
            embeds: [embed],
        });
    },
};
