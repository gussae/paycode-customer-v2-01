/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  updateProfile as _updateProfile,
  getProfile
} from '@paycode-customer-v2/graphql/dist/cjs';
import { generateClient } from 'aws-amplify/api';
//! using types from the ui-components (named identical with the types from the apigw b/c the demo actually )
import {
  Profile
} from '@paycode-customer-v2/ui-components';

//graphql
export async function fetchProfile(username: string) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: getProfile,
    variables: { username },
  });
  console.log(2331, 'Fetched profile:', data.getProfile);
  if (data && data.getProfile) {
    const profile = data.getProfile;
    console.log(2331, 'Fetched profile:', profile);
    return profile as Profile;
  } else {
    return { bio: '', username: '' };
  }
}

export async function updateProfile(profile: {
  bio: string;
  username: string;
}) {
  const client = generateClient();
  const { data } = await client.graphql({
    query: _updateProfile,
    variables: { input: profile },
  });
  console.log(2332, 'Profile updated:', data);
  if (data && data.updateProfile) return data.updateProfile as Profile;
  else return { bio: '', username: '' };
}



