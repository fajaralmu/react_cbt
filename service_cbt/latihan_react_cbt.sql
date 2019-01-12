-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jan 12, 2019 at 07:50 AM
-- Server version: 10.1.13-MariaDB
-- PHP Version: 7.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `latihan_react_cbt`
--

-- --------------------------------------------------------

--
-- Table structure for table `exam`
--

CREATE TABLE `exam` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '1',
  `subject` varchar(100) NOT NULL,
  `selection_count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `exam`
--

INSERT INTO `exam` (`id`, `user_id`, `subject`, `selection_count`) VALUES
(1, 1, 'Mathe', 3),
(2, 1, 'Math_2', 3),
(3, 1, 'Math 3', 3);

-- --------------------------------------------------------

--
-- Table structure for table `question`
--

CREATE TABLE `question` (
  `id` int(11) NOT NULL,
  `exam_id` int(11) NOT NULL,
  `number` int(11) NOT NULL,
  `question` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `question`
--

INSERT INTO `question` (`id`, `exam_id`, `number`, `question`) VALUES
(1, 1, 0, '3/3 ='),
(2, 1, 0, '3-2='),
(3, 1, 0, '9-0='),
(4, 1, 0, '4-3'),
(5, 1, 0, '3-2'),
(6, 2, 0, '3/3 ='),
(7, 2, 0, '3 - 2 = '),
(8, 2, 0, '5 - 2'),
(9, 2, 0, '2 + 10 ='),
(10, 2, 0, '44 - 10 ='),
(16, 3, 0, '10 - 3 ='),
(17, 3, 0, '30-20='),
(18, 3, 0, '21-9='),
(19, 3, 0, '22/2'),
(20, 3, 0, '22 - 10 ='),
(21, 3, 0, '60/3');

-- --------------------------------------------------------

--
-- Table structure for table `selection`
--

CREATE TABLE `selection` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `value` text NOT NULL,
  `correct` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `selection`
--

INSERT INTO `selection` (`id`, `question_id`, `value`, `correct`) VALUES
(1, 1, '2', 0),
(2, 1, '1', 1),
(3, 1, '3', 0),
(4, 2, '2', 0),
(5, 2, '13', 0),
(6, 2, '1', 1),
(7, 3, '2', 0),
(8, 3, '3', 0),
(9, 3, '9', 1),
(10, 4, '2', 0),
(11, 4, '1', 1),
(12, 4, '4', 0),
(13, 5, '3', 0),
(14, 5, '1', 1),
(15, 5, '32', 0),
(16, 6, '2', 0),
(17, 6, '1', 1),
(18, 6, '3', 0),
(19, 7, '1', 1),
(20, 7, '3', 0),
(21, 7, '2', 0),
(22, 8, '2', 0),
(23, 8, '3', 1),
(24, 8, '1', 0),
(25, 9, '11', 0),
(26, 9, '12', 1),
(27, 9, '13', 0),
(28, 10, '33', 0),
(29, 10, '32', 0),
(30, 10, '34', 1),
(31, 11, '2', 0),
(32, 11, '4', 0),
(33, 11, '6', 1),
(34, 12, '3', 0),
(35, 12, '2', 1),
(36, 12, '1', 0),
(37, 13, '-6', 1),
(38, 13, '-2', 0),
(39, 13, '-3', 0),
(40, 14, '3', 0),
(41, 14, '-3', 1),
(42, 14, '-9', 0),
(43, 15, '22', 0),
(44, 15, '21', 1),
(45, 15, '23', 0),
(46, 16, '4', 0),
(47, 16, '5', 0),
(48, 16, '7', 1),
(49, 17, '10', 1),
(50, 17, '12', 0),
(51, 17, '11', 0),
(52, 18, '8', 1),
(53, 18, '7', 0),
(54, 18, '6', 0),
(55, 19, '12', 0),
(56, 19, '11', 1),
(57, 19, '13', 0),
(58, 20, '11', 0),
(59, 20, '13', 0),
(60, 20, '12', 1),
(61, 21, '20', 1),
(62, 21, '21', 0),
(63, 21, '22', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `name`, `password`) VALUES
(1, 'fajar', 'el-Fajr', '123'),
(2, 'fajarlm', 'eMunawar', '123'),
(3, 'el', 'fajr', '123'),
(4, 'd', 'd', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exam`
--
ALTER TABLE `exam`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `selection`
--
ALTER TABLE `selection`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exam`
--
ALTER TABLE `exam`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `question`
--
ALTER TABLE `question`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT for table `selection`
--
ALTER TABLE `selection`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
