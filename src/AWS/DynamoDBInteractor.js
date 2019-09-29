import AWS from 'aws-sdk';

AWS.config.update({ region : 'us-west-2' });
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'aws-incognito-id',
});
export const docCLient = new AWS.DynamoDB.DocumentClient();