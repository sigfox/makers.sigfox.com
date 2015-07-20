#!/bin/sh


#backup me
cp -r scripts ~/Desktop/


sourceBranch="master"
releaseRemote="github"
releaseBranch="gh-pages"
buildFolder="_site"
tempFolder="_temp"

#Git repo ?
if [[ ! -d .git ]]; then
  echo "This is not a git repo"
  exit
fi

releaseMsg=$2
if [[ ! $releaseMsg ]]; then
  echo "No commit msg, use a generated one"
  releaseMsg="Automatic release — $(date +%Y-%m-%d:%H:%M:%S)"
fi

##Check current branch
currentBranch=$(git symbolic-ref --short HEAD)
if [[ $currentBranch != $sourceBranch ]]; then
  echo "You must be on $sourceBranch"
  echo "Current branch: $currentBranch"
  exit
fi

##Uncommited changes
uncommited=$(git status --porcelain)
if [[ $uncommited ]]; then
  echo "There are uncommited changes"
  echo "$uncommited"
  exit
fi


#Build OK
if [[ ! -d _site ]]; then
  echo "Build missing. Run \$ jekyll serve first"
  exit
fi

#Save build in tmp folder
mkdir _temp
cp -r $buildFolder/* $tempFolder/

##Stop Jekyll
jekyllPID=$(ps aux | grep [j]ekyll | awk '{print $2}')
if [[ $jekyllPID ]]; then
  echo "Killing Jekyll process $jekyllPID"
  kill $jekyllPID
fi

##Create release branch if needed
if [[ $(git branch --list $releaseBranch) ]]; then
  git checkout $releaseBranch
else
  git checkout --orphan $releaseBranch
fi



##Keep only build files
mv CNAME $tempFolder
ls | grep -v $tempFolder | xargs rm -rf
rm .gitignore
#Check that the build files haven't been erased. Could be the case if jekyll process is still running
nbFiles=$(ls -l $tempFolder | wc -l)
if [[ nbFiles == 0 ]]; then
  echo "Unexpected err : $tempFolder files are gone. Aborting the whole process"
  rmdir $tempFolder
  git checkout .
  git checkout $sourceBranch
  exit
fi

mv $tempFolder/* .
rmdir $tempFolder
git add .
git commit -m "$releaseMsg"
git push $releaseRemote $releaseBranch
git checkout $sourceBranch