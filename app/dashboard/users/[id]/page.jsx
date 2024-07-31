import { updateUser } from "@/app/lib/actions";
import { fetchSingleUser } from "@/app/lib/data";
import styles from "@/app/ui/dashboard/users/singleUsers/singleUser.module.css";
import Image from "next/image";

const SingleUserPage = async ({ params }) => {
    const { id } = params;
    const user = await fetchSingleUser(id);

    return (
        <div className={styles.container}>
            <div className={styles.infoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="" fill />
                </div>
                {user.username}
            </div>
            <div className={styles.formContainer}>
                <form action={updateUser} className={styles.form}>
                    <input type="hidden" name="id" value={user.id} />
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder={user.username}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder={user.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                    />
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder={user.phone}
                    />
                    <label htmlFor="address">Address</label>
                    <textarea
                        name="address"
                        id="address"
                        placeholder={user.address}
                    />
                    <label htmlFor="isAdmin">Is Admin?</label>
                    <select
                        name="isAdmin"
                        id="isAdmin"
                        defaultValue={user.isAdmin ? "true" : "false"}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <label htmlFor="isActive">Is Active?</label>
                    <select
                        name="isActive"
                        id="isActive"
                        defaultValue={user.isActive ? "true" : "false"}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default SingleUserPage;
