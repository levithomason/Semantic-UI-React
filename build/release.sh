#!/usr/bin/env bash

set -e

# ensure git is latest clean branch
# require npm user
# bump package version
# commit
# create tag
# push commit & tag
# publish

usage() {
  echo ""
  echo "  Usage: bash $0 <comand>"
  echo ""
  echo "  Commands:"
  echo "    <major|minor|patch>         # run checks and publish"
  echo "    check                       # run checks only"
  echo "    publish <major|minor|patch> # publish without checking"
}

print() {
  echo "RELEASE: $1"
}

check() {
  local failed="false"

  # ensure git is ready, fetch before making comparisons
  git fetch
  local local_sha=$(git rev-parse @)
  local remote_sha=$(git rev-parse @{u})
  local base_sha=$(git merge-base @ @{u})

  if [[ -n $(git status --porcelain) ]]; then
    print "[check: FAIL] Commit or stash you changes before releasing."
    exit 1
  else
    print "[check: PASSED] Working directory is clean."
  fi

  if [ $local_sha = $remote_sha ]; then
    print "[check: PASSED] Local branch is up-to-date."
  elif [ $local_sha = $base_sha ]; then
    print "[check: FAIL] You need to pull changes before you can release."
    exit 1
  elif [ $remote_sha = $base_sha ]; then
    print "[check: FAIL] You need to push changes before you can release."
    exit 1
  else
    print "[check: FAIL] Your branch has diverged from the remote, you cannot release."
    exit 1
  fi

  # ensure npm is ready
  local npm_user=$(npm whoami)

  # check perms only if package exists, otherwise it will be created
  if [ $(npm view > /dev/null 2>&1) ]; then
    local is_collaborator=$(npm access ls-collaborators | grep ".*$npm_user.*:.*write.*")
    local is_owner=$(npm owner ls | grep ".*$npm_user <.*")

    if ! [[ "$npm_user" ]]; then
      print "[check: FAIL] You must be logged in to NPM to publish, run \"npm login\" first."
      exit 1
    fi

    if [[ -z "$is_collaborator" ]] && [[ -z "$is_owner" ]]; then
      print "[check: FAILED] $npm_user is not an NPM owner or collaborator. Request access from:"
      npm owner ls
      exit 1
    fi
  fi

  print "[check: DONE] Ready to publish!"
}

publish() {
  local version=$1

  if [[ -z ${version} ]]; then
    usage
    exit 1
  fi

  # all checks out, publish
  print "[publish] Publishing new $version version."

  print "[publish] ...npm version $version"
  npm version ${version}

  print "[publish] ...git push"
  git push

  print "[publish] ...git push --follow-tags"
  git push --follow-tags

  print "[publish] ...npm publish"
  npm publish

  print "[publish] ...done!"
}

run() {
  check
  publish
}

case $1 in
  "major" | "minor" | "patch")
    run
  ;;

  "check")
    check
  ;;

  "publish")
    publish $2
  ;;

  *)
    usage
    exit 1
  ;;
esac
