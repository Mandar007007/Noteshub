import { auth } from '@/auth';
import React, { } from 'react';

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="w-full min-h-screen relative bg-white">
      <div className="first w-full h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl font-bold text-black mb-4 text-element">
          NotesHub {user?.username}
        </h1>
        <p className="text-lg text-gray-700 max-w-lg text-element">
          Welcome to NotesHub, your go-to platform for organizing and managing your notes effortlessly. 
          With a clean and intuitive interface, you can easily create, edit, and categorize your notes 
          to enhance your productivity. Start taking control of your ideas today!
        </p>
      </div>
    </div>
  );
}

