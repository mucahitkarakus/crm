import { Product, User } from "./models";
import { connectToDb } from './utils';

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;

    const currentPage = Math.max(1, parseInt(page));

    try {
        await connectToDb();
        const count = await User.countDocuments({ username: { $regex: regex } });
        const users = await User.find({ username: { $regex: regex } })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (currentPage - 1));
        return { count, users };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const fetchProducts = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 5;

    const currentPage = Math.max(1, parseInt(page));

    try {
        await connectToDb();
        const count = await Product.countDocuments({ title: { $regex: regex } });
        const products = await Product.find({ title: { $regex: regex } })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (currentPage - 1));
        return { count, products };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
