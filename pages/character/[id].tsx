import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { Layout } from '../../components/Layout';
import client from '../../client';
import gql from 'graphql-tag';
import Link from 'next/link';

type CharacterProps = {
  name: string;
  image: string;
  origin: { name: string };
};

type Props = {
  character: CharacterProps;
};

const Character = ({ character }: Props) => {
  return (
    <Layout title='CHARACTER NAME GOES HERE'>
      <Link href='/'>Back home</Link>
      <h1>{character.name}</h1>
      <p>Origin {character.origin.name}</p>
      <Image
        src={character.image}
        width={200}
        height={150}
        alt={character.name}
      />
    </Layout>
  );
};
export default Character;

export const getServerSideProps: GetServerSideProps = async context => {
  console.log(context.params?.id);

  const { data } = await client.query({
    query: gql`
      query {
        character(id: ${context.params?.id}) {
          id
          name 
          image
          origin {
            name
          }
        }
      }
    `,
  });
  return {
    props: {
      character: data.character,
    },
  };
};
