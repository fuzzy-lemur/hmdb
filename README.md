# HMDB 🍿🙈

HMDB stands for **H**orrible **M**ovie **D**ata**B**ase. Basically its like IMDB,
but the horribleness comes not only from the super-hacky styling, but also from
the fact that you will find here only movies that are really really bad (rated
1-3 on the IMDB scale of 10)

## Running HMDB

> This guide assumes that you have `git` and `npm` installed in your environment

First you would need to clone the source repo and go into it:

    git clone https://github.com/fuzzy-lemur/hmdb.git
    cd hmdb

From here you can run HMDB in development mode with

    npm start

Or build and serve the production version:

    npm run build
    npm install -g serve
    serve -s build

In both cases the HMDB app should be accessible at `http://localhost:3000/`
where you can play around and learn more about the crappiest movies ever created. Enjoy!
