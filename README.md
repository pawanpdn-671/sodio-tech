# EXPLANATION OF THE PROJECT

## Introduction

This weather app allows users to get a detailed weather forecast around the globe just by searching for the specific city name. It uses a weather API to fetch and display weather information at 3-hour intervals for the next 5 days.

## Features

-  View a 5-day weather forecast.
-  Detailed weather data at 3-hour intervals.
-  Displays temperature, weather conditions, and time.
-  User-friendly interface with responsive design.

## Dependencies

-  The components are designed and developed completely from scratch, but for convenient I had used bootstrap cdn and lucide-react for icons.

## Project Explanation

-  When users choose to enable geolocation, the app requests permission to access their location. Once granted, it retrieves the current latitude and longitude and uses these coordinates to fetch the weather data for the current location.

-  Users type a city name into the search bar. As they type, the app queries the weather API for matching city names and displays suggestions. When a user selects a city from the suggestions, the app retrieves and displays the current weather and 5-day forecast for that city.

-  After a city search, the app saves the search details in local storage. When users revisit the app, the most recent search data is automatically loaded from local storage, allowing users to view their last searched weather information without having to perform the search again

## Setup

To get started with the project, follow these steps:

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/pawanpdn-671/sodio-tech.git
cd sodio-tech
npm install
```

-  Create .env file in the root of the project.
-  Login/signup to [open weather platform](https://openweathermap.org/) to get the api key.
-  Create env variable called VITE_OPEN_WEATHER_API_KEY and paste the key.
-  Now, run the project with the command "npm run dev" and you are good to go.
