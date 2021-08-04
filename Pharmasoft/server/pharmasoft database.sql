-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Pharmasoft
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Pharmasoft
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Pharmasoft` DEFAULT CHARACTER SET utf8 ;
USE `Pharmasoft` ;

-- -----------------------------------------------------
-- Table `Pharmasoft`.`Customer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pharmasoft`.`Customer` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(45) NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Contact` VARCHAR(15) NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Email_UNIQUE` (`Email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Pharmasoft`.`Cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pharmasoft`.`Cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `complete` TINYINT NOT NULL DEFAULT 0,
  `Transaction_id` VARCHAR(100) NULL,
  `Customer_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `Transaction_id_UNIQUE` (`Transaction_id` ASC) VISIBLE,
  INDEX `fk_Cart_Customer_idx` (`Customer_id` ASC) VISIBLE,
  CONSTRAINT `fk_Cart_Customer`
    FOREIGN KEY (`Customer_id`)
    REFERENCES `Pharmasoft`.`Customer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Pharmasoft`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pharmasoft`.`Product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(45) NOT NULL,
  `price` INT NOT NULL,
  `image` VARCHAR(45) NULL,
  `prescride` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Pharmasoft`.`Cart_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Pharmasoft`.`Cart_item` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Quantity` INT NULL DEFAULT 0,
  `Cart_id` INT NOT NULL,
  `Product_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_Cart_item_Cart1_idx` (`Cart_id` ASC) VISIBLE,
  INDEX `fk_Cart_item_Product1_idx` (`Product_id` ASC) VISIBLE,
  CONSTRAINT `fk_Cart_item_Cart1`
    FOREIGN KEY (`Cart_id`)
    REFERENCES `Pharmasoft`.`Cart` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Cart_item_Product1`
    FOREIGN KEY (`Product_id`)
    REFERENCES `Pharmasoft`.`Product` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
