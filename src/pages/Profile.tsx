
import UserProfile from '@/components/profile/UserProfile';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const handleUpdateProfile = (updatedData: Partial<typeof user>) => {
    updateUserProfile(updatedData);
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>
      
      {user && <UserProfile user={user} onUpdateProfile={handleUpdateProfile} />}
    </div>
  );
};

export default Profile;
