echo Deploy Project

# 拉取代码
git pull

# 重启容器
docker-compuse down
docker-compuse up -d --force-recrete --build