"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegister } from "@/hooks/Auth/useRegister";
import { useRegisterAdmin } from "@/hooks/Auth/useRegisterAdmin";
import {
  RegisterFormSchema,
  RegisterFormSchemaType,
} from "@/utils/registerForm.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

export const RegisterForm = ({
  isAdmin,
  setOpen,
}: {
  isAdmin: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(RegisterFormSchema),
    mode: "onChange",
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const imageRef = useRef<HTMLInputElement>(null);
  const registerUser = useRegister();
  const registerAdmin = useRegisterAdmin();

  const onSubmit = (data: RegisterFormSchemaType) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("profilePicture", data.profilePicture);
    formData.append("role", isAdmin ? "admin" : "user");
    isAdmin
      ? registerAdmin.mutate(formData, {
          onSuccess: (data) => {
            if (setOpen && data.success) {
              setOpen(false);
              reset();
              setPreviewUrl("");
            }
          },
        })
      : registerUser.mutate(formData, {
          onSuccess: () => {
            reset();
            setPreviewUrl("");
          },
        });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter your name"
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="m@example.com"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="grid gap-2">
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
        <div className="grid gap-2">
          <Label htmlFor="rePassword">Re-Password</Label>
          <Input
            id="rePassword"
            {...register("repassword")}
            type="password"
            placeholder="Enter your password again"
          />
          <p className="text-red-500">{errors.repassword?.message}</p>
        </div>
        <Controller
          name="profilePicture"
          control={control}
          render={({ field }) => (
            <div className="grid gap-2">
              <Label htmlFor="profilePicture">Profile Picture</Label>

              {previewUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="h-24 w-24 rounded-full overflow-hidden border">
                    <Image
                      src={previewUrl}
                      alt="Profile Preview"
                      width={200}
                      height={200}
                      className="object-cover"
                    />
                  </div>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => imageRef.current?.click()}
                  >
                    Choose Another
                  </Button>
                </div>
              ) : null}

              <Input
                type="file"
                accept="image/*"
                ref={(e) => {
                  field.ref(e);
                  imageRef.current = e;
                }}
                style={{ display: previewUrl ? "none" : "block" }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    field.onChange(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }
                }}
              />
              <p className="text-red-500 text-sm">
                {errors.profilePicture?.message}
              </p>
            </div>
          )}
        />
        <div>
          <Input
            type="submit"
            className="bg-[#243874] text-white"
            value={"Register"}
          />
        </div>
      </div>
    </form>
  );
};
