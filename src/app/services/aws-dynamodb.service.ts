import {Injectable} from "@angular/core";
import { config, DynamoDB } from "aws-sdk";
//import {environment} from "../../environments/environment";
//import {Stuff} from "../secure/useractivity/useractivity.component";

/**
 * Created by Vladimir Budilov
 * https://github.com/awslabs/aws-cognito-angular2-quickstart
 * Commit: 181e20f0af0e95a779e176b20f2f2591e5c4feab
 */


//declare var AWS: any;
//declare var AWSCognito: any;

@Injectable()
export class DynamoDBService {

    constructor() {
        console.log("DynamoDBService: constructor");
    }

    // getAWS() {
    //     return AWS;
    // }

    // getLogEntries(mapArray: Array<Stuff>) {
    //     console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
    //     var params = {
    //         TableName: environment.ddbTableName,
    //         KeyConditionExpression: "userId = :userId",
    //         ExpressionAttributeValues: {
    //             ":userId": AWS.config.credentials.params.IdentityId
    //         }
    //     };

    //     var docClient = new AWS.DynamoDB.DocumentClient();
    //     docClient.query(params, onQuery);

    //     function onQuery(err, data) {
    //         if (err) {
    //             console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
    //         } else {
    //             // print all the movies
    //             console.log("DynamoDBService: Query succeeded.");
    //             data.Items.forEach(function (logitem) {
    //                 mapArray.push({type: logitem.type, date: logitem.activityDate});
    //             });
    //         }
    //     }
    // }

    writeLogEntry(type: string) {
        try {
            let date = new Date().toString();
            //console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + AWS.config.credentials.params.IdentityId + " Date: " + date);
            //this.write(config.credentials.params.IdentityId, date, type);
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    write(data: string, date: string, type: string): void {
        console.log("DynamoDBService: writing " + type + " entry");
        var DDB = new DynamoDB();

        // Write the item to the table
        var itemParams =
            {
                TableName: 'LoginTrail',
                Item: {
                    userId: {S: data},
                    activityDate: {S: date},
                    type: {S: type}
                }
            };
        DDB.putItem(itemParams, function (err, data) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(data));
        });
    }

}


