import { CardComponent } from "@/components/Auth/Card/CardComponent";
import Image from "next/image";

export default function Page() {
  return (
    <div className="h-screen w-screen relative flex items-center justify-center">
      <div className="w-full h-[50vh] absolute bottom-0">
        <Image
          src={"/Auth/background.png"}
          fill
          alt="bg-img"
          className="h-full w-full object-cover"
        />
      </div>

      <CardComponent
        title="Login"
        description="Login to your account"
        footer="Don't have an account?"
        type="login"
      />
    </div>
  );
}
