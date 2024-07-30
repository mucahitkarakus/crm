import Link from "next/link"
import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from "@/app/ui/dashboard/search/search"
import Image from "next/image"
import Pagination from "@/app/ui/dashboard/pagination/pagination"
import { fetchUsers } from "@/app/lib/data"

const ProductsPage = async () => {

  const users = await fetchUsers()
  console.log(users)

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
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>johndoe@gmail.com</td>
            <td>15 Agu 2023</td>
            <td>Admin</td>
            <td>Active</td>
             <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/users/test">
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <Link href="/">
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </Link>
                </div>
              </td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>johndoe@gmail.com</td>
            <td>15 Agu 2023</td>
            <td>Admin</td>
            <td>Active</td>
             <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/users/test">
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <Link href="/">
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </Link>
                </div>
              </td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>johndoe@gmail.com</td>
            <td>15 Agu 2023</td>
            <td>Admin</td>
            <td>Active</td>
             <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/users/test">
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <Link href="/">
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </Link>
                </div>
              </td>
          </tr>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className={styles.userImage}
                />
                John Doe
              </div>
            </td>
            <td>johndoe@gmail.com</td>
            <td>15 Agu 2023</td>
            <td>Admin</td>
            <td>Active</td>
             <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/users/test">
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                  <Link href="/">
                    <button className={`${styles.button} ${styles.delete}`}>Delete</button>
                  </Link>
                </div>
              </td>
          </tr>
        </tbody>

      </table>
      <Pagination />
    </div>
  )
}

export default ProductsPage
