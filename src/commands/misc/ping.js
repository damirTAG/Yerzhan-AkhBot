module.exports = {
    name: "ping",
    description: "ваш пинг до хоста",
    callback: async (client, interaction) => {
        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimeStamp - interaction.createdTimeStamp;

        interaction.editReply(`Ну че за пинг!!!1! \n${ping}ms | WebSocket: ${client.ws.ping}ms`);
    },
};
