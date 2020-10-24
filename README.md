# Relationship Builder
### build and run 
  - docker compose up

if for some reason that doesn't work, start a monogdb server at the default mongo port, and run 
  - npm install
  - npm start 

in /backend and /front-end


### backend and  frontend
both are located in their respective folders. 

### 1M requests per day
if i had to scale to an aws instance, i'd use M3.large in EC2 and run a elastic application load-balanacer to autosclae a instance if cpu usage exceeds 90 %

