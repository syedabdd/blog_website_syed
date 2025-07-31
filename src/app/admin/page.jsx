// admin/page.jsx
import AdminPost from "@/components/adminPost/AdminPost";
import AdminPostForm from "@/components/adminPostForm/AdminPostForm";
import AdminUser from "@/components/adminUser/AdminUser";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (!session.user?.isAdmin) {
    redirect("/");
  }

  return (
    <div className="min-h-screen  text-white p-2 py-10 grid md:grid-cols-2 gap-10">
      {/* Posts Section */}
      <div>
        
        <AdminPost />
      </div>

      <div>
        
      <AdminPostForm />
      </div>

      {/* Users Section */}
      <div>
      
     <AdminUser />
      </div>

      <div>
       <AdminUserForm />
      </div>
    </div>
  );
}
