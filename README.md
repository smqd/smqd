# SMQD

SMQD :: Scala MQtt Daemon

[![License](http://img.shields.io/:license-apache-blue.svg)](http://www.apache.org/licenses/LICENSE-2.0.html)
[![Build Status](https://travis-ci.org/smqd/smqd.svg?branch=develop)](https://travis-ci.org/smqd/smqd)
[![Github Releases](https://img.shields.io/github/downloads/smqd/smqd/latest/total.svg)](https://github.com/smqd/smqd/releases/latest)

## Install

> smqd is developed and tested in Java 8 environment

- Download the latest version from [here](https://github.com/smqd/smqd/releases/latest)

- Unarchive `smqd-x.y.z.zip` file where you want to install

- Set environment variable `SMQD_HOME_DIR` where smqd installed directory path

```bash
$ export SMQD_HOME_DIR=/usr/local/smqd-x.y.z
```

* start smqd

```
cd $SMQD_HOME_DIR
./bin/start-smqd.sh
```

> If you want to run smqd as foreground process for debugging purpose,
execute `./bin/smqd` instead of `./bin/start-smqd.sh`, and `^C` to stop

* stop smqd

```
./bin/stop-smqd.sh
```

## Configurations

### JVM Settings

To change the JVM settings of smqd, edit `$SMQD_HOME_DIR/bin/smqd-jvm.ini`

In this file you can change JVM options with `-J` prefix.
You don't need '-J' prefix for the other values that is not a Java VM options.

```
-J-Xms256m -J-Xmx256m
```

> Caution: You can not use environment variable `$SMQD_HOME_DIR` in `smqd-jvm.ini`.
Make sure to use a absolute path only in the file

- smqd config file path

When you execute `start-smqd.sh` or `smqd` to start, it will find the smqd config file from `-Dconfig.file=<Path SMQD_HOME_DIR>/conf/smqd.conf`.

```
-Dconfig.file=<Path SMQD_HOME_DIR>/conf/smqd.conf
```

- logback config file path

```
-Dlogback.configurationFile=<Path SMQD_HOME_DIR>/conf/logback.xml
```

- plugin directory

```
-Dsmqd.plugin.dir=<Path SMQD_HOME_DIR>/plugin
```

- plugin manifest path

```
-Dsmqd.plugin.manifest=<Path SMQD_HOME_DIR>/conf/plugin-manifest.conf
```

### SMQD Settings - Basic

To change the default settings of smqd, edit configuration file `$SMQD_HOME_DIR/conf/smqd-conf`.

#### node name

The name of smqd instance. Node name should be unique in the cluster.

The default settings are like below.

```
  node_name = "node-01"
  node_name = ${?NODE_NAME}
```

It means `node_name` has "node-01" by default and
if environment variable `$NODE_NAME` is defined, it will overwrite the default value.
If `$NODE_NAME` does not exists, `node_name` will keep "node-01" as value.

This feature is great when you run a smqd in container environment (e.g Docker).

#### actor system name

smqd is based on [akka](https://akka.io). And this setting is used for akka system's name.
If you are planning to run multiple smqd processes for a cluster, you must apply same `actor_system_name` for all nodes in a cluster.
We recommend to change this with unique name enven you don't have a plan ot use cluster for now.

```
  actor_system_name = "default"
  actor_system_name = ${?ACTOR_SYSTEM_NAME}
```

#### Reference configuration (default values)

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