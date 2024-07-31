import Link from "next/link";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Search from "@/app/ui/dashboard/search/search";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { fetchUsers } from "@/app/lib/data";
import { deleteUser } from "@/app/lib/actions";
import { toast } from "react-toastify";

const UsersPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUsers(q, page);

  const handleDelete = async (id) => {
    try {
      const result = await deleteUser(id);
      if (result.success) {
        toast.success("User deleted successfully.");
      } else {
        toast.error(result.message || "Failed to delete user.");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for user..." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {users.map((item) => (
            <tr key={item._id}>
              <td>
                <div className={styles.user}>
                  <Image
                    src={item.img || "/noavatar.png"}
                    alt={item.username}
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {item.username}
                </div>
              </td>
              <td>{item.email}</td>
              <td>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</td>
              <td>{item.isAdmin ? "Admin" : "Client"}</td>
              <td>{item.isActive ? "Active" : "Passive"}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${item._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={item?.id}/>
                   <button
                    className={`${styles.button} ${styles.delete}`}
                  >
                    Delete
                  </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default UsersPage;
