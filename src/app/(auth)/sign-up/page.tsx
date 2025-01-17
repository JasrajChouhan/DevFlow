"use client";

import AuthForm from "@/components/forms/AuthForm";
import { SignUpSchema } from "@/schema/form-shema";

const page = () => {
  return (
    <AuthForm
      formType="SIGN_UP"
      schema={SignUpSchema}
      defaultValues={{ email: "", password: "", username: "", name: "" }}
      onSubmit={(data) =>
        Promise.resolve({
          success: true,
          data: null,
        })
      }
    />
  );
};

export default page;
