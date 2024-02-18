# Techmely Web


## Deployment

### Self-host Docker Deployment

1. checkout source ```git clone https://github.com/techmely/techmely.git```
1. got into new source dir: ```cd tech```
1. build Docker image: ```docker build .```
1. create local storage directory for settings: ```mkdir tml-storage```
1. adjust permissions of storage dir: ```sudo chown 911:911 ./tml-storage```
1. start container: ```docker-compose up -d```


```sh
git clone https://github.com/techmely/techmely.git
cd techmely
bun run docker.build # build Docker image for all app
bun run docker.storage # create local storage directory + adjust permissions of storage dir
bun run docker.up # Start container - Enjoy
```