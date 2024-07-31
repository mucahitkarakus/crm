"use server";
import { Product } from "./Schema/Product";
import { User } from "./Schema/User";
import { connectToDb } from "./utils";
import bcrypt from "bcrypt";

export const addUser = async (formData) => {
    const { username, email, password, phone, address, IsAdmin, IsActive } = formData;
    try {
        await connectToDb();
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return { success: false, message: "Username already taken" };
        }
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return { success: false, message: "Email already taken" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            phone,
            address,
            isAdmin: IsAdmin,
            isActive: IsActive
        });
        await newUser.save();
        return { success: true, message: "User added successfully" };
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            const message = field === 'username' ? "Username already taken" :
                field === 'email' ? "Email already taken" :
                    "Failed to add user";
            return { success: false, message };
        }
        return { success: false, message: "Failed to add user" };
    }
};

export const addProduct = async (data) => {
    const { title, desc, price, size, img, stock, color } = data;

    try {
        await connectToDb();
        const existingProduct = await Product.findOne({ $or: [{ title }, { desc }] });
        if (existingProduct) {
            if (existingProduct.title === title) {
                return { success: false, message: "Product with this title already exists" };
            }
            if (existingProduct.desc === desc) {
                return { success: false, message: "Product with this description already exists" };
            }
        }

        const newProduct = new Product({
            title,
            desc,
            price,
            size,
            stock,
            img,
            color
        });

        await newProduct.save();
        return { success: true, message: "Product added successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to add product" };
    }
};