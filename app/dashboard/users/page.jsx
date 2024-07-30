import Link from "next/link"
import styles from "@/app/ui/dashboard/users/users.module.css"
import Search from "@/app/ui/dashboard/search/search"

const ProductsPage = async () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for user..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
    </div>
  )
}

export default ProductsPage
