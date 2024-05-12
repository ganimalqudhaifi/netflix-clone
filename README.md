## UI library
- React Bootstrap
- TailwindCSS
- Framer Motion
- React Modal

## library
- Youtube API
- Magic Links

## Feature
- SSR
- Authentication (Magic Links, JWT)

## Configure the SDK
In the root directory of your project, add the file  `.env.local` with the following environment variables:
- `YOUTUBE_API_KEY`: Your Google Cloud Console APIs Credentials
- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY`: Your Magic application's publishable API key
- `MAGIC_SERVER_KEY`: Your Magic application's server key
- `DEVELOPMENT`: Boolean value that affects the API usage, indicating whether it's for development purposes or not
- `NEXT_PUBLIC_HASURA_ADMIN_URL`: Your Hasura application's database url
- `NEXT_PUBLIC_HASURA_ADMIN_SECRET`: Your Hasura application's admin secret
- `JWT_SECRET`: Your JWT secret or private key used for signing

