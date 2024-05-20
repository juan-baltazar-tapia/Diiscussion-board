# Gas or Pass

 Search up a artist and add an album to the discussion! Write down your opinions on every song and upvote thoughfull and intriquing posts. Upvote your favorite songs and comments and enjoy the community.

## Setup

git clone the repository by copy and pasting the following code into your terminal in the desired location.
```js
git clone https://github.com/juan-baltazar-tapia/Gas-or-Pass.git
```
## install node modules, I used node version 20.11.1
cd into the folder 
```js
cd Gas-or-Pass
```
and run npm install
```js
npm install
```

If you don't have nvm or node installed, heres a link
https://nodejs.org/en/download/package-manager/


## Creat a .env file under Gas-or-Pass
and paste the folloing into the .env file
```js
VITE_CLIENT_ID = ''
VITE_CLIENT_SECRET = ''
VITE_SUPABASE_URL = ''
VITE_SUPABASE_KEY = ''
VITE_ACCESS_TOKEN = ''
```

## You will need a spotify developer account to get a client_id and client_secret

First create an account at
https://developer.spotify.com/documentation/web-api

Next, create an app
https://developer.spotify.com/documentation/web-api/concepts/apps

Click on settings on the top right and copy and paset client ID and client secret into your .env file
```js
VITE_CLIENT_ID = 'paste_client_id'
VITE_CLIENT_SECRET = 'paste_client_secret'
```

## Next you will need a supabase account
Create an account at
https://supabase.com/

Create a project, and click on SQL editor on the left hand side.

<img width="210" alt="Screenshot 2024-05-02 at 11 29 43 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/2709840a-6d05-4a08-bcfd-a69b18a2f136">

Copy and paste the following querie, and click run on the bottom left hand side.
```js
CREATE TABLE albums (
  id UUID PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  artist_id UUID,
  total_tracks INT,
  album_name VARCHAR,
  release_date DATE,
  artist_name VARCHAR,
  label VARCHAR,
  album_cover VARCHAR,
  artist_link VARCHAR,
  album_link VARCHAR
);
```

```js
CREATE TABLE artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name VARCHAR
);
```

```js
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  song_id UUID,
  content TEXT,
  upvotes INT DEFAULT 0,
  title VARCHAR
);
```

```js
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  album_id UUID,
  title VARCHAR,
  upvotes INT DEFAULT 0,
  preview_uri VARCHAR,
  duration INT,
  comments INT DEFAULT 0
);
```

## Next go into settings on the bottom left side

<img width="205" alt="Screenshot 2024-05-02 at 11 38 48 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/de9c9bc3-08dd-4a2e-97ce-e0cd95b12518">


Under configuration, click on API

<img width="251" alt="Screenshot 2024-05-02 at 11 39 15 PM" src="https://github.com/juan-baltazar-tapia/Flavor-Fusion/assets/73971599/7307879a-8e74-4e04-b43d-4f05fd9f4e17">

## Copy and paste Project URL into VITE_SUPABASE_URL, and anon public Project Api Key into VITE_SUPABASE_KEY
```js
VITE_SUPABASE_URL = 'insert_ProjecRurl'
VITE_SUPABASE_KEY = 'insert_AnonPublicKey'
```

## Run npm run dev to start the server
```js
npm run dev
```

You will be taken to the home page

## Open console and click on get token on the top right
Copy and paste the access token into the .env file

```js
VITE_ACCESS_TOKEN = 'insert_access_token'
```

Now you will be able to search artists, their albums, and add songs!

## Video Walkthrough

Here's a walkthrough of the website in 4 seperate parts

Creating comments, viewing previous posts (comments), and clicking on comment to view more info.

<img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDAzbjByb2FvZjMxbnFwcTkzbWFlZXJqbDJxam8wanc4bHRjenRzNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JhyizLjshOLFTGwOLl/giphy.gif' title='Video Walkthrough' width='600px' alt='Video Walkthrough' />
Toggling comments by upvotes and time created, editing and deleting comments.

<img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZWpnbXdxOG9hemt0dHhpZ3V1ejB1Z2Rsc252bmFhaWY1NWIwcjVveSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lEQq3HyMT7MvC2QFll/giphy.gif' title='Video Walkthrough' width='600px' alt='Video Walkthrough' />

Upvoting multiple comments and adding an album to the album list.

<img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMmoyMmY2ejFvbzF3eGpla3RleDAwemN0aGVsNHFsc3k5MDRvZzJ3YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8WMYWMYT6gqm377uWK/giphy.gif' title='Video Walkthrough' width='600px' alt='Video Walkthrough' />

Searching comments by title.

<img src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmU2cW95amN4d2Y1amVzbmRzMHl4bzF3OXJlOGd2OHA4cWlvcmNkayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Vd1CunQU9XlahF37FG/giphy.gif' title='Video Walkthrough' width='600px' alt='Video Walkthrough' />


GIF created with ...  
[Kap](https://getkap.co/) for macOS

## License

    Copyright 2024 Juan Baltazar Tapia

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
