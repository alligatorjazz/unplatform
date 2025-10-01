---
title: "Introducing: The Unplatform API!"
dateAdded: 2025-09-30
lede: "Fetch Unplatform recs in .json format!"
tags: [updates, API]
---

Hello everyone. I'm pleased to announce that I've emerged from my cave with a key update for the Unplatform project: you can now send API requests to the Unplatform database and get responses back in JSON format! If you don't know what that means, that's okay - this update probably isn't relevant to you. If you *did* know what that means, though, I'll explain how to make requests below:

# How to Make a Request
In the interest of simplicity, the database API endpoint is just `/database` - same as the normal page. The difference is that when you want the results in JSON format, you add `Accept: application/json` to your GET request header:

```bash
# using httpie in bash - adapt for your http client of choice
http GET "http://localhost:4321/database" "Accept:application/json"
```

This one-liner will get you the full list of all recommendations from the database. Maybe that's what you want - but you're probably looking to filter the recommendations by city, price, or complexity level. We'll get into that next.

# How to Add Filters
You add filters to the request using query params. For example, if I want to get only free recommendations for RSS readers that are iOS compatible, I can make a request like this:

```bash
# using httpie in bash - adapt for your http client of choice
http GET "http://localhost:4321/database?freeOnly=true&category=reader&os=ios" "Accept:application/json"
```

```json
// response body:
[
    {
        "category": [
            "reader"
        ],
        "city": "Digital First",
        "dateAdded": "2025-01-26T00:00:00.000Z",
        "feeds": [
            "RSS"
        ],
        "lastUpdated": "2025-09-30T10:49:26.704Z",
        "literacyLevel": "0",
        "os": [
            "web",
            "ios",
            "android"
        ],
        "pricing": [
            "free",
            "paid"
        ],
        "title": "Feeder",
        "url": "https://feeder.co/"
    },
    {
        "category": [
            "reader"
        ],
        "city": "Digital First",
        "dateAdded": "2025-01-26T00:00:00.000Z",
        "feeds": [
            "RSS"
        ],
        "lastUpdated": "2025-09-30T10:49:26.704Z",
        "literacyLevel": "0",
        "os": [
            "ios",
            "mac"
        ],
        "pricing": [
            "free"
        ],
        "title": "NetNewsWire",
        "url": "https://netnewswire.com/"
    }
]
```

All the same filters that are available to you on the database page itself are also available through the JSON API, including:

- `freeOnly`: `"true" | "false"`
- `category`: `"news" | "magazine" | "blog" | "events" | "reader" | "social network" | "site builder" | "forum" | "organization" | "other" | "all"`
- `maxComplexity`: `"0" | "1" | "2" | "3" | "4"`
- `city`: See the [cities list](https://github.com/alligatorjazz/unplatform/blob/main/src/cities.ts).
- `requireRSS`: `"true" | "false"`
- `requireNewsletter`: `"true" | "false"`
- `os`: `"ios" | "android" | "windows" | "mac" | "linux" | "web"`


Eventually I plan to let you have more complex queries - including multiple categories and excluding some recommendations by certain properties, etc - but this should be good enough for the time being. [I added this functionality for the RSS reader that I've been working on for the last few months](https://fromthesuperhighway.com/issues/update01/), but I figured I'd make it public-facing so that others can leverage Unplatform's database for their own apps! Code away.

P.S. Unplatform has a blog of it's own now! No newsletter for this one - just RSS. Expect to see more posts as I add updates in the future.

Good luck out there,

\- ajazz
