FROM  nginx
# ADD  . /app/
# WORKDIR   /app            
# RUN  npm install              
# RUN  npm run dev           
                 
COPY ./nginx/conf.d /etc/nginx/conf.d 
COPY ./dist /usr/share/nginx/html
# COPY ./board/dist /usr/share/nginx/html/board
EXPOSE 8080