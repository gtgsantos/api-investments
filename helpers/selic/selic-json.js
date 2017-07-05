const selicHtml = require('./selic-html');
const cheerio = require('cheerio');
const datetime = require('node-datetime');

var $;
var divs;

const selicJson = function(callback) {

    selicHtml(function(response) {

        $ = cheerio.load(response);
        divs = cheerio.load($('entry>content').text());
        const date = datetime.create($('entry>updated').text());

        const json = {
            "title": $('entry>title').text(),
            "date-update-formatted": date.format('d/m/Y'),
            "rate": {
                "value": divs('#ratevalue').text(),
                "date-formatted": divs('#rate').children().last().text()
            },
            "daily": {
                "value": divs('#dailyratevalue').text(),
                "date-formatted": divs('#dailyratedate').text()
            },
            "date-update": date.getTime()
        };

        return callback(json);
    });
};

module.exports = selicJson;