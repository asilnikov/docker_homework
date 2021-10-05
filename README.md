# lib_catalog

The only requirement for project starting is having docker
 and docker-compose installed and running. 

To start a project:
 - git clone https://github.com/burbaljaka/lib_catalog.git
 - cd lib_catalog
 - docker-compose build
 - docker-compose up
 
 In case of getting error message like
 
  'cannot locate "any react module"'
  
 try the following:
  1. docker-compose down -v
  2. docker-compose build
  3. docker-compose up 