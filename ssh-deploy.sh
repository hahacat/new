echo Deploy Project

# 拉取代码
git pull

# 安装依赖，打包
echo "安装依赖"
npm install
echo "打包"
npm run build

# 重启容器create
docker-compose down
docker-compose up -d --force-recreate --build