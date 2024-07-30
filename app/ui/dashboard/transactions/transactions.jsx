import Image from "next/image";
import styles from "./transactions.module.css";

const Transactions = () => {

  const transactionsItems = [
    {
       name: "Emine Meral",
       status: "Pending",
       date: "14.06.2024",
       email: "eminemeral@gmail.com",
       amount: "300$",
       action: "active",
       role: "admin"
    },
   {
       name: "Emre Akyol",
       status: "Canceled",
       date: "25.03.2022",
       email: "emreakyol@gmail.com",
       amount: "4500$",
       action: "active",
       role: "admin"
    },
    {
       name: "Furkan Yakar",
       status: "Done",
       date: "25.07.2024",
       email: "furkanyakar@gmail.com",
       amount: "4400$",
       action: "passive",
       role: "client"
      },
    {
       name: "Serkan Yakar",
       status: "Pending",
       date: "02.08.2022",
       email: "serkanyakar@gmail.com",
       amount: "5500$",
       action: "active",
       role: "admin"
    },
    {
       name: "Fatih Akbulut",
       status: "Pending",
       date: "15.08.2022",
       email: "fatihakbulut@gmail.com",
       amount: "1500$",
       action: "passive",
       role: "client"
    },
    {
       name: "Soner Akbulut",
       status: "Pending",
       date: "02.07.2024",
       email: "sonerakbulut@gmail.com",
       amount: "5500$",
       action: "passive",
       role: "client"
    },
];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Status</td>
            <td>Date</td>
            <td>Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactionsItems.map((item, index) => (
            <tr key={index}>
              <td>
                <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                {item.name}
                </div>
              </td>
               <td className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                {item.status}
              </td>
              <td>{item.date}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
