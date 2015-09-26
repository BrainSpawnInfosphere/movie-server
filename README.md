# Movie Server

![webpage](./images/webpage.png)

![modal](./images/modal.png)

## Requirements

This uses both [tmdb.org](http:tmdb.org) and [rotten tomatoes](http://rottentomatoes.com)
to get information about movies and generate a webpage. The following libraries are needed:

	pip install media

You will also have to sign-up for free API keys at both locations in order to access their info.

## Usage

Then start it running

	npm run

## HTTP Server

The webserver is nodejs and uses http-server. To install on OSX:

	brew install node

### Raspberry Pi

The nodejs for rpi is very old. You can download it from [nodejs.org](http://nodejs.org) 
and build it from source. Then use the `npm` above to install `http-server`. 

## Usage

Now navigate to `computer:8080/<webpage_name>` to access your movies. Mine is `tardis.local:8080/movies.html`.