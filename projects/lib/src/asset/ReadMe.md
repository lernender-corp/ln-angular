# Toyota Assets Git Repository

## Overview
This repository is designed to be a central hub for all assets related to Toyota Angular Applications.

## Directory Structure
/fonts
/icons
/images
/json
/scss

## Git Subtree Command
This repo provides a place to standardize Assets used within all Angular 6.*+ Applicaitons. The command below shows how to use Git Subtree Command to being the assets into your project.

### Initial Command (*executed only once*)
> git subtree add --prefix src/asset ssh://git@bitbucket.sdlc.toyota.com:7999/rti/tm-asset.git master --squash

### Pull Command (update local project)
> git subtree pull --prefix src/asset ssh://git@bitbucket.sdlc.toyota.com:7999/rti/tm-asset.git master --squash
​

