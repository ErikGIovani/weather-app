import useLanguages from "@/hooks/useLanguages";
import styles from "./Loading.module.css";

export default function Loading() {
  const { language } = useLanguages();
  return (
    <div className={styles.main}>
      <h1>{language.loading}</h1>
    </div>
  );
}
