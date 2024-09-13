"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthHOC = (props: any) => {
    const router = useRouter();
    const token = Cookies.get("CinetokAuthToken");

    useEffect(() => {
      if (!token) {
        router.push("/admin/login");
      }
    }, [token, router]);

    if (!token) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthHOC.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthHOC;
};

export default withAuth;
