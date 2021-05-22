import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { GetStaticProps } from 'next';

import styles from '../styles/Home.module.css';
import { Characters } from '../components/Characters';
import { Layout } from '../components/Layout';

type Props = {
  characters: [];
};

export default function Home({ characters }: Props) {
  return (
    <Layout title='home'>
      <main className={styles.main}>
        <h1>Rick and Morty</h1>
        <Characters characters={characters} />
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
