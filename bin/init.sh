#!/usr/bin/env bash
#
#/**
# * License placeholder.
# */
#

this=`dirname "$0"`
this=`cd "$this"; pwd`
ROOT=`cd "${this}/.."; pwd`

export WOOGEEN_HOME=${ROOT}

LogDir=${WOOGEEN_HOME}/logs
DB_URL='localhost/nuvedb'

usage() {
  echo
  echo "WooGeen Initialization Script"
  echo "    This script initializes a WooGeen-MCU package."
  echo "    This script is intended to run on a target machine."
  echo
  echo "Usage:"
  echo "    --deps (default: false)             install dependent components and libraries via apt-get/local"
  echo "    --dburl=HOST/DBNAME                 specify mongodb URL other than default \`localhost/nuvedb'"
  echo "    --hardware                          enable mcu with msdk (if \`libmcu_hw.so' is packed)"
  echo "    --help                              print this help"
  echo
}

install_deps() {
  echo -e "\x1b[32mInstalling dependent components and libraries via apt-get...\x1b[0m"
  sudo apt-get update
  sudo apt-get install rabbitmq-server mongodb #TODO: pick-up libraries
}

install_db() {
  local DB_DIR=${WOOGEEN_HOME}/db

  echo -e "\x1b[32mInitializing mongodb...\x1b[0m"
  if ! pgrep -f mongod &> /dev/null; then
    if ! hash mongod 2>/dev/null; then
        echo >&2 "Error: mongodb not found."
        return 1
    fi
    [[ ! -d "${DB_DIR}" ]] && mkdir -p "${DB_DIR}"
    [[ ! -d "${LogDir}" ]] && mkdir -p "${LogDir}"
    mongod --repair --dbpath ${DB_DIR}
    mongod --dbpath ${DB_DIR} --logpath ${LogDir}/mongo.log --fork
    sleep 5
  else
    echo -e "\x1b[32mMongoDB already running\x1b[0m"
  fi
}

check_node_version()
{
  local NODE_VERSION=
  . ${this}/.conf
  NODE_VERSION=$(echo ${NODE_VERSION} | cut -d '.' -f 1,2)
  if ! hash node 2>/dev/null; then
    echo >&2 "Error: node not found. Please install node ${NODE_VERSION} first."
    return 1
  fi
  local NODE_VERSION_USE=$(node --version | cut -d '.' -f 1,2)
  [[ ${NODE_VERSION} == ${NODE_VERSION_USE} ]] && return 0 || (echo "node version not match. Please use node ${NODE_VERSION}"; return 1;)
}

install_config() {
  echo -e "\x1b[32mInitializing default configuration...\x1b[0m"
  # default configuration
  export DEFAULT_CONFIG="${WOOGEEN_HOME}/etc/.woogeen_default.js"
  if [[ ! -s ${DEFAULT_CONFIG} ]]; then
    echo >&2 "Error: configuration template not found."
    return 1
  fi
  export DB_URL
  check_node_version && node ${this}/initdb.js || return 1
}

INSTALL_DEPS=false
ENABLE_HARDWARE=false

shopt -s extglob
while [[ $# -gt 0 ]]; do
  case $1 in
    *(-)deps )
      INSTALL_DEPS=true
      ;;
    *(-)dburl=* )
      DB_URL=$(echo $1 | cut -d '=' -f 2)
      echo -e "\x1b[36musing $DB_URL\x1b[0m"
      ;;
    *(-)hardware )
      ENABLE_HARDWARE=true
      ;;
    *(-)help )
      usage
      exit 0
      ;;
    * )
      echo -e "\x1b[33mUnknown argument\x1b[0m: $1"
      ;;
  esac
  shift
done

${INSTALL_DEPS} && install_deps

install_db
install_config

if ${ENABLE_HARDWARE}; then
  cd ${ROOT}/lib
  [[ -s libmcu_hw.so ]] && \
  rm -f libmcu.so && \
  ln -s libmcu_hw.so libmcu.so
  sed -i 's/config\.erizo\.hardwareAccelerated = false/config\.erizo\.hardwareAccelerated = true/' ${ROOT}/etc/woogeen_config.js
else
  cd ${ROOT}/lib
  [[ -s libmcu_sw.so ]] && \
  rm -f libmcu.so && \
  ln -s libmcu_sw.so libmcu.so
  sed -i 's/config\.erizo\.hardwareAccelerated = true/config\.erizo\.hardwareAccelerated = false/' ${ROOT}/etc/woogeen_config.js
fi
