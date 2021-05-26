import { gql, useQuery } from '@apollo/client';
import { GetStaticProps } from 'next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Characters } from '../components/Characters';
import { Layout } from '../components/Layout';
import client from '../client';
import { SearchForm } from '../components/SearchForm';
import { useState } from 'react';

type Props = {
  charactersData: [];
  pages: number;
  count: number;
  next: number;
  prev: number | null;
};

const MORE_PRODUCTS_QUERY = gql`
  query {
    characters(page: $pageNumber) {
      info {
        count
        pages
        next
        prev
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
`;

export default function Home({
  charactersData,
  pages,
  count,
  next,
  prev,
}: Props) {
  const initialState = charactersData;
  const [characters, setCharacters] = useState(initialState);
  const [term, setTerm] = useState('');
  const [nextPage, setNextPage] = useState(2);

  const { data, loading, error } = useQuery(MORE_PRODUCTS_QUERY, {
    variables: {
      page: nextPage,
    },
  });

  console.log(data);

  console.log('pages', pages, 'count', count, 'next', next, 'prev', prev);

  const submitSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch('/api/searchCharacters', {
      method: 'post',
      body: term,
    });

    const { characters, error } = await res.json();

    if (error) {
      toast.error('An error occurred');
    } else {
      setCharacters(characters);
    }

    setTerm('');
  };

  const searchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  return (
    <Layout title='home'>
      <h1>Rick and Morty</h1>
      <SearchForm
        submitSearch={submitSearch}
        searchInputChange={searchInputChange}
        term={term}
      />
      <ToastContainer />
      {characters && characters.length > 0 && (
        <Characters characters={characters} />
      )}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          info {
            count
            pages
            next
            prev
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
      charactersData: data.characters.results,
      pages: data.characters.info.pages,
      count: data.characters.info.count,
      next: data.characters.info.next,
      prev: data.characters.info.prev,
    },
  };
};
