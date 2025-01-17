"use client";
import AuthForm from "@/components/forms/AuthForm";
import { SignInSchema } from "@/schema/form-shema";

const page = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schema={SignInSchema}
      defaultValues={{ email: "", password: "" }}
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
