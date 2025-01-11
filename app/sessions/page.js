"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Profile() {
  return (
    <SessionProvider>
      <ProfileContent />
    </SessionProvider>
  );
}

function ProfileContent() {
  const { data: session } = useSession();
 console.log(session);
  if (!session) {
    return <p>You are not logged in.</p>;
  }

  return <p>Welcome, {session.user.username}. Your ID is {session.user.id}  Your session expires on: {new Date(session.expires).toLocaleString()} </p>;
}
