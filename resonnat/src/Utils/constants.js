import { gql } from '@apollo/client';

export const LOGIN_URL = 'http://localhost:5000/login';
export const REGISTER_URL = 'http://localhost:5000/register';
export const INFO_URL = 'http://localhost:5000/info';
export const APOLLO_SERVER = 'http://localhost:5001';
export const FURNITURES = gql`
  query {
    furnitures {
      id
      name
      type
      designer {
        name
      }
      vendor {
        name
      }
      unitCost
      sizeWxLxH
      inStock
      description
    }
  }
`;
export const DESIGNERS = gql`
  query {
    designers {
      name
    }
  }
`;

export const DFV_NAMES = gql`
  query {
    designers {
      name
    }
    furnitures {
      name
    }
    vendors {
      name
    }
  }
`;
