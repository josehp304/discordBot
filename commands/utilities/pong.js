const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies  to ping"),
  async execute(interation) {
    interation.reply("pong");
  },
};
