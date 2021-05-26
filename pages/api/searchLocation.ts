import gql from 'graphql-tag';
import { NextApiRequest, NextApiResponse } from 'next';
import client from '../../client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const search = req.body;
  try {
    const { data } = await client.query({
      query: gql`
        query location {
          location(id: "${search}") {
            name
            type
            dimension
            residents {
              id
              name
            }
          }
        }
      `,
    });
    res.status(200).json({ location: data.characters.results, error: null });
  } catch (error) {
    if (error.message === '404: Not Found') {
      res.status(400).json({ location: null, error: 'No Location Found' });
    } else {
      res.status(500).json({ location: null, error: 'Internal Error' });
    }
  }
};
