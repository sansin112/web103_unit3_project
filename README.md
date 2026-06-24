# Web 103 Project 3 - Play! Pokémon Hub

Submitted by: **Sanvi**

About this web app: **Play! Pokémon Hub** is a full-stack web application designed for competitive Pokémon Trading Card Game (TCG) players to explore official major championship venues, track real-time event schedules, and view accurate live countdowns to legendary circuit matchups like the 2026 World Championships.

Time spent: **8** hours spent in total

## Required Features

The following **required** functionality is completed:

* [x] **Database Architecture**: Created a multi-table relational PostgreSQL database hosted on Render with a `locations` table and an `events` table (one-to-many relationship).
* [x] **Robust Seeding Script**: Created a `reset.js` file that drops, re-creates, and seeds the cloud database with real-world 2026 event metrics.
* [x] **Custom API Routes**: Designed Express endpoints allowing the client to fetch all locations, individual locations by ID, and all events assigned to a specific venue path.
* [x] **Dynamic Frontend Routing**: Configured React Router (`App.jsx`) to handle fully dynamic parametric paths (`/location/:id`) rather than hardcoded client strings.
* [x] **Complete Data Hydration**: Web app dynamically loads location info and matches from the backend into the UI using lifecycle hooks and modular API service modules.

The following **stretch** features are implemented:

* [x] **Real-Time Countdown Clocks**: Implemented a ticking state-driven JavaScript interval timer that calculates exact days, hours, minutes, and seconds remaining until future events.
* [x] **Smart Chronological Filtering**: Automatically structures the client interface into distinct "Upcoming Scheduled Matches" and "Historical Arena Standings" lists based on the current system date.
* [x] **Sleek Custom Dark Arena Theme**: Wiped out standard placeholder assets to construct a highly responsive, custom CSS-styled dark mode gaming interface.

## Video Walkthrough

Here's a walkthrough of implemented user stories:

![GIF Walkthrough](pokemon.gif)

## Technical Stack Used

* **Frontend**: React.js, Vite, React Router v6, JavaScript (ES6+), Custom CSS Transitions
* **Backend**: Node.js, Express.js, Cors, Dotenv
* **Database**: PostgreSQL (pg), Cloud Hosted via Render Database Instances

## Challenges Encountered

One of the main challenges encountered was managing cross-origin environment variables and port sync between the separate Vite frontend and Express backend pipelines. We initially ran into database connection failures (`ECONNREFUSED 127.0.0.1:5432`) during deployment because the database pool instance was initializing before `dotenv` could fully parse our environment string. Re-ordering our asynchronous entry points inside `reset.js` to prioritize loading configuration parameters completely resolved our cloud network requests.

Additionally, handling dynamic state tracking across parametric React Router viewports posed a challenge. Because the starter template came with static, hardcoded endpoints (`/echolounge`, `/houseofblues`), clicking on custom generated venue cards threw severe path mismatches. Refactoring our navigation array to leverage wildcard variables (`/location/:id`) alongside the `useParams` hook allowed our client services to elegantly fetch and map server logs on demand.

## License

Copyright 2026 Sanvi

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
