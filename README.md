#app-admin-web工程


1.部署时修改如下文件中的后台调用链接与app-admin-web的域名一致
src/main/resources/_static/ueditor/config.json 中的 imageUrlPrefix等（ueidtor的文件存在 app-admin-web 服务端CfgRuntime指定的nginx中）
#src/main/resources/_static/cgen.html 中的localPath
#src/main/resources/static/iframe.html 中的localPath
#src/main/resources/static/index.html 中的localPath


方式四 
nohup java -jar app-admin-web-1.0.0.jar >app-admin-web.log &
nohup java -Xmx512m -jar app-admin-web-1.0.0.jar >app-admin-web.log 2>&1 &

解释下 >app-admin-web.log
command >out.file 
command >out.file是将command的输出重定向到out.file文件，即输出内容不打印到屏幕上，而是输出到out.file文件中。