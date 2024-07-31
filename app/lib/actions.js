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

export const updateUser = async (formData) => {
    const data = Object.fromEntries(formData.entries());
    const { id, username, email, password, phone, address, isAdmin, isActive } = data;

    try {
        await connectToDb();
        const updateFields = {
            username,
            email,
            password,
            phone,
            address,
            isAdmin: isAdmin === 'true',
            isActive: isActive === 'true'
        };
        Object.keys(updateFields).forEach(key => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);
        await User.findByIdAndUpdate(id, updateFields, { new: true }); 
    } catch (error) {
        console.error(error);
    }
};

export const deleteUser = async (dataId) => {
    const { id } = Object.fromEntries(dataId);
    try {
        await connectToDb();
        await User.findByIdAndDelete(id);
    } catch (error) {
        return { success: false, message: `Failed to delete user: ${error.message}` };
    }
};

export const addProduct = async (data) => {
    console.log(data, "1")
    const { title, desc, price, size, img, stock, color, cat } = data;
    
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
            color,
            cat
        });
        console.log(data, "2")
        
        await newProduct.save();
        return { success: true, message: "Product added successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to add product" };
    }
};

export const updateProduct = async (formData) => {
    const { id, title, desc, price, size,stock, color} = Object.fromEntries(formData.entries());

    try {
        await connectToDb();
        const updateFields = { id, title, desc, price, size, stock, color };
        Object.keys(updateFields).forEach(key => (updateFields[key] === "" || updateFields[key] === undefined) && delete updateFields[key]);
        await Product.findByIdAndUpdate(id, updateFields, { new: true });
    } catch (error) {
        console.error(error);
    }
};

export const deleteProduct= async (dataId) => {
    const { id } = Object.fromEntries(dataId);
    try {
        await connectToDb();
        await Product.findByIdAndDelete(id);
    } catch (error) {
        return { success: false, message: `Failed to delete user: ${error.message}` };
    }
};