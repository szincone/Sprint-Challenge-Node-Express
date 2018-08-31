# Review Questions

## What is Node.js?

It's the chrome v8 engine that lets us run js outside of the browser. That way we can use it as a back-end as well.

## What is Express?

Express is a middleware for Node that lets us interact with an API.

## Mention two parts of Express that you learned about this week.

I know we had used middleware with redux, it didn't occur to me what middleware was until we started using express. 1, I learned what middleware really was (a function that intercepts or acts as a middleman between the server and the db) and 2, I learned how to write custom middleware that you can make do whatever you want(we went with uppercasing name).

## What is Middleware?

A function that intercepts or acts as a middleman between the server and the db.

## What is a Resource?

Your database contains objects that have key-value pairs. The value in a lot of these are actual functions. A resource are things like those objects.

## What can the API return to help clients know if a request was successful?

200 status code means success. Usually want to include a message chained on after for more clarity.

## How can we partition our application into sub-applications?

Using things like routes, lets us basically make mini applications within express that we can then link together using routes to make one big application.

## What is express.json() and why do we need it?

It's a parser that breaks down incoming JSON objects. It tries to look at the content-type of the request and moves it from there.
