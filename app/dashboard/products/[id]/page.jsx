import { updateProduct } from "@/app/lib/actions";
import { fetchSingleProduct } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/products/singleProducts/singleProducts.module.css"
import Image from "next/image"

const SingleProductPage = async ({params}) => {
     const { id } = params;
    const product = await fetchSingleProduct(id);
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image   src={product?.img ||"/noproduct.jpg"} alt="" fill />
                </div>
                {product.title}
            </div>
            <div className={styles.formContainer}>
                <form action={updateProduct} className={styles.form}>
                    <label htmlFor="">Title</label>
                    <input type="text" id="title" name="title" placeholder={product.title} />
                    <label htmlFor="">Price</label>
                    <input type="number" id="price" name="price" placeholder={product.price} />
                    <label htmlFor="">Stock</label>
                    <input type="number" name="stock" id="stock" placeholder={product.stock} />
                    <label htmlFor="">Color</label>
                    <input type="text" name="color" id="color" placeholder={product.color} />
                    <label htmlFor="">Size</label>
                    <textarea type="text" name="size" placeholder={product.size} />
                   <label htmlFor="">Choose a Category</label>
                    <select name="cat" defaultValue={product.cat}>
                        <option value="general">Choose a Category</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="phone">Phone</option>
                        <option value="computer">Computer</option>
                    </select>
                    <label htmlFor="">Description</label>
                    <textarea name="desc" id="desc" rows="16" placeholder={product.desc}></textarea>
                    <button >Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage