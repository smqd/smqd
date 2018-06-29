#!/usr/bin/env bash

nohup ${SMQD_HOME_DIR}/bin/smqd > /dev/null 2>&1 & echo $! > ${SMQD_HOME_DIR}/bin/smqd.pid
