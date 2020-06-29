const yfinance = require('yahoo-finance');

module.exports = async function ticker(msg, splitMessage) {
    if (splitMessage[1]) {
        await yfinance.quote({
            symbol: splitMessage[1],
            modules: ['price']
        }).then((quote) => {
            console.log(quote.price);
            if (quote.price.currencySymbol) {
                let priceInfoMessage = `Ticker info for **${quote.price.symbol}** : ${quote.price.longName}\n`;
                if (quote.price.marketState == 'POST' || quote.price.marketState == 'POSTPOST') {
                    priceInfoMessage = priceInfoMessage.concat(`post-Market Price: ${quote.price.currencySymbol}${quote.price.postMarketPrice}\n`);
                } else if (quote.price.marketState == 'PRE' || quote.price.marketState == 'PREPRE') {
                    priceInfoMessage = priceInfoMessage.concat(`pre-Market Price: ${quote.price.currencySymbol}${quote.price.preMarketPrice}\n`);
                }
                priceInfoMessage = priceInfoMessage.concat(`Market Price: ${quote.price.currencySymbol}${quote.price.regularMarketPrice}\n`);
                priceInfoMessage = priceInfoMessage.concat(`Market Open: ${quote.price.currencySymbol}${quote.price.regularMarketOpen}\n`);
                priceInfoMessage = priceInfoMessage.concat(`Market High: ${quote.price.currencySymbol}${quote.price.regularMarketDayHigh}\n`);
                priceInfoMessage = priceInfoMessage.concat(`Market Low: ${quote.price.currencySymbol}${quote.price.regularMarketDayLow}\n`);
                msg.channel.send(priceInfoMessage);
            } else {
                throw new Error('Not a stock');
            }
        }).catch((err) => {
            msg.channel.send(`Ticker "${splitMessage[1]}" not found`);
        });
    }
}
