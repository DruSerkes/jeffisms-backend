import * as sst from "@serverless-stack/resources";

export default class IsmStack extends sst.Stack {
    // Public reference to the table
    ismTable;
    constructor(scope, id, props) {
        super(scope, id, props);

        // Create a new dynamoDB Table 
        this.ismTable = new sst.Table(this, 'isms', {
            fields: {
                ismID: sst.TableFieldType.STRING,
                ism: sst.TableFieldType.STRING,
                source: sst.TableFieldType.STRING,
                definition: sst.TableFieldType.STRING
            },
            primaryIndex: { partitionKey: 'ismID' }
        })

        // Show the endpoint in the output
        this.addOutputs({
            "TableName": this.ismTable.tableName
        });
    }
}
