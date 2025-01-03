async function queryHasuraGQL(
  operationsDoc: string,
  operationName: string,
  variables: GQLVariables,
  token: string,
) {
  const result = await fetch(
    process.env.NEXT_PUBLIC_HASURA_ADMIN_URL as string,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName,
      }),
    },
  );

  return await result.json();
}

export async function isNewUser(token: string, issuer: string | null) {
  const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "isNewUser",
    { issuer },
    token,
  );

  return response?.data?.users?.length === 0;
}

export async function createNewUser(token: string, metadata: Metadata) {
  const { issuer, email, publicAddress } = metadata;
  const operationsDoc = `
    mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
      insert_users(objects: {
        email: $email, 
        issuer: $issuer, 
        publicAddress: $publicAddress
      }) {
        returning {
          email
          id
          issuer
        }
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "createNewUser",
    { issuer, email, publicAddress },
    token,
  );

  return response;
}

export async function findVideoIdByUser(
  token: string,
  userId: string,
  videoId: string,
) {
  const operationsDoc = `
  query findVideoIdByUserId($userId: String!, $videoId: String!) {
    stats(where: { userId: {_eq: $userId}, videoId: {_eq: $videoId }}) {
      id
      userId
      videoId
      favourited
      watched
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "findVideoIdByUserId",
    {
      videoId,
      userId,
    },
    token,
  );

  return response?.data?.stats;
}

export async function insertStats(
  token: string,
  { favourited, userId, watched, videoId }: StatsPayload,
) {
  const operationsDoc = `
    mutation insertStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
      insert_stats_one(object: {
        favourited: $favourited, 
        userId: $userId, 
        watched: $watched, 
        videoId: $videoId
      }) {
          favourited
          id
          userId
      }
    }
  `;

  return await queryHasuraGQL(
    operationsDoc,
    "insertStats",
    { favourited, userId, watched, videoId },
    token,
  );
}

export async function updateStats(
  token: string,
  { favourited, userId, watched, videoId }: StatsPayload,
) {
  const operationsDoc = `
  mutation updateStats($favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
    update_stats(
      _set: {watched: $watched, favourited: $favourited},
      where: {
        userId: {_eq: $userId}, 
        videoId: {_eq: $videoId}
      }) {
      returning {
        favourited,
        userId,
        watched,
        videoId
      }
    }
  }
  `;

  return await queryHasuraGQL(
    operationsDoc,
    "updateStats",
    { favourited, userId, watched, videoId },
    token,
  );
}

export async function getWatchedVideos(userId: string, token: string) {
  const operationsDoc = `
  query watchedVideos($userId: String!) {
    stats(where: {
      watched: {_eq: true}, 
      userId: {_eq: $userId},
    }) {
      videoId
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    "watchedVideos",
    {
      userId,
    },
    token,
  );

  return response?.data?.stats;
}

export async function getMyListVideos(userId: string, token: string) {
  const operationsDoc = `
    query favouritedVideos($userId: String!) {
      stats(where: {
        userId: {_eq: $userId},
        favourited: {_eq: 1}, 
      }) {
        userId
        videoId
        watched
        favourited
      }
    }
  `;

  const response = await queryHasuraGQL(
    operationsDoc,
    "favouritedVideos",
    {
      userId,
    },
    token,
  );

  return response?.data?.stats;
}
