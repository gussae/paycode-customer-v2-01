// ProfileComponent.tsx
import React, { useState, useEffect } from 'react';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import styles from './Demo.module.css';

export interface Profile {
  bio: string;
  username: string;
}

export interface ProfileComponentProps {
  username: string;
  fetchProfile: (username: string) => Promise<Profile>;
  updateProfile: (profile: Profile) => Promise<Profile>;
}

export const ProfileComponent: React.FC<ProfileComponentProps> = ({
  username,
  fetchProfile,
  updateProfile,
}) => {
  const [profile, setProfile] = useState<Profile>({ bio: '', username: '' });

  const handleFetchProfile = async () => {
    try {
      const fetchedProfile = await fetchProfile(username);
      setProfile(fetchedProfile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //?turns out during spread, extraneous properties might pop
      const { bio, username } = profile;
      await updateProfile({ bio, username });
      console.log('Profile updated');
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  useEffect(() => {
    handleFetchProfile();
  }, [username, fetchProfile]);

  return (
    <Box className={styles.profileContainer}>
      <Text className={styles.boxTextSize}>Profile</Text>
      <div>
        <form onSubmit={handleUpdateProfile}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <label htmlFor="bio">Bio: </label>
            <Input
              id="bio"
              name="bio"
              value={profile.bio}
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
