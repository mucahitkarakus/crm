"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Importing the style is important
import { addProduct } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/products/addProduct/addProduct.module.css";

const AddProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(2); // Countdown duration
  const [toastId, setToastId] = useState(null); // Store the toast ID
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (toastId) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/dashboard/products');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [toastId, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await addProduct(data);
      if (response.success) {
        const id = toast.success(
          <div>
            {response.message || "Product added successfully"}<br />
            Redirecting in {countdown} seconds
          </div>,
          { autoClose: false }
        );
        setToastId(id);
      } else {
        toast.error(response.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("Failed to add product");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="title" name="title" required />
        <select name="cat">
          <option value="general">Choose a Category</option>
          <option value="kitchen">Kitchen</option>
          <option value="phone">Phone</option>
          <option value="computer">Computer</option>
        </select>
        <input type="number" placeholder="price" name="price" />
        <input type="number" placeholder="stock" name="stock" />
        <input type="text" placeholder="color" name="color" />
        <input type="text" placeholder="size" name="size" />
        <textarea name="address" id="address" rows="16" placeholder="Address"></textarea>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;
