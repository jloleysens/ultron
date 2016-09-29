var casper = require('casper').create(
{
	pageSettings: 
	{
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1588.0 Safari/537.36',
	}
});

//var x = require('casper').selectXPath;
var fs = require('fs');
var date = new Date().toISOString().slice(0, 10);;
var takealotFile = ('Takealot_' + date + '.json');

var links = [
    'http://www.takealot.com/deals',
    'http://www.takealot.com/deals/app-only'
];

var productHash = {};
var products = [];

casper.start().each(links, function(self, link) {
    self.thenOpen(link, function()
    {
        var listTitles = this.getElementsInfo('h3.deal-heading');
        var listPrices = this.getElementsInfo('p.price');

        for (var i = 0; i < listTitles.length; i++)
        {	
            var productDetails = {};
            productDetails['title'] = listTitles[i].text;
            productDetails['price'] = listPrices[i].text;
            //productDetails['url'] = listUrl[i].text;
            products.push(productDetails);
        }
        productHash['products'] = products;
        fs.write(takealotFile, JSON.stringify(productHash), 'a');
    });
})

casper.then(function() {
    this.exit();
});  

casper.run(function() {
});