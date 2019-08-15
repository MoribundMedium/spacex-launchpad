# spacex-launchpad

A demonstration application which exposes launchpad information based on public SpaceX APIs. Specifically, this one: https://api.spacexdata.com/v2/launchpads

This application is not meant for distribution or production. It is only meant for education purposes.

## Installing and running this app

1. Clone this repo to your local machine.
2. `npm install` the required packages from the terminal.
3. `npm start` to start the application.
4. Navigate to `http://localhost:3000/?searchTerm=` in a browser to test the API.
5. `npm run test` to execute the unit tests.

## Built with

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

## Thoughts on LoopBack

I chose to use LoopBack for this challenge because it seemed well-suited to the task. [From the documentation](https://loopback.io/doc/en/lb4/index.html):

> LoopBack is a highly extensible, open-source Node.js framework based on Express that enables you to quickly create APIs and microservices composed from backend systems such as databases and SOAP or REST services.

It's designed to occupy the development space between API and data source, making it easy to swap out an external API with an internal database. The DataSource class can be configured for either one, while a database would use a repository and the external API would use a service for access. LoopBack also uses TypeScript by default, which is quickly becoming a favorite language of mine.

One issue I had is that [the documentation recommends putting business logic in the controllers](https://loopback.io/doc/en/lb4/Controllers.html) while I thought it would make more sense to put some of it in the service layer. For instance, the bonus challenge tasked me with "adding the functionality for consuming clients of the API endpoint(s) to apply filters in order to constrain the launchpad result set." However, [the SpaceX API documentation](https://docs.spacexdata.com/?version=latest#e232e64a-58a2-4bc0-af42-eb20499425cc)\* only provides optional parameters to request one specific launchpad or to paginate the result set. A user-specified filter term should be able to return more than one result and doesn't really care about pagination, so, in my controller, I added a simple filter function to narrow down the result set based on launchpad name and status. However, if the external API were to be swapped out for an internal database, the filtering would presumably be handled in the query or stored procedure. Therefore it seems more reasonable to me that the filtering should be handled in the service class than in the controller. It's not a big deal, but it meant that in my unit testing I chose to test the implementation of the API rather than test the filter function on its own so that the tests wouldn't need to be rewritten when the data source is changed.

## Closing comments

This was the first application I've written using LoopBack, so it's not very extensive. Logging and testing are a bit threadbare but they do work and should cover most cases (side note: I didn't think it was necessary to test the negative case on an object-to-object mapping function where strong typing should prevent others from plugging in random objects, but I'm not entirely certain on that judgment). I realized while logging that I should also add in a GUID system, but ran out of time and figured that it wasn't necessary for the challenge requirements. There are also a few files and features provided by LoopBack that I didn't feel it was necessary to clean up or remove. Reviewers can feel free to ignore the PingController and Explorer page if they would like.

This application was developed solely by me without outside consultation. If there are components that I missed or anti-patterns that I used, it was due to inexperience with the framework or a misunderstanding of how it's intended to be configured.

\* Note that the SpaceX API documentation above is for v3. I couldn't locate v2, but I think it's safe to assume that it wouldn't be too different.
