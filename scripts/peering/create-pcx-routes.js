const {
  EC2Client,
  CreateRouteTableCommand,
  CreateRouteCommand,
  AssociateRouteTableCommand,
} = require('@aws-sdk/client-ec2');
const { getAwsCredsProvider } = require('@paycode-customer-v2/lib');
const config = require('./peering.config.json');
//console.log(config)

// Configure credentials
const credentials = getAwsCredsProvider(config.accepterProfile);


const ec2Client = new EC2Client({
  region: config.region,
  credentials,
});

async function createRouteTableAndAddPeeringRoute(
  vpcId,
  peeringConnectionId,
  destinationCidrBlock,
  subnets,
) {
  try {
    // Create a new route table for the VPC
    const createRouteTableResponse = await ec2Client.send(
      new CreateRouteTableCommand({
        VpcId: vpcId,
      }),
    );
    const routeTableId = createRouteTableResponse.RouteTable.RouteTableId;
    console.log(`Route table created: ${routeTableId}`);

    // Add a route to the route table for the VPC peering connection
    await ec2Client.send(
      new CreateRouteCommand({
        RouteTableId: routeTableId,
        DestinationCidrBlock: destinationCidrBlock, // CIDR block for the requester VPC
        VpcPeeringConnectionId: peeringConnectionId,
      }),
    );
    console.log(
      `Route added to route table for peering connection: ${peeringConnectionId}`,
    );

    // Associate the route table with specified subnets
    for (const subnetId of subnets) {
      await ec2Client.send(
        new AssociateRouteTableCommand({
          SubnetId: subnetId,
          RouteTableId: routeTableId,
        }),
      );
      console.log(
        `Route table ${routeTableId} associated with subnet ${subnetId}`,
      );
    }
  } catch (error) {
    console.error(
      'Error creating route table, adding peering route, or associating subnets:',
      error,
    );
  }
}

createRouteTableAndAddPeeringRoute(
  config.accepterVpcId,
  config.pcxId,
  config.requesterCidrBlock,
  config.accepterSubnets
)
  .then(console.log)
  .catch(console.error);
