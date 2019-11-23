PID=$(ps -ef | grep app-admin-web-1.0.0.jar | grep -v grep | awk '{ print $2 }')
if [ -z "$PID" ]
then
    echo Application is already stopped
else
    echo kill -9 $PID
    kill $PID
fi