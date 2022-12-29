import ticker from '../commands/finance/ticker.js';
import roll from '../commands/misc/roll.js';
import prayer from '../functions/pray.js';
import church from '../commands/church/church.js';
import play from '../commands/music/music.js';

export default async function message(__client, msg) {
    // Check first if message is bot
    if (!msg.author.bot) {
        // General Commands
        switch (splitMessage[0]) {
            // Random commands
            case '.roll':
                roll(msg, splitMessage);
                break;
            case '.ticker':
                ticker(msg, splitMessage);
                break;
            // Pray and Church are staple commands of sambot
            case '.pray':
                prayer(msg);
                break;
            case '.church':
                church(msg);
                break
            // Music Functionality
            case '.play':
                play(msg, splitMessage);
                break;
            // Version/Health Check
            case '.ping':
                msg.reply('pong 🙇 v1.10');
                break;
            default:
                break;
        }
    } else {
        // Reactions to messages from bots
        // console.log(msg);
    }
}


