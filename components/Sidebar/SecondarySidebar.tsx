export const SecondarySidebar = ({ active }: { active: string | null }) => {
  return (
    <div
      className={`
        transition-all duration-300 bg-[#1A1A1A] border-r border-zinc-800 text-white 
        ${active ? "w-[220px] opacity-100" : "w-0 opacity-0"} overflow-hidden
      `}
    >
      <div className="p-4">
        {active === "user" && (
          <div className="flex flex-col gap-5 pt-3">
            <div>User Access Management</div>
            <div>Admin User List</div>
            <div>Users</div>
          </div>
        )}

        {active === "story" && (
          <div className="flex flex-col gap-5 pt-3">
            <div>Add Story</div>
            <div>View Story</div>
            <div>View Schedule Story</div>
            <div>E-Paper PDF List</div>
            <div>Create Poll</div>
            <div>Video List</div>
            <div>Contact List</div>
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
