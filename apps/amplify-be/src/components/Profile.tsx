import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';
import { updateProfile } from '../graphql/mutations';
import { getProfile } from '../graphql/queries';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styles from '../css/Demo.module.css';
interface ProfileComponentProps {
  username: string;
}
const ProfileComponent: React.FC<ProfileComponentProps> = ({ username }) => {
  const [profile, setProfile] = useState({ bio: '', username: '' });
  const client = generateClient();

  const fetchProfile = async () => {
    try {
      const result = await client.graphql({
        query: getProfile,
        variables: { username },
      });
      if (result.data.getProfile) {
        const { bio = '', username } = result.data.getProfile;
        setProfile({
          bio: bio || '',
          username,
        });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleUpdateProfile = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const result = await client.graphql({
        query: updateProfile,
        variables: { input: profile },
      });
      console.log('Profile updated:', result);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [username]);

  return (
    <Box className={styles.profileContainer}>
      <Text className={styles.boxTextSize}>Profile</Text>
      <div >
        <form onSubmit={handleUpdateProfile}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <label htmlFor="bio">Bio: </label>
            <Input
              id="bio"
              name="bio"
              value={profile.bio || ''}
              onChange={e => setProfile({ ...profile, bio: e.target.value })}
            />
            <Button mt={4} type="submit">
              Update Profile
            </Button>
          </div>
        </form>
        <Box>
          <div>Username: {profile.username}</div>
          <div>Bio: {profile.bio}</div>
        </Box>
      </div>
    </Box>
  );
};

export default ProfileComponent;
