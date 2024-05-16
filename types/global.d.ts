interface GQLVariables {
  [propName: string]: string | number | boolean | null
}

interface Metadata {
  issuer: string | null;
  publicAddress: string | null;
  email: string | null;
}

interface StatsPayload {
  favourited: number,
  userId: string,
  watched: boolean,
  videoId: string,
}

interface Video {
  id: string,
  videoId: string,
  imgUrl: string,
  title: string, 
  publishTime: string, 
  description: string, 
  channelTitle: string,
  statistics: { 
    viewCount: number 
  }
}

interface YoutubeVideo {
  id,
  snippet: {
    title: string, 
    publishedAt: string, 
    description: string, 
    channelTitle: string,
  },
  statistics: {
    viewCount: number,
  }
}