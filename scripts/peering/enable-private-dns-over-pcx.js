const { EC2Client, ModifyVpcPeeringConnectionOptionsCommand } = require('@aws-sdk/client-ec2');
const { getAwsCredsProvider } = require('@paycode-customer-v2/lib');
const PEERING_CONFIG = require('./peering.config.json');

async function enablePrivateDnsResolutionForPeering(peeringConnectionId, profile, region, side) {
    const credentials = getAwsCredsProvider(profile);
    const ec2Client = new EC2Client({
      region: region,
      credentials,
    });

    const options = {};
    if (side === 'accepter') {
        options.AccepterPeeringConnectionOptions = { AllowDnsResolutionFromRemoteVpc: true };
    } else if (side === 'requester') {
        options.RequesterPeeringConnectionOptions = { AllowDnsResolutionFromRemoteVpc: true };
    }

    try {
      const modifyCommand = new ModifyVpcPeeringConnectionOptionsCommand({
        VpcPeeringConnectionId: peeringConnectionId,
        ...options,
      });
      const modifyResponse = await ec2Client.send(modifyCommand);
      console.log(`DNS Resolution Enabled for ${side} Side of Peering Connection:`, modifyResponse);
    } catch (error) {
      console.error(`Error modifying VPC Peering Connection options for ${side} side:`, error);
    }
}

async function main() {
  if (PEERING_CONFIG.pcxId) {
    console.log(`Enabling DNS Resolution for VPC Peering Connection: ${PEERING_CONFIG.pcxId}`);
    // Modify accepter side
    await enablePrivateDnsResolutionForPeering(PEERING_CONFIG.pcxId, PEERING_CONFIG.accepterProfile, PEERING_CONFIG.region, 'accepter');
    // Modify requester side
    await enablePrivateDnsResolutionForPeering(PEERING_CONFIG.pcxId, PEERING_CONFIG.requesterProfile, PEERING_CONFIG.region, 'requester');
  } else {
    console.log('No VPC Peering Connection ID provided in the configuration.');
  }
}

main();
