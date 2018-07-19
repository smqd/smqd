#!/usr/bin/env bash

SMQD_ENV="-Dconfig.file=${SMQD_HOME_DIR}/conf/smqd.conf"
SMQD_ENV="$SMQD_ENV -Dlogback.configurationFile=${SMQD_HOME_DIR}/conf/logback.xml"
SMQD_ENV="$SMQD_ENV -Dsmqd.plugin.dir=${SMQD_HOME_DIR}/plugins"
SMQD_ENV="$SMQD_ENV -Dsmqd.plugin.manifest=${SMQD_HOME_DIR}/conf/plugin-manifest.conf"

SMQD_CMD='nohup ${SMQD_HOME_DIR}/bin/smqd ${SMQD_ENV} > /dev/null 2>&1 & echo $! > ${SMQD_HOME_DIR}/bin/smqd.pid'

while getopts "f" option
do
  case "${option}" in
    f)
      SMQD_CMD='${SMQD_HOME_DIR}/bin/smqd ${SMQD_ENV}'
      ;;
    *)
      ;;
  esac
done

eval $SMQD_CMD
