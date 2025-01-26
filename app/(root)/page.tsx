import AuthActions from "@/components/navigation/navlinks/AuthActions";
import { isLoggedIn } from "@/lib/actions";
import React from "react";

const Page = async () => {
  const isAuthenticated = await isLoggedIn();

  return isAuthenticated ? <p>Authenticated!</p> : <AuthActions />;
};

export default Page;
