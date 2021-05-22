import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';
import Image from 'next/image';

import { useState } from 'react';
import { Layout } from '../components/Layout';
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

export default function Home({ characters }: Props) {
  console.log(characters);

  return (
    <Layout title='home'>
      <main className={styles.main}>
        <h1>Rick and Morty</h1>
        <div className={styles.grid}>
          {characters.map(person => (
            <div key={person.name} className={styles.card}>
              <h3>{person.name}</h3>
              <Image src={person.image} width={300} height={300} />
              <p>Origin: {person.origin.name}</p>
              <p>Location: {person.location.name}</p>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const client = new ApolloClient({
    uri: 'https://rickandmortyapi.com/graphql/',
    cache: new InMemoryCache(),
  });
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
          }
          results {
            id
            name
            species
            image
            location {
              id
              name
            }
            origin {
              id
              name
            }
            episode {
              id
              name
            }
          }
        }
      }
    `,
  });
  return {
    props: {
      characters: data.characters.results,
    },
  };
};
