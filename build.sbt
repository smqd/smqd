
import sbt.Keys._
import NativePackagerHelper._
import sbt.StdoutOutput

import scala.sys.process._

val versionString = "0.1.0"
val smqdVersion = "0.1.0"

lazy val gitBranch = "git rev-parse --abbrev-ref HEAD".!!.trim
lazy val gitCommitShort = "git rev-parse HEAD | cut -c 1-7".!!.trim
lazy val gitCommitFull = "git rev-parse HEAD".!!.trim

val versionFile       = s"echo version = $versionString" #> file("src/main/resources/smqd-version.conf") !
val commitVersionFile = s"echo commit-version = $gitCommitFull" #>> file("src/main/resources/smqd-version.conf") !

val smqd = project.in(file(".")).enablePlugins(
  JavaAppPackaging
).settings(
  organization := "t2x.smqd",
  name := "smqd",
  version := versionString,
  // no source code in this project
  sourcesInBase := false,
  // no publish
  publish := ((): Unit),
  publishLocal := ((): Unit),
  publishArtifact := false
).settings(
  resolvers += Resolver.bintrayRepo("smqd", "smqd"),
  libraryDependencies ++= Seq (
    "t2x.smqd" %% "smqd-core" % smqdVersion,
    "t2x.smqd" %% "smqd-bridge-mqtt" % smqdVersion,
    "t2x.smqd" %% "smqd-bridge-http" % smqdVersion
  )
).settings(
  // sbt runtime options
  javaOptions in run ++= Seq(
    "-Xmx1G",
    "-Dconfig.file=./conf/smqd.conf",
    "-Dlogback.configurationFile=./conf/logback.xml",
    "-Djava.net.preferIPv4Stack=true",
    "-Djava.net.preferIPv6Addresses=false"
  ),
  fork in run := true,
  outputStrategy := Some(StdoutOutput)
).settings(
  // Packaging Settings
  mappings in Universal ++= directory(sourceDir = "bin").filterNot{ case (_, fname) => Set("bin/.gitkeep").contains(fname) },
  mappings in Universal ++= directory(sourceDir = "conf").filterNot{ case (_, fname) => Set("conf/smqd-dev.conf").contains(fname) },
  mainClass in Compile := Some("t2x.smqd.Main"),
  packageName in Universal := s"smqd-${(version in ThisBuild).value}",
  executableScriptName := "smqd",
  bashScriptConfigLocation := Some("${SMQD_HOME_DIR}/conf/smqd-jvm.ini")
  // Not need for production,
  // bashScriptExtraDefines ++= Seq("""addJava "-DAPP_HOME=$(dirname $app_home)" """)
  // scriptClasspath := Seq("${app_home}/../conf") ++ scriptClasspath.value
)