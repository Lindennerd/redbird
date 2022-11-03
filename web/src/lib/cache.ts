import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tweets: {
          keyArgs: false,
          merge: (existing, incomming) => {
            console.log('existing', existing);
            console.log('incomming', incomming);

            if(existing && incomming)
              return [...existing, ...incomming]
          }
        }
      }
    }
  }
})

export default cache;