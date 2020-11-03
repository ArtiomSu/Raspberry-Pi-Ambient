#!/usr/bin/env bash
export DISPLAY=:0.0
xset s off
xset -dpms
xset s noblank

#check display state
state="$(/opt/vc/bin/tvservice -s | grep -o HDMI)"
if [[ -z $state ]];then
  echo "display is powered off turning on"
  killall firefox-esr
  /opt/vc/bin/tvservice -p
  sleep 2
  xdotool mousemove 500 500
  sleep 2
  xdotool mousemove 1080 1920
  fbset -depth 16
  sleep 2
  fbset -depth 32
else
  echo "display is powered on turning off"
  /opt/vc/bin/tvservice -o
fi