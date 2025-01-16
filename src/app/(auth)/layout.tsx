import React from "react";

const AuthLayout = ({ children }: { chidren: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
