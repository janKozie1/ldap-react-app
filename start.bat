@echo off
set "str1=%~dp0"
set "str2=node_modules"
set "str3=%str1%%str2%"

echo Running... 

IF EXIST %str3% (  
 node ldap_service.js --add
 pause
) ELSE (
  npm install
  node ldap_service.js --add
  pause
)








