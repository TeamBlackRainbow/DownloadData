//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var index = ['III', 'ABF', 'ADN', 'ADM', 'AAL', 'ANTO', 'ARM', 'AHT', 'AZN', 'AV/', 'BAB', 'BA/', 'BARC', 'BDEV', 'BKG', 'BG/', 'BLT', 'BP/', 'BATS', 'BLND','BT/A', 'BNZL', 'BRBY', 'CPI', 'CCL', 'CNA' ,'CCH', 'CPG', 'CRH', 'DGE', 'DLG', 'DC/', 'EZJ', 'EXPN', 'FRES', 'GFS', 'GKN', 'GSK', 'GLEN', 'HMSO', 'HL/', 'HIK', 'HSBA', 'IMT', 'ISAT', 'IHG', 'ITRK', 'IAG', 'INTU', 'ITV', 'JMAT', 'KGF', 'LAND', 'LGEN', 'LLOY', 'LSE', 'MKS', 'MGGT', 'MERL', 'MNDI', 'MRW', 'NG/', 'NXT', 'OML', 'PSON', 'PSN', 'PRU', 'RRS', 'RDSA', 'RDSB', 'RB/', 'REL', 'RIO', 'RR/', 'RBS','RMG','RSA','SAB','SGE','SBRY','SDR','SVT','SHP','SKY','SN/','SMIN','SPD','SSE','STJ','STAN','SL','TW/', 'TSCO', 'TPK', 'TUI', 'ULVR', 'UU/', 'VOD', 'WTB', 'WOS', 'WPP'];
var nyse = ['ATVI', 'ADBE', 'AKAM', 'ALXN', 'ALTR', 'AMZN', 'AMGN', 'ADI', 'AAPL', 'AMAT', 'ADSK', 'ADP', 'AVGO', 'BIDU', 'BBBY', 'BIIB', 'BRCM', 'CHRW', 'CA', 'CTRX', 'CELG', 'CERN', 'CHTR', 'CHKP', 'CSCO', 'CTXS', 'CTSH', 'CMCSA', 'COST', 'DTV', 'DISCA', 'DISH', 'DLTR', 'EBAY', 'EQIX', 'EXPE', 'EXPD', 'ESRX', 'FFIV', 'FB', 'FAST', 'FISV', 'GRMN', 'GILD', 'GOOG', 'GOOGL', 'HSIC', 'ILMN', 'INTC', 'INTU', 'ISRG', 'GMCR', 'KLAC', 'KRFT', 'LBTYA', 'LINTA', 'LMCA', 'LLTC', 'MAR', 'MAT', 'MXIM', 'MU', 'MSFT', 'MDLZ', 'MNST', 'MYL', 'NTAP', 'NFLX', 'NVDA', 'NXPI', 'ORLY', 'PCAR', 'PAYX', 'QCOM', 'REGN', 'ROST', 'SNDK', 'SBAC', 'STX', 'SIAL', 'SIRI', 'SPLS', 'SBUX', 'SRCL', 'SYMC', 'TSLA', 'TXN', 'PCLN', 'TSCO', 'TRIP', 'FOXA', 'VRSK', 'VRTX', 'VIAB', 'VIP', 'VOD', 'WDC', 'WFM', 'WYNN', 'XLNX', 'YHOO']
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var led = require('./led-strip.js');

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bloomberg';

var things = [];
var nasdaq = [];
// Use connect method to connect to the Server

const AWS_REGION = 'us-east-1';

var aws = require('aws-sdk');
aws.config.update({
    region: AWS_REGION
});
var awsdb = new aws.DynamoDB.DocumentClient();

for (i = 0; i < 87; i++) {

      //Create some users

  var params = {
      TableName: '2013',
      KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
      ExpressionAttributeNames: {
    '#t': 'Ticker',
    '#d': 'Date'
      },
      ExpressionAttributeValues: {
    ':ticker': index[i]+' LN Equity',
    ':date1': '2013-01-01',
    ':date2': '2013-12-02'
      }
  };

  awsdb.query(params, function(err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data['Items']);

      things.push(data['Items']);

      // Insert some users

  });

}

for (i = 0; i < 100; i++) {

      //Create some users

  var params = {
      TableName: '2013',
      KeyConditionExpression: '#t = :ticker and #d between :date1 and :date2',
      ExpressionAttributeNames: {
    '#t': 'Ticker',
    '#d': 'Date'
      },
      ExpressionAttributeValues: {
    ':ticker': nyse[i]+' US Equity',
    ':date1': '2013-01-01',
    ':date2': '2013-12-02'
      }
  };

  awsdb.query(params, function(err, data) {
    if (err)
      console.log(err, err.stack);
    else
      console.log(data['Items']);

      nasdaq.push(data['Items']);

      // Insert some users

  });

}

setTimeout(function() {
  console.log(things.length);

  for(var i = 1; i < 300; i++) {

    for(var j = 0; j < 87; j++) {
      if(things[j]) {
        if(things[j][i]) {
          if(things[j][i].High > things[j][i-1].High) {
            led.presetPixel(j, 0, 255, 0);
          } else {
            led.presetPixel(j, 255, 0, 0);
          }
        } else {
          led.presetPixel(j, 0, 0, 255);
        }
      } else {
        led.presetPixel(j, 0, 0, 255);
      }
      

    }
    for(var e = 0; e < 100; e++) {
      if(nasdaq[e]) {
        if(nasdaq[e][i]) {
          if(nasdaq[e][i].High > nasdaq[e][i-1].High) {
            led.presetPixel(e+87, 255,69,0);
          } else {
            led.presetPixel(e+87, 139,69,139);
          }
        } else {
          led.presetPixel(e+87, 0, 0, 255);
        }
      } else {
        led.presetPixel(e+87, 0, 0, 255);
      }
      

    }

    led.updateStrip();

  }
}, 2000);
