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

export const addProduct = async (formData) => {
    const { titlr, desc, price, size, img, stock } = Object.fromEntries(formData);

    try {
        connectToDb();
        const newProduct = new Product({
            titlr,
            desc,
            price,
            size,
            stock,
            img,
        });

        await newProduct.save();
    } catch (error) {
        console.log(error);
    }
};