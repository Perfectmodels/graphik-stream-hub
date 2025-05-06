
import React from "react";

interface AdminContentProps {
  children: React.ReactNode;
}

const AdminContent: React.FC<AdminContentProps> = ({ children }) => {
  return (
    <main className="flex-1 p-6 overflow-auto">
      {children}
    </main>
  );
};

export default AdminContent;
