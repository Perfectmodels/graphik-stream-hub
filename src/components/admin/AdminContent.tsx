
import React from "react";

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-auto bg-graphik-dark">
      <div className="max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </main>
  );
};

export default AdminContent;
