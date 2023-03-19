import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Sidebar from "./Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = router.pathname;
  return (
    <div>
      {path !== "/auth/signin" && <Sidebar />}
      {children}
    </div>
  );
}
