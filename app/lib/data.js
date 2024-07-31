import { connectToDb } from './utils';
import { Product } from "./Schema/Product";
import { User } from "./Schema/User";

export const fetchUsers = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 10;

    const currentPage = Math.max(1, parseInt(page));

    try {
        await connectToDb();
        const count = await User.countDocuments({ username: { $regex: regex } });
        const users = await User.find({ username: { $regex: regex } })
            .sort({ createdAt: -1 })
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
    const ITEM_PER_PAGE = 10;

    const currentPage = Math.max(1, parseInt(page));

    try {
        await connectToDb();
        const count = await Product.countDocuments({ title: { $regex: regex } });
        const products = await Product.find({ title: { $regex: regex } })
            .sort({ createdAt: -1 })
            .limit(ITEM_PER_PAGE)
            .skip(ITEM_PER_PAGE * (currentPage - 1));
        return { count, products };
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
