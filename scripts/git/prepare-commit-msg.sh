#!/bin/bash

textBase='\033[0m'
textInformation='\033[1;34m'
textSuccess='\033[1;32m'

branchName=$(git rev-parse --abbrev-ref HEAD)
techmelyTicketReg='^(TML-[A-Z0-9]{2,4}|merge|hotfix|release)'

gitCommitMsg=$(head -n 1 "$1") # $1 is path = .git/COMMIT_EDITMSG

if [[ $gitCommitMsg =~ $techmelyTicketReg ]];then
  echo "$textInformation Already exist prefix branch-name, ignore appending prefix."
  echo "$textBase"
else
  echo "$textInformation Starting append prefix branch-name..."
  if [[ -n "$branchName" ]] && [[ $branchName =~ $techmelyTicketReg ]]; then
    # Append prefix branch name into commit message
    sed -i.bak -e "1s~^~$branchName ~" "$1"
    echo "$textSuccess Append prefix branch-name successfully."
    echo "$textBase"
  fi
fi
