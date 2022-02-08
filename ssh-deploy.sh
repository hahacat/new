echo Deploy Project

# 拉取代码
git pull

npm install
npm run build

# 重启容器create
docker-compose down
docker-compose up -d --force-recreate --build