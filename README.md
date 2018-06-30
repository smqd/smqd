# SMQD

SMQD :: Scala MQtt Daemon

[![Build Status](https://travis-ci.org/smqd/smqd.svg?branch=develop)](https://travis-ci.org/smqd/smqd)
[![Github Releases](https://img.shields.io/github/downloads/smqd/smqd/latest/total.svg)](https://github.com/smqd/smqd/releases/latest)
[![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)

## Install

> smqd is developed and tested in Java 8 environment

- Download the latest version from [here](https://github.com/smqd/smqd/releases/latest)

- Unarchive `smqd-x.y.z.zip` file where you want to install

- Set environment variable `SMQD_HOME_DIR` where smqd installed directory path

```bash
    export SMQD_HOME_DIR=/usr/local/smqd-x.y.z
```

* start smqd

```
$SMQD_HOME_DIR/bin/start-smqd.sh
```

* stop smqd

```
$SMQD_HOME_DIR/bin/stop-smqd.sh
```

## Configurations

### JVM Settings

To change the JVM settings of smqd, edit `$SMQD_HOME_DIR/conf/smqd-jvm.ini`

In this file you can change JVM options with `-J` prefix.
You don't need '-J' prefix for the other values that is not a Java VM options.

```
-J-Xms256m -J-Xmx256m
```

When you run `start-smqd.sh` to start smqd, it will find the smqd config file from
`-Dconfig.file=${SMQD_HOME_DIR}/conf/smqd.conf`.

### SMQD Settings - Basic

To change the default settings of smqd, edit configuration file `$SMQD_HOME_DIR/conf/smqd-conf`.

- node name

The name of smqd instance. Node name should be unique in the cluster.

The default settings are like below.

```
  node_name = "node-01"
  node_name = ${?NODE_NAME}
```

It means assign "node-01" for `node_name` and
if environment variable `$NODE_NAME` exists, it will overwrite the previous value (here "node-01").
If `$NODE_NAME` does not exists, "node-01" will be kept for `node_name`.

This feature is great when you run a smqd in container environment (e.g Docker).

- actor system name

smqd is based on [akka](https://akka.io). And this setting is used for akka system's name.
If you have planning to run multiple smqd processes in a cluster, you must apply same `actor_system_name` for all nodes in a cluster
We recommend to change this with unique name enven you don't have plan of clustering for now.

```
  actor_system_name = "default"
  actor_system_name = ${?ACTOR_SYSTEM_NAME}
```

- Reference configuration (default values)

You can find the full reference configuration [here](https://github.com/smqd/smqd-core/src/main/resources/smqd-ref.conf).

### Log Settings

smqd is using [logback](https://logback.qos.ch) and configuration file is at `$SMQD_HOME_DIR/conf/logback.xml`.
If you want to place the logback config in a different directory,
change the value of `-Dlogback.configurationFile` in `smqd-jvm.ini` file.
For customization of logback.xml, please refer to the official web site of [logback](https://logback.qos.ch).

## Related Projects

### smqd core

- [smqd-core](https://github.com/smqd/smqd-core/)

### smqd bridges

- [smqd-bridge-http](https://github.com/smqd/smqd-bridge-http/)

- [smqd-bridge-mqtt](https://github.com/smqd/smqd-bridge-mqtt/)