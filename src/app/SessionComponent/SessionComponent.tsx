"use client"; // ✅ ทำให้ Component นี้เป็น Client Component

import { useSession } from "next-auth/react";

interface SessionComponentProps {
  NoSessionComponent: React.ElementType;
  InSessionComponent: React.ElementType;
}

export default function SessionComponent({ NoSessionComponent, InSessionComponent }: SessionComponentProps) {
  const { data: session } = useSession();

  // ✅ Render JSX Components
  return session?.user?.id ? <InSessionComponent /> : <NoSessionComponent />;
}
