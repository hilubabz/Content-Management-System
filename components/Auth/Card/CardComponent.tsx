import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RegisterForm } from "../AuthForm/RegisterForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export const CardComponent = ({
  title,
  description,
  footer,
  type,
}: {
  title: string;
  description: string;
  footer: string;
  type: string;
}) => {
  return (
    <ScrollArea className="h-[70vh] w-lg shadow-2xl rounded-md">
      <Card className="w-full max-w-lg z-999 overflow-auto border-none">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
        <CardFooter className="flex justify-center">
          {footer}
          <Button variant={"link"} className="text-blue-500">
            {type == "register" ? (
              <Link href={"/login"}>Login</Link>
            ) : (
              <Link href={"register"}>Register</Link>
            )}
          </Button>
        </CardFooter>
      </Card>
    </ScrollArea>
  );
};
