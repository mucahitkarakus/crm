import styles from "@/app/ui/dashboard/products/singleProducts/singleProducts.module.css"
import Image from "next/image"

const SingleProductPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image   src="/noproduct.jpg" alt="" fill />
                </div>
                Iphone
            </div>
            <div className={styles.formContainer}>
                <form action="" className={styles.form}>
                    <label htmlFor="">Title</label>
                    <input type="text" name="username" placeholder="Iphone" />
                    <label htmlFor="">Price</label>
                    <input type="number" name="price" placeholder="4500$" />
                    <label htmlFor="">Stock</label>
                    <input type="number" name="stock" placeholder="23" />
                    <label htmlFor="">Color</label>
                    <input type="text" name="color" placeholder="red" />
                    <label htmlFor="">Size</label>
                    <textarea type="text" name="size" placeholder="128 Gb" />
                    <label htmlFor="">Choose a Category</label>
                    <select name="cat" id="">
                        <option value="general">Choose a Category</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="phone">Phone</option>
                        <option value="computer">Computer</option>
                    </select>
                    <label htmlFor="">Description</label>
                    <textarea name="desc" id="desc" rows="16" placeholder="It is a Apple"></textarea>
                    <button >Update</button>
                </form>
            </div>
        </div>
    )
}

export default SingleProductPage