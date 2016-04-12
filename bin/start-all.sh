#!/usr/bin/env bash
#
#/**
# * License placeholder.
# */

bin=`dirname "$0"`
bin=`cd "$bin"; pwd`

echo "========================== NUVE ==========================="
${bin}/daemon.sh start nuve
echo "========================== MCU ==========================="
${bin}/daemon.sh start mcu
echo "========================== Agent ==========================="
${bin}/daemon.sh start agent
echo "========================== App ==========================="
${bin}/daemon.sh start app

