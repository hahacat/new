echo Deploy Project

# 拉取代码
git pull

# 重启容器
docker-compose down
docker-compose up -d --force-recrete --build