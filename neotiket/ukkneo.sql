-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 20, 2025 at 08:36 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukkneo`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `schedule_id` int NOT NULL,
  `user_id` int NOT NULL,
  `seat_no` varchar(255) NOT NULL,
  `status` enum('booked','checked') NOT NULL,
  `checkin_code` varchar(255) NOT NULL,
  `nama_pemesan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `schedule_id`, `user_id`, `seat_no`, `status`, `checkin_code`, `nama_pemesan`) VALUES
(19, 4, 11, '', 'booked', 'CKN-09E4DB', 'Testt123');

-- --------------------------------------------------------

--
-- Table structure for table `carriages`
--

CREATE TABLE `carriages` (
  `id` int NOT NULL,
  `seat_count` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `id` int NOT NULL,
  `train_name` varchar(255) NOT NULL,
  `departure` datetime NOT NULL,
  `arrival` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `train_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `schedules`
--

INSERT INTO `schedules` (`id`, `train_name`, `departure`, `arrival`, `price`, `train_id`) VALUES
(2, 'KRL', '2025-11-19 01:05:16', '2025-11-19 09:05:16', 8000, 1),
(4, 'KRL', '2025-11-20 00:31:41', '2025-11-20 00:31:41', 8000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `trains`
--

CREATE TABLE `trains` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `train_id` int NOT NULL,
  `routes` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trains`
--

INSERT INTO `trains` (`id`, `name`, `train_id`, `routes`) VALUES
(1, 'Argo Lawu', 1, ''),
(2, 'KRL', 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','petugas','pelanggan','') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `name`) VALUES
(1, 'Neo Effendi', '123', 'admin', '2025-11-18 02:00:30', ''),
(2, 'Test1', '123', 'pelanggan', '2025-11-18 04:18:30', ''),
(3, 'Neoe', '123', 'admin', '2025-11-18 05:54:04', 'Neo Effendi'),
(4, 'Neoee', 'Neoe', 'pelanggan', '2025-11-18 06:22:48', '123'),
(5, 'Altap', 'Altap', 'pelanggan', '2025-11-18 06:28:55', '123'),
(6, 'nxveon', 'Neo Effe', 'pelanggan', '2025-11-18 06:35:49', '123'),
(7, 'testing123', 'Neo Effe', 'pelanggan', '2025-11-18 06:38:26', ''),
(8, 'TEst', 'Neo', 'pelanggan', '2025-11-18 06:39:36', '123'),
(9, 'TEst23', 'Neo Effendi', 'pelanggan', '2025-11-18 06:40:00', '123'),
(10, 'Efendi', '123', 'pelanggan', '2025-11-18 06:40:34', 'Effendi'),
(11, 'Testt123', '123', 'pelanggan', '2025-11-20 06:15:41', 'Testt123'),
(12, 'Testing', '123', 'pelanggan', '2025-11-20 06:40:26', 'Tester'),
(13, 'ABC', '123', 'petugas', '2025-11-20 06:41:27', 'ABC'),
(14, 'Efendi', '123', 'pelanggan', '2025-11-20 06:48:47', 'Effendi'),
(15, 'Tester', '123', 'pelanggan', '2025-11-20 06:53:19', 'Tester'),
(16, '', '', 'petugas', '2025-11-20 07:15:46', 'Argo Lawu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `schedule_id` (`schedule_id`),
  ADD UNIQUE KEY `checkin_code` (`checkin_code`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `carriages`
--
ALTER TABLE `carriages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `train_id` (`train_id`);

--
-- Indexes for table `trains`
--
ALTER TABLE `trains`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `carriages`
--
ALTER TABLE `carriages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `trains`
--
ALTER TABLE `trains`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
