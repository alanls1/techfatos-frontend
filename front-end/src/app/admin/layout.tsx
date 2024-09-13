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
      {path === "/admin/login" ? (
        <Navbar
          home="/"
          cpu="/computadores"
          smartphones="/celulares"
          games="/jogos"
        />
      ) : (
        <Navbar
          home="/admin"
          cpu="/admin/computadores"
          smartphones="/admin/celulares"
          games="/admin/jogos"
        />
      )}

      <main>
        {path !== "/admin/login" && <AvatarMenu />}

        {children}
      </main>
    </>
  );
}
