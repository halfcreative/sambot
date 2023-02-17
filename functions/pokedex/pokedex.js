import { Dex } from '@pkmn/dex';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';

export async function handler(event) {
    const body = JSON.parse(event.Records[0].Sns.Message);
    console.info("Event Body:", body);

    const response = {
        body: {
            "content": "",
            "embeds": []
        }
    }

    if (!body.data.options) {
        response.body.content = "Error. Options not recieved.";
    } else {
        console.info("Options", body.data.options);
        const searchRequest = {
            pokemonName: ""
        }
        const filterOptions = body.data.options.filter(option => {
            return option.name === "pokemon"
        })[0];
        if (filterOptions) {
            searchRequest.pokemonName = filterOptions.value
        }
        console.info(`Searching for ${searchRequest.pokemonName}`);
        const pokemon = Dex.species.get(searchRequest.pokemonName);
        console.info(`Results for ${searchRequest.pokemonName}`, pokemon);
        if (!pokemon.exists || pokemon.isNonstandard) {
            response.body.embeds.push(
                {
                    "type": "rich",
                    "title": `Dex Error :: No result found for ${searchRequest.pokemonName}`,
                    "description": "",
                    "color": 0xff0000
                }
            );
        } else {
            response.body.embeds.push(craftPokemonEmbed(pokemon));
        }
    }
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

    await rest.patch(Routes.webhookMessage(body.application_id, body.token), response)
        .then(function (response) {
            console.info("response:", response);
        })
        .catch(function (error) {
            console.error(error);
        });
}

/**
 * 
 * @param {Species} pokemon 
 * @returns 
 */
function craftPokemonEmbed(pokemon) {
    // Craft Description which contains the pokemon type and abilities
    let description = `**Types:** `;
    const typeInfo = pokemon.types.length == 2 ? `${pokemon.types[0]} | ${pokemon.types[1]}\n` : `${pokemon.types[0]}\n`;
    description = description + typeInfo;
    let abilityInfo = `**Abilities:** ` + pokemon.abilities[0];
    if (pokemon.abilities[1]) {
        abilityInfo = abilityInfo + ` |  ${pokemon.abilities[1]}`
    }
    if (pokemon.abilities.H) {
        abilityInfo = abilityInfo + ` | ${pokemon.abilities.H} (H)`
    }
    description = description + abilityInfo;
    let numForPic = pokemon.num.toString();
    if (pokemon.num < 100) {
        numForPic = '0' + numForPic;
    }
    const embed = {
        "type": "rich",
        "title": `#${pokemon.num} ${pokemon.name}`,
        "description": description,
        "color": 0x676868,
        "fields": [
            {
                "name": `Base Stat`,
                "value": `HP\nAtk\nDef\nSp. Atk\nSp. Def\nSpe\nTotal`,
                "inline": true
            },
            {
                "name": `Value`,
                "value": `${pokemon.baseStats.hp}\n${pokemon.baseStats.atk}\n${pokemon.baseStats.def}\n${pokemon.baseStats.spa}\n${pokemon.baseStats.spd}\n${pokemon.baseStats.spe}\n${pokemon.bst}`,
                "inline": true
            }
        ],
        "image": {
            "url": `https://www.serebii.net/Shiny/SV/new/${numForPic}.png`,
            "height": 0,
            "width": 0
        },
        "thumbnail": {
            "url": `https://play.pokemonshowdown.com/sprites/gen5/${pokemon.name.toLowerCase()}.png`,
            "height": 0,
            "width": 0
        }
    }

    if (pokemon.evos.length > 0 || pokemon.prevo) {
        embed.fields.push({
            "name": `Evolution Line:`,
            "value": "\u200B"
        });
        if (pokemon.prevo) {
            embed.fields.push({
                "name": `Pre-Evolution`,
                "value": pokemon.prevo,
                "inline": true
            });
        }
        if (pokemon.evos.length > 0) {
            embed.fields.push({
                "name": `Evolution`,
                "value": pokemon.evos[0],
                "inline": true
            });
        }
    }

    return embed;
}