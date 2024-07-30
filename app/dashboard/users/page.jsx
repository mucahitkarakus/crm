import Link from "next/link"
import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchUsers } from "@/app/lib/data"

const ProductsPage =  async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const users = await fetchUsers(q);

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
          {users.map((item, index) => (
            <tr key={index}>
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
                  <Link href="/">
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
      <Pagination />
    </div>
  )
}

export default ProductsPage
