import Link from "next/link";
import { usePathname } from "next/navigation";

export const SecondarySidebar = ({ active }: { active: string | null }) => {
  const path = usePathname();
  console.log(path);
  return (
    <div
      className={`
        transition-all duration-500 ease-in-out bg-[#1A1A1A] border-r border-zinc-800 text-white 
        ${active !== "dashboard" && active !== "priority" && active ? "w-[220px] opacity-100" : "w-0 opacity-0"} overflow-hidden
      `}
    >
      <div className="p-4">
        {active === "user" && (
          <div className="flex flex-col gap-5 pt-3">
            <Link
              href={"/user/userAccessManagement"}
              className={`${path == "/user/userAccessManagement" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1 text-[15px]`}
            >
              User Access Management
            </Link>
            <Link
              href={"/user/adminUserList"}
              className={`${path == "/user/adminUserList" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1 text-[15px]`}
            >
              Admin User List
            </Link>
            <Link
              href={"/user/users"}
              className={`${path == "/user/users" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1 text-[15px]`}
            >
              Users
            </Link>
          </div>
        )}

        {active === "story" && (
          <div className="flex flex-col gap-3 pt-3">
            <Link
              href={"/story/addStory"}
              className={`${path == "/story/addStory" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              Add Story
            </Link>
            <Link
              href={"/story/viewStory"}
              className={`${path == "/story/viewStory" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              View Story
            </Link>
            <Link
              href={"/story/verifyStory"}
              className={`${path == "/story/verifyStory" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              Verify Story
            </Link>
            <Link
              href={"/story/pdfList"}
              className={`${path == "/story/pdfList" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              E-Paper PDF List
            </Link>
            <Link
              href={"/story/createPoll"}
              className={`${path == "/story/createPoll" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              Create Poll
            </Link>
            <Link
              href={"/story/videoList"}
              className={`${path == "/story/videoList" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              Video List
            </Link>
            <Link
              href={"/story/contactList"}
              className={`${path == "/story/contactList" ? "bg-gray-700 " : ""} rounded-lg px-2 py-1`}
            >
              Contact List
            </Link>
          </div>
        )}

        {active === "tools" && (
          <div className="flex flex-col gap-5 pt-3">
            <div>Category Management</div>
            <div>Meta Management</div>
            <div>Download Report</div>
          </div>
        )}
      </div>
    </div>
  );
};
