# Map-Matching as service

## Valhalla installation

Installation from source always introduces a lot of problems with dependencies and is not an easy process. This is why we will be using a docker container ([Valhalla Docker image by GIS • OPS
](https://github.com/gis-ops/docker-valhalla)) which contains Valhalla installation and is easy and flexible to use. To install docker on Ubuntu, please visit [this tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-22-04). After installing docker, follow these steps to setup the docker container:
- Make a directory that is going to be attached to docker container as a volume and will contain all necessary data for map and tiles.
  ```bash
  mkdir valhalla_volume
  ```
- Download the related OSM file and put it in the created directory. You can visit [this site](https://download.geofabrik.de/) to see all available OSM files. Here, we download the map of europe.
  ```bash
  wget -O valhalla_volume/europe-latest.osm.pbf https://download.geofabrik.de/europe-latest.osm.pbf
  ```
- Run the docker container. As you can see, this exposes port 8002. So make sure that this port is not in use. This command will download the container and run it. It will start generating tiles from the given map and once it is finished, it will put all necessary data into the directory that we created in first step. Once this is finished, you can send HTTP requests to port 8002 and use tha Valhalla engine as you normally do.
  ```bash
  docker run -dt --name valhalla_gis-ops -p 8002:8002 -v $PWD/valhalla_volume:/custom_files gisops/valhalla:latest
  ```
- For more documentation, please visit [GitHub page](https://github.com/gis-ops/docker-valhalla) of this container.
- At any point you can attach to the container to see if Valhalla tile generation is finished or to see the logs.
  ```bash
  docker attach valhalla_gis-ops
  ```
- We can attach another volume to this container at any time and this container can contain, for example, a map of another region. This make this approach a really flexible approach.
