const router   = require("express").Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/csv' })
const fs = require('fs');
const parse = require('csv-parse');
const models = require("../models");

router.post("/", upload.single('csv'), function(req, res, next) {
    var data = [];
    var index = 0;
    
    fs.createReadStream(req.file.path)
        .pipe(parse({delimiter: ','}))
        .on('data', function(record) {
            
            if(index != 0){
                var dataRecord = {
                    name: {
                        english: record[0],
                        arabic: record[1]
                    },
                    description: {
                        english: record[0],
                        arabic: record[3]
                    },
                    website: record[4],
                    branches: [{
                        phoneNumber: record[5],
                        email: record[6],
                        address: {
                            english: record[7],
                            arabic: record[8]
                        },
                        location: {
                            latitude: record[9], 
                            longitude: record[10],
                            city: record[11]
                        },
                        openingHours: {
                            english: record[12],
                            arabic: record[13]
                        }
                    }], 
                    socialMedias: [{
                        type: "Twitter",
                        url: record[14]
                    },
                    {
                        type: "Facbook",
                        url: record[15]
                    },
                    {
                        type: "Instagram",
                        url: record[16]
                    }
                    ]
                };
                
                var q = models.Business.createBusiness(dataRecord);
                data.push({status:q, data:dataRecord});
            }
            index++;
        })
        .on('end',function() {
            res.send(data);
        });
});

module.exports = router;