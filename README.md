# Generate migration sql queries

You need the following .env to run the script:
```
DATABASE_URL=postgres:....the_postgres_url
DAM_API_URL=...the_API_endpoint
```

Then runing ```node ./lib/index.js``` will create the tmp/queries.sql which will contains all the queries that need to be run on the database to match tags and locations
