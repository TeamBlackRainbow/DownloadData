//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');
var index = ['III', '3IN', 'ASL', 'AGS', 'AFR', 'ABG', 'ATST', 'AML', 'AIE', 'AQP', 'AHT', 'ATK', 'AVV', 'AVM', 'AZEM', 'BBY', 'BGEO', 'BNKR', 'BAG', 'BDEV', 'BBA', 'BEZ', 'BWY', 'BRSN', 'BKG', 'BET', 'BHGG', 'BHGU', 'BHME', 'BHMG', 'BHMU', 'BYG', 'BRWM', 'BABS', 'BOY', 'BOK', 'BVS', 'BRW', 'BSET', 'BTEM', 'BVIC', 'BWNG', 'BTG', 'BUMI', 'BPTY', 'CWC', 'CNE', 'CLDN', 'CIU', 'CAPC', 'CLLN', 'CPR', 'CGL', 'CEY', 'CHG', 'CTY', 'CBG', 'COB', 'COLT', 'CCC', 'CKSN', 'CWK', 'CSR', 'DJAN', 'DCG', 'DLAR', 'DEB', 'DPH', 'DLN', 'DVO', 'DAB', 'DIA', 'DTY', 'DPLM', 'DXNS', 'DNO', 'DOM', 'DRX', 'DNLM', 'EZJ', 'EFM', 'EDIN', 'ELTA', 'ECM', 'ELM', 'ENQ', 'ESSR', 'ERM', 'FCAM', 'FCPT', 'FENR', 'FXPO', 'FCSS', 'FEV', 'FDSA', 'FLTR', 'FGP', 'FRCL', 'GFRD', 'GEMD', 'GSS', 'GNS', 'GOG', 'GRI', 'GPOR', 'GNK', 'GRG', 'HFD', 'HLMA', 'HSTN', 'HAS', 'HGG', 'HRI', 'HOIL', 'HICL', 'HIK', 'HSX', 'HOC', 'HOME', 'HSV', 'HWDN', 'HTG', 'IGG', 'IMG', 'INCH', 'INF', 'ISAT', 'ICP', 'IPF', 'INPP', 'IRV', 'ISYS', 'INVP', 'IPO', 'ITE', 'JLT', 'JD', 'JLIF', 'JAM', 'JAI', 'JMG', 'JII', 'JUP', 'KCOM', 'KMR', 'KENZ', 'KIE', 'LAD', 'LRD', 'LRE', 'LWDB', 'LOG', 'LSP', 'LSE', 'LMI', 'EMG', 'MARS', 'MRO', 'MNZS', 'MRC', 'MRCH', 'MPI', 'MCRO', 'MLC', 'MAB', 'MTO', 'MNDI', 'MONY', 'MNKS', 'MGCR', 'MUT', 'MYI', 'NEX', 'NBLS', 'NWR', 'NMC', 'OCDO', 'OPHR', 'OXIG', 'PAG', 'PAY', 'PER', 'PLI', 'PSN', 'PNL', 'PDL', 'POG', 'PHNX', 'PCT', 'PFL', 'PMO', 'PFG', 'PZC', 'QQ', 'RNK', 'RAT', 'RUS', 'RDW', 'RGU', 'RSW', 'RTO', 'RTN', 'RMV', 'RCP', 'ROR', 'RPC', 'RPS', 'RPO', 'SMDR', 'SVS', 'SCIN', 'SMT', 'SDL', 'SGRO', 'SNR', 'SHB', 'SKS', 'SHI', 'SMDS', 'SIA', 'SXS', 'SPX', 'SPT', 'SPD', 'STJ', 'SGC', 'STOB', 'SVI', 'SYR', 'TALK', 'TALV', 'TW', 'TED', 'TCY', 'TEP', 'TMPL', 'TEM', 'TRY', 'TRYS', 'TPK', 'TT', 'TLPR', 'UBM', 'UKCM', 'ULE', 'UEM', 'VCT', 'JDW', 'SMWH', 'WMH', 'WTAN', 'WG', 'WWH', 'YULC']
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

var led = require('./led-strip.js');

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/bloomberg';

var things = [];

// Use connect method to connect to the Server

const AWS_REGION = 'us-east-1';

var aws = require('aws-sdk');
aws.config.update({
    region: AWS_REGION
});
var awsdb = new aws.DynamoDB.DocumentClient();

for (i = 0; i < 230; i++) {

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
    ':date2': '2013-06-02'
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

setTimeout(function() {
  console.log(things.length);

  for(var i = 1; i < 180; i++) {

setTimeout(function() {
    for(var j = 0; j < 230; j++) {
      if(things[j]) {
        if(things[j][i]) {
          if(things[j][i].High > things[j][i-1].High) {
            led.setPixel(j, 0, 255, 0);
          } else {
            led.setPixel(j, 255, 0, 0);
          }
        } else {
          led.setPixel(j, 0, 0, 255);
        }
      } else {
        led.setPixel(j, 0, 0, 255);
      }


    }

},250);

  }
}, 2000);
