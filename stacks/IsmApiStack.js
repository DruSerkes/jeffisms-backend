import * as sst from "@serverless-stack/resources";

export default class IsmApiStack extends sst.Stack {
    // Public reference to the API
    ismApi;
    constructor(scope, id, props) {
        super(scope, id, props);

        const { table } = props;

        // Create the API
        this.ismApi = new sst.Api(this, "ism-api", {
            defaultFunctionProps: {
                environment: {
                    TABLE_NAME: table.tableName,
                },
            },
            routes: {
                "POST   /isms": "src/create.main",
            },
        });

        // Allow the API to access the table
        this.ismApi.attachPermissions([table]);

        // Show the API endpoint in the output
        this.addOutputs({
            ApiEndpoint: this.ismApi.url,
        });
    }
}