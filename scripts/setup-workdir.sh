export $(grep -v '^#' .env | xargs)
nvm use 22
yarn
