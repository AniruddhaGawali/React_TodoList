#!/bin/bash

# Run the script
LOCA=$(pwd)

osascript -e "tell app \"Terminal\"
    do script \"cd '$LOCA' && cd backend && code . && npm start\"
end tell"

code .
npm run dev