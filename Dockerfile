FROM  nginx
# ADD  . /app/
# WORKDIR   /app            
# RUN  npm install              
# RUN  npm run dev           
                 
COPY ./nginx.conf /etc/nginx/conf.d 
COPY ./dist /var/www/html

EXPOSE  8091