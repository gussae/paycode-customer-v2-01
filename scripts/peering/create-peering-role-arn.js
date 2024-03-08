//! This has to run separately first so that you can have a Role to supply to the VPC to be created and request the connection with automatic acceptance. You cannot create a route here b/c that VPC doesn't exist yet.
const {
  IAMClient,
  CreateRoleCommand,
  PutRolePolicyCommand,
} = require('@aws-sdk/client-iam');
const { writeFile } = require('fs/promises');
const path = require('path');
const { getAwsCredsProvider } = require('@paycode-customer-v2/lib');
const config = require('./peering.config.json');
//console.log(config)

// Configure credentials
const credentials = getAwsCredsProvider(config.accepterProfile);

// Initialize IAM client
const iam = new IAMClient({
  region: config.region,
  credentials,
});

const roleName = 'VPCPeeringRole';
const assumeRolePolicyDocument = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Principal: {
        AWS: `arn:aws:iam::${config.requesterAccount}:root`,
      },
      Action: 'sts:AssumeRole',
    },
  ],
};

const rolePolicyDocument = {
  Version: '2012-10-17',
  Statement: [
    {
      Effect: 'Allow',
      Action: [
        'ec2:AcceptVpcPeeringConnection',
        'ec2:CreateVpcPeeringConnection',
        'ec2:DeleteVpcPeeringConnection',
        'ec2:ModifyVpcPeeringConnectionOptions',
        'ec2:DescribeVpcPeeringConnections',
        'ec2:CreateRoute',
        'ec2:DeleteRoute',
        'ec2:ReplaceRoute',
      ],
      Resource: '*',
    },
  ],
};

async function createRoleAndAttachPolicy() {
  try {
    const createRoleResponse = await iam.send(
      new CreateRoleCommand({
        RoleName: roleName,
        AssumeRolePolicyDocument: JSON.stringify(assumeRolePolicyDocument),
        Description: 'Role to facilitate VPC Peering',
      }),
    );

    console.log('Role created:', createRoleResponse.Role.Arn);

    await writeFile(
      path.resolve(__dirname, 'peeringRoleArn.json'),
      JSON.stringify({ RoleArn: createRoleResponse.Role.Arn }, null, 2),
    );

    await iam.send(
      new PutRolePolicyCommand({
        RoleName: roleName,
        PolicyName: `${roleName}Policy`,
        PolicyDocument: JSON.stringify(rolePolicyDocument),
      }),
    );
    console.log('Policy attached to role successfully');
  } catch (err) {
    console.error('Error:', err);
  }
}

createRoleAndAttachPolicy();
