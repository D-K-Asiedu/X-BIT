-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema pharmacy
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pharmacy
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pharmacy` DEFAULT CHARACTER SET utf8 ;
USE `pharmacy` ;

-- -----------------------------------------------------
-- Table `pharmacy`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Customer` (
  `Customer_id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Contact` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`Customer_id`),
  UNIQUE INDEX `Contact_UNIQUE` (`Contact` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Pharmacy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Pharmacy` (
  `Pharmacy_id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Location` VARCHAR(45) NOT NULL,
  `Working_hours` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`Pharmacy_id`),
  UNIQUE INDEX `Name_UNIQUE` (`Name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Personnel`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Personnel` (
  `Personnel_id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Contact` VARCHAR(20) NOT NULL,
  `Pharmacy_id` INT NOT NULL,
  PRIMARY KEY (`Personnel_id`),
  UNIQUE INDEX `Contact_UNIQUE` (`Contact` ASC) VISIBLE,
  INDEX `fk_Personnel_Pharmacy1_idx` (`Pharmacy_id` ASC) VISIBLE,
  CONSTRAINT `fk_Personnel_Pharmacy1`
    FOREIGN KEY (`Pharmacy_id`)
    REFERENCES `pharmacy`.`Pharmacy` (`Pharmacy_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`User` (
  `User_id` INT NOT NULL AUTO_INCREMENT,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(100) NOT NULL,
  `Customer_id` INT NOT NULL,
  `Personnel_id` INT NOT NULL,
  PRIMARY KEY (`User_id`),
  INDEX `fk_User_Customer1_idx` (`Customer_id` ASC) VISIBLE,
  INDEX `fk_User_Personnel1_idx` (`Personnel_id` ASC) VISIBLE,
	UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE,
  CONSTRAINT `fk_User_Customer1`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `pharmacy`.`Customer` (`Customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_User_Personnel1`
    FOREIGN KEY (`Personnel_id`)
    REFERENCES `pharmacy`.`Personnel` (`Personnel_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Setting`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Setting` (
  `Setting_id` INT NOT NULL AUTO_INCREMENT,
  `Version` FLOAT NOT NULL,
  `Theme` VARCHAR(45) NOT NULL,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`Setting_id`),
  UNIQUE INDEX `Version_UNIQUE` (`Version` ASC) VISIBLE,
  INDEX `fk_Setting_User_idx` (`User_id` ASC) VISIBLE,
  CONSTRAINT `fk_Setting_User`
    FOREIGN KEY (`User_id`)
    REFERENCES `pharmacy`.`User` (`User_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Request`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Request` (
  `Request_id` INT NOT NULL AUTO_INCREMENT,
  `Required_date` DATE NULL,
  `Customer_id` INT NOT NULL,
  `Transaction_id` INT NOT NULL,
  `Complete` TINYINT NOT NULL,
  PRIMARY KEY (`Request_id`),
  INDEX `fk_Request_Customer1_idx` (`Customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Request_Customer1`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `pharmacy`.`Customer` (`Customer_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Product` (
  `Product_id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Price` FLOAT NOT NULL,
  `Expiry_date` DATE NULL,
  PRIMARY KEY (`Product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Request_Item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Request_Item` (
  `Num` INT NOT NULL AUTO_INCREMENT,
  `Quantity` INT NOT NULL,
  `Date` DATE NOT NULL,
  `Request_id` INT NOT NULL,
  `Product_id` INT NOT NULL,
  PRIMARY KEY (`Num`),
  INDEX `fk_Request_Item_Request1_idx` (`Request_id` ASC) VISIBLE,
  INDEX `fk_Request_Item_Product1_idx` (`Product_id` ASC) VISIBLE,
  CONSTRAINT `fk_Request_Item_Request1`
    FOREIGN KEY (`Request_id`)
    REFERENCES `pharmacy`.`Request` (`Request_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Request_Item_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `pharmacy`.`Product` (`Product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `pharmacy`.`Pharmacy_Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmacy`.`Pharmacy_Product` (
  `Num` INT NOT NULL AUTO_INCREMENT,
  `Discount` FLOAT NULL,
  `Product_id` INT NOT NULL,
  `Pharmacy_id` INT NOT NULL,
  PRIMARY KEY (`Num`),
  INDEX `fk_Pharmacy_Product_Product1_idx` (`Product_id` ASC) VISIBLE,
  INDEX `fk_Pharmacy_Product_Pharmacy1_idx` (`Pharmacy_id` ASC) VISIBLE,
  CONSTRAINT `fk_Pharmacy_Product_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `pharmacy`.`Product` (`Product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Pharmacy_Product_Pharmacy1`
    FOREIGN KEY (`Pharmacy_id`)
    REFERENCES `pharmacy`.`Pharmacy` (`Pharmacy_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0
