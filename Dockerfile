FROM  nginx
# ADD  . /app/
# WORKDIR   /app            
# RUN  npm install              
# RUN  npm run dev         
COPY nginx/conf.d /etc/nginx/conf.d
COPY dist /usr/share/nginx/html
EXPOSE 8080