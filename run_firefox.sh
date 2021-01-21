#!/usr/bin/env bash
export DISPLAY=:0.0

killall firefox-esr
sleep 2
echo launching firefox
sudo -u pi firefox-esr $1 &
echo firefox launched

echo sleeping for 30 seconds
sleep 30

echo going full screen
sudo -u pi xdotool key F11

echo moving mouse
sudo -u pi xdotool mousemove 1080 1920
echo done

