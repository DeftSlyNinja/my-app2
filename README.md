Supabase:

- Expo React Native connection via Supabase-js
- Contains one table: Games
   - id (uuid): uuid generated via uuid_generate_v4()
   - title (string): Title of video game
   - genre (string): Genre of video game
   - completed (boolean): Whether or not the game has been completed
   - created_at (timestamptz): Date entry was created
   - updated_at (timestamptz): Date entry was last edited

React-Query:

- Query client provider wraps app at the lowest _layout layer
- Initializes new query client
- useGetGames hook pulls all data from the games table and returns it
- useAddGame hook inserts data from formik into the table and invalidates old query
- useUpdateGame updates the entry with a matching id with the provided data and invalidates old query
- useDeleteGames *NOT IMPLEMENTED YET*