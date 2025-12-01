"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/Auth/useLogin";
import { LoginFormSchema, LoginFormSchemaType } from "@/utils/loginForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormSchemaType>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onChange",
  });
  const login = useLogin();

  const onSubmit = (data: LoginFormSchemaType) => {
    login.mutate(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="Enter your username"
        />
        <p className="text-red-500">{errors.username?.message}</p>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          {...register("password")}
          type="password"
          placeholder="Enter your password"
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <div>
        <Input
          type="submit"
          className="bg-[#243874] text-white mt-5"
          value={"Login"}
        />
      </div>
    </form>
  );
};
