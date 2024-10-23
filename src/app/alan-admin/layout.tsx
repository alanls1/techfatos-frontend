"use client";
import AvatarMenu from "@/components/Avatar/Avatar";
import Navbar from "@/components/Navbar/Navbar";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  return (
    <>
      {path === "/alan-admin/login" ? (
        <Navbar
          home="/"
          cpu="/computadores"
          smartphones="/celulares"
          games="/jogos"
        />
      ) : (
        <Navbar
          home="/alan-admin"
          cpu="/alan-admin/computadores"
          smartphones="/alan-admin/celulares"
          games="/alan-admin/jogos"
        />
      )}

      <main>
        {path !== "/alan-admin/login" && <AvatarMenu />}

        {children}
      </main>
    </>
  );
}
