import Image from 'next/image';

import styles from '../styles/Home.module.css';

type PersonProps = {
  name: string;
  id: string;
  species: string;
  image: string;
  origin: {
    id: string;
    name: string;
  };
  location: {
    id: string;
    name: string;
  };
  episode: string[];
};

type Props = {
  characters: PersonProps[];
};

export const Characters = ({ characters }: Props) => {
  return (
    <div className={styles.grid}>
      {characters.map(person => (
        <div key={person.name} className={styles.card}>
          <h3>{person.name}</h3>
          <Image src={person.image} width={300} height={300} />

          <div>
            <p>Origin: {person.origin.name}</p>
            <p>Location: {person.location.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
