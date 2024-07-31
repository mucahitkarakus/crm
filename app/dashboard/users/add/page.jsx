"use client";
import React, { useState, useEffect } from "react";
import { addUser } from "@/app/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/navigation";

const AddUserPage = () => {
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(2);
  const [toastId, setToastId] = useState(null); 
  const router = useRouter();

  useEffect(() => {
    let timer;
    if (toastId && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push('/dashboard/users');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [toastId, countdown, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.IsActive = data.IsActive === "true";
    data.IsAdmin = data.IsAdmin === "true";

    try {
      const response = await addUser(data);
      if (response.success) {
        const id = toast.success(
          <div>
            {response.message || "User added successfully"}<br />
            Redirecting in... {countdown} seconds
          </div>,
          { autoClose: false } 
        );
        setToastId(id);
      } else {
        toast.error(response.message || "Failed to add user");
      }
    } catch (error) {
      toast.error("Failed to add user");
      console.error("Error adding user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Username" name="username" required />
        <input type="email" placeholder="Email" name="email" required />
        <input type="password" placeholder="Password" name="password" required />
        <input type="text" placeholder="Phone" name="phone" />
        <select name="IsActive" id="IsActive">
          <option value="">Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select name="IsAdmin" id="IsAdmin">
          <option value="">Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea name="address" id="address" rows="16" placeholder="Address"></textarea>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? <ClipLoader size={24} color={"#fff"} /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddUserPage;
