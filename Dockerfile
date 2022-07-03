FROM node:12.18.1

COPY package.json .
RUN npm install --force

COPY . .

ENV MNEMONIC='ability ramp tongue name hand small veteran world blind inflict slight barely'
ENV INFURA_API_KEY='c6ea5d4c94204c019d72e53e1c4853c9'
ENV API_KEY='IZ6PFS4YQGMGYSQZRZEKTDHGYJWXJ2JA9R'

EXPOSE 3000
CMD [ "npm", "start" ]

