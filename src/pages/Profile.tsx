
import UserProfile from '@/components/profile/UserProfile';

type ProfileProps = {
  user: {
    name: string;
    email: string;
    height: number;
    weight: number;
    gender: string;
    age: number;
  };
  setUser: (user: any) => void;
};

const Profile = ({ user, setUser }: ProfileProps) => {
  const handleUpdateProfile = (updatedData: Partial<ProfileProps['user']>) => {
    setUser({
      ...user,
      ...updatedData,
    });
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information</p>
      </div>
      
      <UserProfile user={user} onUpdateProfile={handleUpdateProfile} />
    </div>
  );
};

export default Profile;
