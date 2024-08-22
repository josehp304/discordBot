const { token } = require("./token.json");
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
// client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});
client.commands = new Collection();

// parsing through the "commands" dir and adding commands to the collection client.commands
const folderPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(folderPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(folderPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((c) => c.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    }
  }
}

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) {
    console.log("couldn't find that command name");
  }
  try {
    await command.execute(interaction);
    console.log(interaction.commandName);
  } catch (error) {
    console.error(error);
  }
});

//connecting this code to the bot
client.login(token);
