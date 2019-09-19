var AWS = require("aws-sdk");
process.env.AWS_PROFILE = "s3";
AWS.config.update({ region: 'eu-central-1' });


AWS.config.getCredentials(function (err) {
    if (err) console.log(err.stack);
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
        console.log("Secret access key:", AWS.config.credentials.secretAccessKey);
    }
});

var s3 = new AWS.S3({
    accessKeyId: AWS.config.credentials.accessKeyId,
    secretAccessKey: AWS.config.credentials.secretAccessKey
});

s3.listBuckets(function (err, data) {
    if (err) {
        console.log(err);
    } else {
        console.log(data.Buckets);
    }
});