import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import Image from "next/image"

const ProductsPage = () => {
  return (
       <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a products..." />
        <Link href="/dashboard/products/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Description</td>
            <td>Price</td>
            <td>Created At</td>
            <td>Stock</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
             <td>
              <div className={styles.product}>

                  <Image
                  src="/noproduct.jpg"
                  className={styles.productImage}
                  width={40}
                  height={40}
                  alt="User Avatar"
                  />
                Iphone
                  </div>
             </td>
            <td>It is a Iphone</td>
            <td>13500$</td>
            <td>15 Agu 2024</td>
            <td>12</td>
            <td>
                <div className={styles.buttons}>
                  <Link href="/dashboard/user">
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