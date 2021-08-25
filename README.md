# rivalis-examples

`docker build -t rivalis-examples-dev ./dev/`
`docker run -d --name rivalis-examples-dev -p 3000:3000 -p 3200:3200 -p 9229:9229 -v ${PWD}:/service rivalis-examples-dev:latest`