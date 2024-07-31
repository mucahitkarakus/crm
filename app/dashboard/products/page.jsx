import Pagination from "@/app/ui/dashboard/pagination/pagination"
import Search from "@/app/ui/dashboard/search/search"
import Link from "next/link"
import styles from "@/app/ui/dashboard/products/products.module.css"
import Image from "next/image"
import { fetchProducts } from "@/app/lib/data"
import { deleteProduct } from "@/app/lib/actions"

const ProductsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, products } = await fetchProducts(q, page);

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
          {products.map((item, index) => (
            <tr key={index}>
              <td>
                <div className={styles.product}>
                  <Image
                    src={item.img || "/noproduct.jpg"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.productImage}
                  />
                  {item.title}
                </div>
              </td>
              <td >
                {item.desc}
              </td>
              <td>${item.price}</td>
              <td>{new Date(item.createdAt).toLocaleDateString('tr-TR')}</td>
              <td>{item.stock}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/products/${item?.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>View</button>
                  </Link>
                   <form action={deleteProduct}>
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
  )
}

export default ProductsPage