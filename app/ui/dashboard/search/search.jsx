"use client"
import { MdSearch } from "react-icons/md"
import styles from "./search.module.css"
import { useRouter} from "next/navigation"

const Search = ({ placeholder }) => {
  const router = useRouter();


 const handleSearch = (e) => {
    const query = e.target.value;

    const params = new URLSearchParams(window.location.search);

    params.set("page", 1)

    if (query) {
     query.length > 2 && params.set("q", query);
    } else {
      params.delete("q");
    }

    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
