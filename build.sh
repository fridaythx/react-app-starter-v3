#!/bin/sh
git pull
export BUILD_ID=DONTKILLME
#export DEPLOY_ENV=TEST
npm install --unsafe-perm
npm run build
echo 'check if .pid file exists.'
if [ -f './.pid' ];then
    pid=`cat .pid`

    echo 'found .pid file, pid is' $pid ', kill it'

    exists=`ps -ef|awk '{ print $2}'|grep $pid`

    echo 'check process exists.'

    if [ -n "$exists" ];then
        echo 'execute kill pid' $pid

        kill $pid

        echo 'wait 3s for killing app process'

        sleep 3

        echo 'check process exists.'

        exists=`ps -ef|awk '{ print $2}'|grep $pid`

        if [ -n "$exists" ];then
            echo 'process cannot be killed, failed to start server.'
            
            exit 99
        fi
    else
        echo 'no process need to be killed.'
    fi
else
    echo 'no .pid file exists.'
fi


echo 'start server...'
nohup npm start > /dev/null 2>&1 & echo $! > .pid
echo "server's pid[" `cat .pid` "]"

