const {
  EC2Client,
  AcceptVpcPeeringConnectionCommand,
} = require('@aws-sdk/client-ec2');
const { getAwsCredsProvider } = require('@paycode-customer-v2/lib');
const config = require('./peering.config.json');

// Configure credentials and EC2 client
const credentials = getAwsCredsProvider(config.accepterProfile);
const ec2Client = new EC2Client({
  region: config.region,
  credentials,
});

async function acceptVpcPeeringRequest(peeringConnectionId) {
  try {
    const acceptCommand = new AcceptVpcPeeringConnectionCommand({
      VpcPeeringConnectionId: peeringConnectionId,
    });
    const acceptResponse = await ec2Client.send(acceptCommand);
    console.log(
      'Peering Connection Accepted:',
      acceptResponse.VpcPeeringConnection.Status.Code,
    );
  } catch (error) {
    console.error('Error accepting VPC Peering Connection:', error);
  }
}

// Function to accept the VPC peering connection based on the provided ID in the configuration
async function main() {
  if (config.pcxId) {
    console.log(`Accepting VPC Peering Connection: ${config.pcxId}`);
    await acceptVpcPeeringRequest(config.pcxId);
  } else {
    console.log('No VPC Peering Connection ID provided in the configuration.');
  }
}

main();
