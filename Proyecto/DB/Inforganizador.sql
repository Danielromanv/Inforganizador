CREATE DATABASE  IF NOT EXISTS `inforganizador` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `inforganizador`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: inforganizador
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contenido`
--

DROP TABLE IF EXISTS `contenido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contenido` (
  `ID_contenido` int(10) NOT NULL,
  `Nombre Contenido` varchar(20) DEFAULT NULL,
  `UnidadID_unidad` int(10) DEFAULT NULL,
  PRIMARY KEY (`ID_contenido`),
  KEY `contenido_unidad_idx` (`UnidadID_unidad`),
  CONSTRAINT `contenido_unidad` FOREIGN KEY (`UnidadID_unidad`) REFERENCES `unidad` (`ID_unidad`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contenido`
--

LOCK TABLES `contenido` WRITE;
/*!40000 ALTER TABLE `contenido` DISABLE KEYS */;
/*!40000 ALTER TABLE `contenido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `ID_curso` int(10) NOT NULL,
  `Nombre Curso` varchar(64) NOT NULL,
  PRIMARY KEY (`ID_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `imagen` (
  `ID_Imagen` int(10) NOT NULL,
  `Link` varchar(100) DEFAULT NULL,
  `ContenidoID_contenido` int(10) NOT NULL,
  PRIMARY KEY (`ID_Imagen`),
  KEY `imagen_contenido_idx` (`ContenidoID_contenido`),
  CONSTRAINT `imagen_contenido` FOREIGN KEY (`ContenidoID_contenido`) REFERENCES `contenido` (`ID_contenido`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta_encuesta`
--

DROP TABLE IF EXISTS `pregunta_encuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pregunta_encuesta` (
  `ID_pregunta` int(10) NOT NULL,
  `Texto` varchar(50) DEFAULT NULL,
  `Opcion_1` varchar(50) DEFAULT NULL,
  `Opcion_2` varchar(50) DEFAULT NULL,
  `Opcion_3` varchar(50) DEFAULT NULL,
  `Opcion_4` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_pregunta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta_encuesta`
--

LOCK TABLES `pregunta_encuesta` WRITE;
/*!40000 ALTER TABLE `pregunta_encuesta` DISABLE KEYS */;
/*!40000 ALTER TABLE `pregunta_encuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `texto`
--

DROP TABLE IF EXISTS `texto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `texto` (
  `ID_texto` int(10) NOT NULL,
  `Texto` varchar(4000) DEFAULT NULL,
  `ContenidoID_contenido` int(10) NOT NULL,
  PRIMARY KEY (`ID_texto`),
  KEY `texto_contenido_idx` (`ContenidoID_contenido`),
  CONSTRAINT `texto_contenido` FOREIGN KEY (`ContenidoID_contenido`) REFERENCES `contenido` (`ID_contenido`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `texto`
--

LOCK TABLES `texto` WRITE;
/*!40000 ALTER TABLE `texto` DISABLE KEYS */;
/*!40000 ALTER TABLE `texto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidad`
--

DROP TABLE IF EXISTS `unidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidad` (
  `ID_unidad` int(10) NOT NULL,
  `CursoID_curso` int(10) NOT NULL,
  PRIMARY KEY (`ID_unidad`),
  KEY `unidad_curso_idx` (`CursoID_curso`),
  CONSTRAINT `unidad_curso` FOREIGN KEY (`CursoID_curso`) REFERENCES `curso` (`ID_curso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidad`
--

LOCK TABLES `unidad` WRITE;
/*!40000 ALTER TABLE `unidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `unidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `Username` varchar(64) NOT NULL,
  `Password` varchar(64) NOT NULL,
  `Nombre` varchar(32) NOT NULL,
  `Apellido` varchar(32) NOT NULL,
  `Email` varchar(128) NOT NULL,
  `Tipo_aprendizaje` int(1) NOT NULL DEFAULT '0',
  `Tipo_usuario` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Username`),
  UNIQUE KEY `Username_UNIQUE` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_curso`
--

DROP TABLE IF EXISTS `user_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_curso` (
  `UserUsername` varchar(64) NOT NULL,
  `CursoID_curso` int(10) NOT NULL,
  PRIMARY KEY (`UserUsername`,`CursoID_curso`),
  KEY `curso_user_idx` (`CursoID_curso`),
  CONSTRAINT `curso_user` FOREIGN KEY (`CursoID_curso`) REFERENCES `curso` (`ID_curso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_curso` FOREIGN KEY (`UserUsername`) REFERENCES `user` (`Username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_curso`
--

LOCK TABLES `user_curso` WRITE;
/*!40000 ALTER TABLE `user_curso` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video` (
  `ID_Video` int(10) NOT NULL,
  `Link` varchar(100) DEFAULT NULL,
  `ContenidoID_contenido` int(10) NOT NULL,
  PRIMARY KEY (`ID_Video`),
  KEY `video_contenido_idx` (`ContenidoID_contenido`),
  CONSTRAINT `video_contenido` FOREIGN KEY (`ContenidoID_contenido`) REFERENCES `contenido` (`ID_contenido`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'inforganizador'
--

--
-- Dumping routines for database 'inforganizador'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-09-04 19:41:41
