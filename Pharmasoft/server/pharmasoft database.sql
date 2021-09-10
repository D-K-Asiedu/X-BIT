-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pharmasoft
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pharmasoft
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pharmasoft` DEFAULT CHARACTER SET utf8 ;
USE `pharmasoft` ;

-- -----------------------------------------------------
-- Table `pharmasoft`.`customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmasoft`.`customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Contact` VARCHAR(15) NULL DEFAULT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pharmasoft`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmasoft`.`cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `complete` TINYINT NOT NULL DEFAULT '0',
  `Transaction_id` VARCHAR(100) NULL DEFAULT NULL,
  `Customer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Transaction_id_UNIQUE` (`Transaction_id` ASC) VISIBLE,
  INDEX `fk_Cart_Customer_idx` (`Customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Cart_Customer`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `pharmasoft`.`customer` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pharmasoft`.`pharmacy`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmasoft`.`pharmacy` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `pharmacycode` VARCHAR(45) NOT NULL,
  `location` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `pharmacycode_UNIQUE` (`pharmacycode` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pharmasoft`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmasoft`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `image` VARCHAR(45) NULL DEFAULT NULL,
  `prescribe` TINYINT NOT NULL DEFAULT '0',
  `pharmacy_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_product_pharmacy1_idx` (`pharmacy_id` ASC) VISIBLE,
  CONSTRAINT `fk_product_pharmacy1`
    FOREIGN KEY (`pharmacy_id`)
    REFERENCES `pharmasoft`.`pharmacy` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `pharmasoft`.`cart_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pharmasoft`.`cart_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Quantity` INT NULL DEFAULT '0',
  `Cart_id` INT NOT NULL,
  `Product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Cart_item_Cart1_idx` (`Cart_id` ASC) VISIBLE,
  INDEX `fk_Cart_item_Product1_idx` (`Product_id` ASC) VISIBLE,
  CONSTRAINT `fk_Cart_item_Cart1`
    FOREIGN KEY (`Cart_id`)
    REFERENCES `pharmasoft`.`cart` (`id`),
  CONSTRAINT `fk_Cart_item_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `pharmasoft`.`product` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
