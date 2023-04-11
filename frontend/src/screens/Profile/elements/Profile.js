import React, { useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    bio: 'I am a web developer with experience in React and Tailwind CSS.',
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
  });

  return (
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto max-w-md">
        <div className="flex items-center space-x-4">
          <img className="w-12 h-12 rounded-full" src={user.avatarUrl} alt="Avatar" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{user.name}</span>
            <span className="text-gray-500">@{user.username}</span>
          </div>
        </div>
        <div className="mt-6">
          <span className="text-gray-500">Email</span>
          <span className="block text-lg font-semibold mt-1">{user.email}</span>
        </div>
        <div className="mt-6">
          <span className="text-gray-500">Bio</span>
          <span className="block text-lg font-semibold mt-1">{user.bio}</span>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit Profile</button>
        </div>
      </div>
  );
};

export default Profile;
