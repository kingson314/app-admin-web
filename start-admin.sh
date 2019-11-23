#cp temp/app-admin-web-1.0.0.jar .
nohup java -Xmx512m -jar app-admin-web-1.0.0.jar >app-admin-web.log 2>&1 &
tail -200f app-admin-web.log