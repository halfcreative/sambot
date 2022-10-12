
export default function play(msg, splitMessage) {
    msg.channel.send(`${msg.author}, your roll is : ${roll}/${splitMessage[1]}`);
}
