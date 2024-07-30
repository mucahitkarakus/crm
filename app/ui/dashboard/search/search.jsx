"use client"
import { MdSearch } from "react-icons/md"
import styles from "./search.module.css"
import { usePathname, useSearchParams , useRouter} from "next/navigation"

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


 const handleSearch = (e) => {
    const query = e.target.value;

    const params = new URLSearchParams(window.location.search);
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
