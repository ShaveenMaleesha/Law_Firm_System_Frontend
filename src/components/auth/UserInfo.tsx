import { useAuth } from '../../context/AuthContext';

export const UserInfo: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="w-10 h-10 bg-brand-500 rounded-full flex items-center justify-center text-white font-semibold">
        {user.name ? user.name.charAt(0).toUpperCase() : user.username?.charAt(0).toUpperCase() || 'U'}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          {user.name || user.username}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
          {user.role}
          {user.practiceArea && ` - ${user.practiceArea}`}
        </p>
      </div>
    </div>
  );
};
