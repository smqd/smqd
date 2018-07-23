#!/usr/bin/env bash

kill `cat ${SMQD_HOME_DIR}/bin/smqd.pid` && rm ${SMQD_HOME_DIR}/bin/smqd.pid
