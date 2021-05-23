import { NextApiRequest, NextApiResponse } from 'next';
import { gql } from '@apollo/client';
import client from '../../client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${search}" }) {
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
    res.status(200).json({ characters: data.characters.results, error: null });
  } catch (error) {
    if (error.message === '404: Not Found') {
      res.status(400).json({ characters: null, error: 'No character found' });
    } else {
      res.status(500).json({ characters: null, error: 'Internal error' });
    }
  }
};
