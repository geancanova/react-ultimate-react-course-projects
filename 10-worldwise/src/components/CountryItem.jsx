import styles from "./CountryItem.module.css";

import EmojiFlagImage from "./EmojiFlagImage";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <span>
        <EmojiFlagImage emoji={country.emoji} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
