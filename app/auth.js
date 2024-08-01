import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDb } from "./lib/utils";
import { User } from "./lib/Schema/User";
import bcrypt from "bcrypt";

const login = async (credentials) => {
    try {
        connectToDb();
        const user = await User.findOne({ username: credentials.username });
        if (!user) throw new Error("Wrong credentials");

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

        if (!isPasswordCorrect) throw new Error("Wrong credentials");

        return user;
    } catch (error) {
        console.log(error);
    }
};

export default NextAuth({
    ...authConfig,
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                try {
                    const user = await login(credentials);
                    return user;
                } catch (error) {
                    return null;
                }
            },
        }),
    ],
});
