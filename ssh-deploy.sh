echo Deploy Project

# 拉取代码
git pull

# 重启容器create
docker-compose down
docker-compose up -d --force-recreate --build