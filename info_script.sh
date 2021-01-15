#!/usr/bin/env bash
temps(){
  cpu=$(</sys/class/thermal/thermal_zone0/temp)
  echo "GPU => $(/opt/vc/bin/vcgencmd measure_temp)"
  echo "CPU => $((cpu/1000))'C"
}



if [[ "$1" == "-c" ]];then
temps
elif [[ "$1" == "-t" ]]; then
top -b -n 1 | head -n 50
elif [[ "$1" == "-d" ]]; then
df -h
else
temps
echo -e "\n\n"
top -b -n 1 | head -n 50
echo -e "\n\n"
df -h
fi