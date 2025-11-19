-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 05, 2025 at 09:15 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skincancer`
--

-- --------------------------------------------------------

--
-- Table structure for table `analysis_results`
--

CREATE TABLE `analysis_results` (
  `result_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `risk_nv` decimal(5,2) DEFAULT NULL,
  `level_nv` varchar(20) DEFAULT NULL,
  `risk_bcc` decimal(5,2) DEFAULT NULL,
  `level_bcc` varchar(20) DEFAULT NULL,
  `risk_scc` decimal(5,2) DEFAULT NULL,
  `level_scc` varchar(20) DEFAULT NULL,
  `risk_melanoma` decimal(5,2) DEFAULT NULL,
  `level_melanoma` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_detected` tinyint(1) NOT NULL DEFAULT 0 COMMENT '0=ไม่พบ 1=พบ'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `analysis_results`
--

INSERT INTO `analysis_results` (`result_id`, `user_id`, `image_url`, `risk_nv`, `level_nv`, `risk_bcc`, `level_bcc`, `risk_scc`, `level_scc`, `risk_melanoma`, `level_melanoma`, `created_at`, `is_detected`) VALUES
(1, 1, '/uploads/analysis/image-1753949526009-359178002.jpg', '0.35', 'ความเสี่ยงปานกลาง', '0.20', 'ความเสี่ยงต่ำ', '0.12', 'ความเสี่ยงต่ำ', '0.00', 'ไม่มีความเสี่ยง', '2025-07-31 08:12:06', 1),
(3, 1, '/uploads/analysis/image-1754247417827-20042766.jpg', '0.25', 'ความเสี่ยงต่ำ', '0.00', 'ไม่มีความเสี่ยง', '0.00', 'ไม่มีความเสี่ยง', '0.75', 'ความเสี่ยงสูง', '2025-07-31 18:56:57', 1),
(4, 1, '/uploads/analysis/image-1754248580722-768680711.jpg', '0.38', 'ความเสี่ยงปานกลาง', '0.00', 'ไม่มีความเสี่ยง', '0.00', 'ไม่มีความเสี่ยง', '0.62', 'ความเสี่ยงสูง', '2025-08-03 19:16:20', 1),
(5, 4, '/uploads/analysis/image-1754292131627-32708496.jpg', '0.43', 'ความเสี่ยงปานกลาง', '0.04', 'ความเสี่ยงต่ำ', '0.00', 'ไม่มีความเสี่ยง', '0.53', 'ความเสี่ยงปานกลาง', '2025-07-31 07:22:11', 1),
(6, 4, '/uploads/analysis/image-1754313861980-184836656.jpg', '0.25', 'ความเสี่ยงต่ำ', '0.30', 'ความเสี่ยงปานกลาง', '0.24', 'ความเสี่ยงต่ำ', '0.22', 'ความเสี่ยงต่ำ', '2025-08-01 17:00:00', 1),
(7, 3, '/uploads/analysis/image-1754319465504-217648110.jpg', '0.02', 'ความเสี่ยงต่ำ', '0.00', 'ไม่มีความเสี่ยง', '0.00', 'ไม่มีความเสี่ยง', '0.98', 'ความเสี่ยงสูง', '2025-08-03 14:57:45', 1),
(8, 3, '/uploads/analysis/image-1754319545546-155580309.jpg', '0.40', 'ความเสี่ยงปานกลาง', '0.01', 'ความเสี่ยงต่ำ', '0.00', 'ไม่มีความเสี่ยง', '0.58', 'ความเสี่ยงปานกลาง', '2025-08-04 14:59:05', 1),
(9, 6, '/uploads/analysis/image-1758625485477-466613018.jpg', '0.69', 'ความเสี่ยงสูง', '0.02', 'ความเสี่ยงต่ำ', '0.04', 'ความเสี่ยงต่ำ', '0.03', 'ความเสี่ยงต่ำ', '2025-09-23 11:04:45', 1),
(10, 6, '/uploads/analysis/image-1758625641954-513704345.jpg', '0.56', 'ความเสี่ยงปานกลาง', '0.00', 'ไม่มีความเสี่ยง', '0.00', 'ไม่มีความเสี่ยง', '0.44', 'ความเสี่ยงปานกลาง', '2025-09-23 11:07:21', 1),
(13, 6, '/uploads/analysis/image-1758657875715-55126786.jpg', '0.07', 'ความเสี่ยงต่ำ', '0.59', 'ความเสี่ยงปานกลาง', '0.00', 'ไม่มีความเสี่ยง', '0.33', 'ความเสี่ยงปานกลาง', '2025-09-23 20:04:35', 1),
(14, 6, '/uploads/analysis/image-1758823952912-880550341.webp', '0.18', 'ความเสี่ยงต่ำ', '0.05', 'ความเสี่ยงต่ำ', '0.47', 'ความเสี่ยงปานกลาง', '0.28', 'ความเสี่ยงต่ำ', '2025-09-25 18:12:32', 1),
(15, 6, '/uploads/analysis/image-1758824155572-639628009.jpg', '0.00', 'ไม่มีความเสี่ยง', '0.03', 'ความเสี่ยงต่ำ', '0.34', 'ความเสี่ยงปานกลาง', '0.00', 'ไม่มีความเสี่ยง', '2025-09-25 18:15:55', 0),
(16, 8, '/uploads/analysis/image-1759377761545-598126173.jpg', '0.22', 'ความเสี่ยงต่ำ', '0.17', 'ความเสี่ยงต่ำ', '0.12', 'ความเสี่ยงต่ำ', '0.50', 'ความเสี่ยงปานกลาง', '2025-10-02 04:02:41', 1);

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `article_id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` longtext NOT NULL,
  `source` varchar(200) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `view_count` int(11) DEFAULT 0,
  `category_id` int(11) DEFAULT NULL,
  `cancer_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`article_id`, `title`, `content`, `source`, `image_url`, `created_at`, `updated_at`, `view_count`, `category_id`, `cancer_types`) VALUES
(1, 'รู้จักกับมะเร็งผิวหนังเมลาโนมา (Melanoma)', '<h2><strong>Melanoma คืออะไร?</strong></h2>\r\n<p class=\"p1\"><strong>มะเร็งเมลาโนมา</strong><span class=\"s1\">&nbsp;(Malignant Melanoma)&nbsp;</span><strong>เป็นโรคที่รุนแรงที่สุดของมะเร็งผิวหนัง</strong>&nbsp;ซึ่งสามารถเกิดขึ้นได้ทุกส่วนในร่างกายรวมถึงบริเวณที่ไม่ได้โดนแดด มะเร็งเมลาโนมาสามารถขยายตัวได้รวดเร็วและมีความเสี่ยงสูงที่จะแพร่กระจายไปยังส่วนอื่น ๆ ของร่างกาย</p>\r\n<h4 class=\"p1\"><strong>ลักษณะและอาการของมะเร็งเมลาโนมา</strong></h4>\r\n<ul>\r\n<li class=\"p1\">ไฝที่เปลี่ยนขนาด รูปร่าง หรือสี</li>\r\n<li class=\"p1\">ไฝที่เกิดขึ้นใหม่และใหญ่ขึ้นอย่างรวดเร็ว</li>\r\n<li class=\"p1\">ไฝหรือปื้นบนผิวหนังที่มีรูปร่างผิดปกติ</li>\r\n<li class=\"p1\">ไฝที่มีเส้นขอบขรุขระหรือสีไม่สม่ำเสมอ</li>\r\n<li class=\"p1\">ไฝที่รูปร่างผิดปกติโดยสองข้างไม่เท่ากัน</li>\r\n<li class=\"p1\">ไฝที่มีอาการคัน เลือดออก และรู้สึกเจ็บ</li>\r\n<li class=\"p1\">เล็บที่มีรอยคล้ำ สีดำ หรือสีน้ำตาล</li>\r\n<li class=\"p1\">แผลที่รักษาไม่หาย</li>\r\n</ul>\r\n<p><img class=\"size-full wp-image-77025 alignnone\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://static.bangkokhospital.com/uploads/2023/04/WIHL-%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%87%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%94%E0%B9%89-is-03.jpg\" alt=\"มะเร็งผิวหนังดูแลจัดการได้\" width=\"375\" height=\"250\" loading=\"lazy\"></p>\r\n<h4 class=\"p6\"><strong>ขั้นตอนการตรวจมะเร็งเมลาโนมา</strong></h4>\r\n<p class=\"p1\"><strong>การตรวจหารอยโรคมะเร็งเมลาโนมา มีขั้นตอนดังต่อไปนี้<span class=\"Apple-converted-space\">&nbsp;</span></strong></p>\r\n<ul>\r\n<li class=\"p1\">การตรวจผิวหนังที่มีการผิดปกติโดยแพทย์ผิวหนัง</li>\r\n<li class=\"p1\">การตรวจชิ้นเนื้อผิวหนังโดยตัดเนื้อเยื่อผิวหนังบางส่วนออกไปเพื่อส่องกล้องจุลทรรศน์ตรวจหาเซลล์มะเร็ง</li>\r\n<li class=\"p1\">การตัดต่อมน้ำเหลืองใกล้บริเวณที่เป็นมะเร็งเพื่อตรวจหาการแพร่การจายของมะเร็ง</li>\r\n<li class=\"p1\">การตรวจวินิจฉัยโรคด้วยคลื่นแม่เหล็กไฟฟ้า อาทิ<span class=\"s1\">&nbsp;X-rays, PET CT Scan&nbsp;</span>และ<span class=\"s1\">&nbsp;MRI&nbsp;</span>เพื่อตรวจหารอยโรคในส่วนอื่นของร่างกาย</li>\r\n</ul>\r\n<h3 class=\"p3\"><strong>รักษามะเร็งเมลาโนมา</strong></h3>\r\n<ul>\r\n<li class=\"p1\"><strong>ผ่าตัด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>โดยการตัดก้อนเนื้อและเนื้อเยื่อโดยรอบออก ในคนไข้บางรายอาจจำเป็นต้องปลูกถ่ายผิวหนังเพื่อปิดแผล</li>\r\n<li class=\"p1\"><strong>การผ่าตัดต่อมน้ำเหลืองเซนติเนล</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การตัดต่อมน้ำเหลืองที่อยู่ใกล้ก้อนเนื้อเพื่อตรวจหาการแพร่กระจายของมะเร็ง</li>\r\n<li class=\"p1\"><strong>การผ่าตัดเลาะต่อมน้ำเหลือง</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>หากมีเซลล์มะเร็งที่ต่อมน้ำเหลืองเซนติเนล แพทย์อาจจำเป็นต้องเลาะต่อมน้ำเหลืองใกล้เคียงออกเพิ่มเติม</li>\r\n<li class=\"p1\"><strong>การรักษาแบบมุ่งเป้า</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้ยามุ่งเป้าเพื่อยับยั้งการเติบโตของมะเร็งผิวหนังบางชนิดได้</li>\r\n<li class=\"p1\"><strong>ภูมิคุ้มกันบำบัด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้ยาที่ช่วยกระตุ้นภูมิคุ้มกันของร่างกายให้ต่อสู้กับมะเร็งอาจนำมาใช้เสริมหลังการผ่าตัดเพื่อลดความเสี่ยงการเป็นซ้ำ หรือใช้เป็นวิธีรักษาเริ่มต้นของมะเร็งผิวหนังระยะที่<span class=\"s1\">&nbsp;4</span></li>\r\n<li class=\"p1\"><strong>รังสีรักษา</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การรักษาโรคโดยการใช้รังสีพลังงานสูงเพื่อทำลายเนื้อเยื่อเซลล์มะเร็งหรือทำให้ฝ่อลง วิธีนี้อาจนำมาใช้ในผู้ป่วยที่มะเร็งแพร่กระจายไปส่วนอื่นของร่างกาย หรือในการรักษาแบบประคับประคอง</li>\r\n</ul>\r\n<p class=\"p1\">แผนการรักษาเป็นแผนเฉพาะแต่ละบุคคล ซึ่งอาจเป็นการผสมผสานการรักษาที่แตกต่างกัน ขึ้นอยู่กับระยะหรือขั้นของมะเร็ง สุขภาพ และปัจจัยอื่นๆ ผู้ป่วยควรปรึกษาทีมแพทย์ผู้เชี่ยวชาญ อาทิ แพทย์ผิวหนัง ศัลยแพทย์และอายุรแพทย์มะเร็งวิทยา เพื่อจัดทำแผนการรักษาเฉพาะบุคคล</p>\r\n<h4 class=\"p3\"><strong>การพยากรณ์ผลการรักษาโรคมะเร็งเมลาโนมา</strong></h4>\r\n<p class=\"p1\"><strong>อัตราการรอดชีวิตของมะเร็งชนิดนี้ค่อนข้างดีสำหรับผู้ที่เป็นระยะเริ่มต้นและลดลงหากเป็นระยะลุกลาม สมาคมมะเร็งแห่งอเมริกาให้ข้อมูลอัตราการรอดชีวิตภายใน<span class=\"s1\">&nbsp;5&nbsp;</span>ปีของมะเร็งผิวหนังตามระยะของการเป็นมะเร็งหลังจากตรวจพบไว้ดังนี้</strong></p>\r\n<ul>\r\n<li class=\"p1\"><strong>ระยะที่</strong><span class=\"s1\"><strong>&nbsp;0&nbsp;</strong></span><strong>หรือระยะเริ่มต้น</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>อัตราการรอดชีวิตเกือบ<span class=\"s1\">&nbsp;100%</span></li>\r\n<li class=\"p1\"><strong>ระยะที่</strong><span class=\"s1\"><strong>&nbsp;1:</strong>&nbsp;</span>อัตราการรอดชีวิต<span class=\"s1\">&nbsp;95 &ndash; 100%</span></li>\r\n<li class=\"p1\"><strong>ระยะที่</strong><span class=\"s1\"><strong>&nbsp;2:</strong>&nbsp;</span>อัตราการรอดชีวิต<span class=\"s1\">&nbsp;80 &ndash; 90%<span class=\"Apple-converted-space\">&nbsp;</span></span></li>\r\n<li class=\"p1\"><strong>ระยะที่</strong><span class=\"s1\"><strong>&nbsp;3:</strong>&nbsp;</span>อัตราการรอดชีวิต<span class=\"s1\">&nbsp;40 &ndash; 70%</span></li>\r\n<li class=\"p1\"><strong>ระยะที่</strong><span class=\"s1\"><strong>&nbsp;4:</strong>&nbsp;</span>อัตราการรอดชีวิต<span class=\"s1\">&nbsp;15 &ndash; 20%</span></li>\r\n</ul>\r\n<p class=\"p1\"><strong>อัตราการรอดชีวิตเหล่านี้เป็นเพียงค่าเฉลี่ย การพยากรณ์โรคของแต่ละคนอาจแตกต่างกันไปขึ้นอยู่กับหลายปัจจัย</strong></p>\r\n<h3 class=\"p3\"><strong>ป้องกันโรคมะเร็งผิวหนัง</strong></h3>\r\n<p class=\"p1\"><strong>การป้องกันโรคมะเร็งผิวหนังเป็นการป้องกันผิวหนังจากรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ซึ่งเป็นสาเหตุหลักของมะเร็งผิวหนัง โดยมีวิธีป้องกันดังต่อไปนี้</strong></p>\r\n<ol>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการถูกแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันการถูกแสงแดดเผาด้วยการอยู่ในร่ม ใส่อุปกรณ์ป้องกันแดด อาทิ หมวกและเสื้อแขนยาว ใช้ครีมกันแดดที่มีประสิทธิภาพป้องกันได้ทั้งรังสี<span class=\"s1\">&nbsp;UVA&nbsp;</span>และ<span class=\"s1\">&nbsp;UVB&nbsp;</span>และมี<span class=\"s1\">&nbsp;SPF 30&nbsp;</span>เป็นอย่างต่ำ</li>\r\n<li class=\"p1\"><strong>จำกัดเวลาการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>โดยเฉพาะอย่างยิ่งช่วงที่แดดแรงที่สุด<span class=\"s1\">&nbsp;(</span>ช่วง<span class=\"s1\">&nbsp;10.00&nbsp;</span>น<span class=\"s1\">.&nbsp;</span>และ<span class=\"s1\">&nbsp;16.00&nbsp;</span>น<span class=\"s1\">.)</span></li>\r\n<li class=\"p1\"><strong>หมั่นตรวจดูผิว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ตรวจดูสภาพผิวด้วยตัวเอง โดยดูให้ละเอียดว่ามีไฝหรือก้อนเนื้อแปลก ๆ หรือไม่ ถ้าพบความผิดปกติไม่ว่าจะเป็นขนาด รูปร่าง สี หรือเนื้อสัมผัสที่น่าสงสัยควรรีบปรึกษาแพทย์ผิวหนังทันที</li>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการอาบแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้เตียงอาบแดด<span class=\"s1\">&nbsp;(Tanning Bed)&nbsp;</span>จะทำให้ผิวหนังได้รับรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ที่เป็นอันตราย และเพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนังจึงไม่ควรใช้เป็นอย่างยิ่ง</li>\r\n<li class=\"p1\"><strong>ปกป้องลูกของคุณจากการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันลูก ๆ จากแสงแดดด้วยการใช้ครีมกันแดด หมวก และเสื้อผ้าหรืออุปกรณ์ป้องกันแดดอื่น ๆ และจำกัดเวลาการเล่นที่ออกแดด</li>\r\n<li class=\"p1\"><strong>ตรวจประวัติสมาชิกในครอบครัว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>หากมีสมาชิกในครอบครัวเคยเป็นมะเร็งผิวหนัง คุณอาจมีความเสี่ยงมากกว่าคนอื่น จึงควรระมัดระวังเป็นพิเศษในการปกป้องผิวของคุณ<span class=\"Apple-converted-space\">&nbsp;</span></li>\r\n<li class=\"p1\"><strong>เลิกสูบบุหรี่</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การสูบบุหรี่เพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนัง จึงควรเลิกสูบเพื่อลดความเสี่ยง</li>\r\n</ol>\r\n<p class=\"p1\">การป้องกันเป็นปัจจัยสำคัญของมะเร็งผิวหนังจึงควรปฏิบัติตามอย่างเคร่งครัดเพื่อป้องกันตัวเองและลดความเสี่ยงในการเกิดมะเร็งผิวหนัง</p>', 'https://www.bangkokhospital.com/th/bangkok-cancer/content/management-of-skin-cancer', '/uploads/articles/image-1754286128202-634707243.jpg', '2025-06-27 15:41:49', '2025-10-05 17:25:55', 50, 1, '[\"melanoma\"]'),
(2, 'รู้จักกับมะเร็งผิวหนังสแควมัสเซลล์ (Squamous Cell Carcinoma หรือ SCC)', '<h2>Squamous Cell Carcinoma คืออะไร?</h2>\r\n<p class=\"p1\"><strong>มะเร็งสแควมัสเซลล์</strong><span class=\"s1\">&nbsp;(Squamous Cell Carcinoma&nbsp;</span>หรือ<span class=\"s1\">&nbsp;SCC)&nbsp;</span><strong>เป็นมะเร็งผิวหนังที่พบมากเป็นอันดับที่<span class=\"s1\">&nbsp;2&nbsp;</span></strong>มักปรากฏบนผิวหนังบริเวณที่โดนแสงแดดเหมือนกัน แต่สามารถพัฒนาไปยังส่วนอื่น ๆ ของร่างกายได้ สเควมัสเซลล์สามารถเติบโตได้อย่างรวดเร็วและมีความเสี่ยงในการแพร่กระจายไปยังส่วนอื่น ๆ ของร่างกายมากกว่ามะเร็งเบเซลเซลล์</p>\r\n<h4 class=\"p1\"><strong>ลักษณะและอาการมะเร็งสแควมัสเซลล์</strong></h4>\r\n<ul>\r\n<li class=\"p1\">สะเก็ดบนผิว ซึ่งอาจมีผิวขรุขระหรือมีเลือดออก</li>\r\n<li class=\"p1\">ก้อนแข็ง ๆ บนผิวหนังที่อาจมีลักษณะขรุขระ</li>\r\n<li class=\"p1\">แผลที่เป็นแล้วไม่หาย หรือหายแล้วกลับมาเป็นอีก</li>\r\n<li class=\"p1\">แผลตกสะเก็ดที่อาจมีสะเก็ดแข็งหรือขรุขระ</li>\r\n<li class=\"p1\">ลักษณะคล้ายหูดที่มีผิวรอบนอกแข็งและมีเลือดออก</li>\r\n<li class=\"p1\">ก้อนนูนที่ตรงกลางบุ๋ม อาจมีเลือดออกหรือผิวขรุขระ</li>\r\n</ul>\r\n<p><img class=\"size-full wp-image-77024 alignnone\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://static.bangkokhospital.com/uploads/2023/04/WIHL-%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%87%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%94%E0%B9%89-is-02.jpg\" alt=\"มะเร็งผิวหนังดูแลจัดการได้\" width=\"375\" height=\"250\" loading=\"lazy\"></p>\r\n<h4 class=\"p6\"><strong>ขั้นตอนการตรวจมะเร็งสแควมัสเซลล์</strong></h4>\r\n<p class=\"p1\"><strong>การตรวจหารอยโรคมะเร็งสแควมัสเซลล์ มีขั้นตอนดังต่อไปนี้<span class=\"Apple-converted-space\">&nbsp;</span></strong></p>\r\n<ul>\r\n<li class=\"p1\">การตรวจผิวหนังที่มีการผิดปกติโดยแพทย์ผิวหนัง</li>\r\n<li class=\"p1\">การตรวจชิ้นเนื้อผิวหนังโดยการตัดเนื้อเยื่อผิวหนังบางส่วนออกไปเพื่อส่องกล้องจุลทรรศน์ตรวจหาเซลล์มะเร็ง</li>\r\n<li class=\"p1\">การตรวจวินิจฉัยโรคด้วยคลื่นแม่เหล็กไฟฟ้า อาทิ<span class=\"s1\">&nbsp;X-rays, CT Scan&nbsp;</span>และ<span class=\"s1\">&nbsp;MRI&nbsp;</span>เพื่อตรวจหาการแพร่กระจายของโรคไปยังอวัยวะใกล้เคียงอื่น ๆ</li>\r\n</ul>\r\n<h4 class=\"p6\"><strong>รักษามะเร็งสแควมัสเซลล์</strong></h4>\r\n<p class=\"p1\">โรคมะเร็งเบเซลเซลล์และมะเร็งสแควมัสเซลล์ขึ้นอยู่กับขนาด ตำแหน่ง และความลึกของก้อนเนื้อ รวมถึงอายุ สุขภาพ ความชอบส่วนตัวของผู้ป่วย และพฤติกรรมการใช้ชีวิตประจำวันของผู้ป่วย วิธีการรักษามีดังต่อไปนี้</p>\r\n<ul>\r\n<li class=\"p1\"><strong>การขูดและจี้ด้วยไฟฟ้า</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ขั้นตอนการทำหัตถการด้วยเครื่องมือขูดเนื้อเยื่อที่เป็นมะเร็งออก โดยจี้ด้วยเข็มไฟฟ้าเพื่อทำลายเซลล์มะเร็งให้หมด</li>\r\n<li class=\"p1\"><strong>การผ่าตัดชิ้นเนื้อ</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ก้อนเนื้อและผิวหนังโดยรอบจะถูกตัดออก แพทย์สามารถให้ยาชาเฉพาะที่และผ่าตัดแบบผู้ป่วยนอกที่โรงพยาบาล</li>\r\n<li class=\"p1\"><strong>การผ่าตัด</strong><span class=\"s3\"><strong>แบบ</strong></span><span class=\"s4\"><strong>&nbsp;Mohs&nbsp;</strong></span><span class=\"s1\"><strong>(Mohs Surgery):</strong>&nbsp;</span>เทคนิคการผ่าตัดเฉพาะทางโดยการนำเอาเนื้องอกออกทีละชั้น ๆ เพื่อตรวจดูด้วยกล้องจุลทรรศน์จนไม่เหลือเซลล์มะเร็ง</li>\r\n<li class=\"p1\"><strong>การรักษาด้วยความเย็น</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การจี้เย็นเนื้อเยื่อที่เป็นมะเร็งด้วยไนโตรเจนเหลว</li>\r\n<li class=\"p1\"><strong>การใช้ยาทา</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>สำหรับมะเร็งเบเซลเซลล์ที่ไม่รุนแรงสามารถรักษาได้ด้วยยาทา เช่น<span class=\"s1\">&nbsp;imiquimod&nbsp;</span>และ<span class=\"s1\">&nbsp;5-fluorouracil&nbsp;</span>หรือการฉายแสงเพื่อการบำบัด</li>\r\n<li class=\"p1\"><strong>รังสีรักษา</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การรักษาโรคโดยการใช้รังสีพลังงานสูงเพื่อทำลายเนื้อเยื่อเซลล์มะเร็งหรือทำให้ฝ่อลง</li>\r\n<li class=\"p1\"><strong>เคมีบำบัด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้ยาฆ่าเซลล์มะเร็ง ซึ่งอาจทำควบคู่กับรังสีรักษา</li>\r\n</ul>\r\n<p class=\"p1\">โรคมะเร็งเบเซลเซลล์และมะเร็งสเควมัสเซลล์สามารถรักษาให้หายได้ ผู้ป่วยส่วนใหญ่รักษาให้หายขาดได้ด้วยการผ่าตัดเพียงอย่างเดียว อย่างไรก็ตาม หากมะเร็งแพร่กระจายไปยังต่อมน้ำเหลืองหรืออวัยวะอื่น ๆ แล้ว อาจจำเป็นต้องใช้แผนรักษาที่เข้มข้นขึ้น เช่น รังสีรักษาหรือเคมีบำบัด<span class=\"Apple-converted-space\">&nbsp;</span></p>\r\n<h4 class=\"p3\"><strong>การพยากรณ์ผลการรักษาโรคมะเร็งสแควมัสเซลล์</strong></h4>\r\n<p class=\"p1\">โดยทั่วไปแล้วทั้งโรคมะเร็งเบเซลเซลล์และมะเร็งสแควมัสเซลล์หากตรวจพบเร็วและได้รับการรักษาอย่างเหมาะสมมักจะได้ผลลัพธ์ที่ดี อัตราการรอดชีวิตใน <span class=\"s4\">5</span>&nbsp;ปีสำหรับผู้ป่วยโรคมะเร็งสเควมัสเซลล์ และโรคมะเร็งเบเซลเซลล์ที่ไม่ได้แพร่กระจายไปยังอวัยวะอื่นอยู่ที่ประมาณ<span class=\"s1\">&nbsp;95%&nbsp;</span>และ<span class=\"s1\">&nbsp;99%&nbsp;</span>ตามลำดับ หากมะเร็งมีการแพร่กระจายไปยังอวัยวะอื่น ๆ การพยากรณ์โรคอาจไม่ได้ผลที่น่าพอใจ</p>\r\n<h3 class=\"p3\"><strong>ป้องกันโรคมะเร็งผิวหนัง</strong></h3>\r\n<p class=\"p1\"><strong>การป้องกันโรคมะเร็งผิวหนังเป็นการป้องกันผิวหนังจากรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ซึ่งเป็นสาเหตุหลักของมะเร็งผิวหนัง โดยมีวิธีป้องกันดังต่อไปนี้</strong></p>\r\n<ol>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการถูกแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันการถูกแสงแดดเผาด้วยการอยู่ในร่ม ใส่อุปกรณ์ป้องกันแดด อาทิ หมวกและเสื้อแขนยาว ใช้ครีมกันแดดที่มีประสิทธิภาพป้องกันได้ทั้งรังสี<span class=\"s1\">&nbsp;UVA&nbsp;</span>และ<span class=\"s1\">&nbsp;UVB&nbsp;</span>และมี<span class=\"s1\">&nbsp;SPF 30&nbsp;</span>เป็นอย่างต่ำ</li>\r\n<li class=\"p1\"><strong>จำกัดเวลาการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>โดยเฉพาะอย่างยิ่งช่วงที่แดดแรงที่สุด<span class=\"s1\">&nbsp;(</span>ช่วง<span class=\"s1\">&nbsp;10.00&nbsp;</span>น<span class=\"s1\">.&nbsp;</span>และ<span class=\"s1\">&nbsp;16.00&nbsp;</span>น<span class=\"s1\">.)</span></li>\r\n<li class=\"p1\"><strong>หมั่นตรวจดูผิว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ตรวจดูสภาพผิวด้วยตัวเอง โดยดูให้ละเอียดว่ามีไฝหรือก้อนเนื้อแปลก ๆ หรือไม่ ถ้าพบความผิดปกติไม่ว่าจะเป็นขนาด รูปร่าง สี หรือเนื้อสัมผัสที่น่าสงสัยควรรีบปรึกษาแพทย์ผิวหนังทันที</li>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการอาบแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้เตียงอาบแดด<span class=\"s1\">&nbsp;(Tanning Bed)&nbsp;</span>จะทำให้ผิวหนังได้รับรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ที่เป็นอันตราย และเพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนังจึงไม่ควรใช้เป็นอย่างยิ่ง</li>\r\n<li class=\"p1\"><strong>ปกป้องลูกของคุณจากการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันลูก ๆ จากแสงแดดด้วยการใช้ครีมกันแดด หมวก และเสื้อผ้าหรืออุปกรณ์ป้องกันแดดอื่น ๆ และจำกัดเวลาการเล่นที่ออกแดด</li>\r\n<li class=\"p1\"><strong>ตรวจประวัติสมาชิกในครอบครัว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>หากมีสมาชิกในครอบครัวเคยเป็นมะเร็งผิวหนัง คุณอาจมีความเสี่ยงมากกว่าคนอื่น จึงควรระมัดระวังเป็นพิเศษในการปกป้องผิวของคุณ<span class=\"Apple-converted-space\">&nbsp;</span></li>\r\n<li class=\"p1\"><strong>เลิกสูบบุหรี่</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การสูบบุหรี่เพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนัง จึงควรเลิกสูบเพื่อลดความเสี่ยง</li>\r\n</ol>\r\n<p class=\"p1\">การป้องกันเป็นปัจจัยสำคัญของมะเร็งผิวหนังจึงควรปฏิบัติตามอย่างเคร่งครัดเพื่อป้องกันตัวเองและลดความเสี่ยงในการเกิดมะเร็งผิวหนัง</p>', 'https://www.bangkokhospital.com/th/bangkok-cancer/content/management-of-skin-cancer', '/uploads/articles/image-1754286264738-265106940.jpg', '2025-06-27 05:15:39', '2025-10-05 17:34:16', 26, 1, '[\"scc\"]'),
(3, 'รู้จักกับมะเร็งผิวหนังเบเซลเซลล์ (Basal Cell Carcinoma หรือ BCC)', '<h2>Basal Cell Carcinoma คืออะไร?</h2>\r\n<p class=\"p1\"><strong>มะเร็งเบเซลเซลล์</strong><span class=\"s1\">&nbsp;(Basal Cell Carcinoma&nbsp;</span>หรือ<span class=\"s1\">&nbsp;BCC)&nbsp;</span><strong>เป็นมะเร็งผิวหนังที่พบบ่อยที่สุด กว่า<span class=\"s1\">&nbsp;80%&nbsp;</span>ของผู้ป่วยมะเร็งผิวหนังจะเป็นมะเร็งชนิดนี้ มักปรากฏบนผิวหนังที่โดนแดดบ่อย ๆ</strong>&nbsp;เช่น ใบหน้า ลำคอ และมือ มะเร็งชนิดนี้เติบโตช้าและไม่ค่อยกระจายไปยังส่วนอื่น ๆ ของร่างกาย</p>\r\n<h4 class=\"p1\"><strong>ลักษณะและอาการมะเร็งเบเซลเซลล์</strong></h4>\r\n<ul>\r\n<li class=\"p1\">ตุ่มสีขุ่นมันวาวคล้ายไข่มุก อาจมีเลือดซึมออกมา หรือเป็นก้อนแข็ง</li>\r\n<li class=\"p1\">รอยโรคเหมือนแผลเป็นแบน ๆ สีเนื้อหรือสีน้ำตาล</li>\r\n<li class=\"p1\">แผลที่มีเลือดออกหรือแผลพุพองที่หายแล้วแต่กลับมาเป็นอีก</li>\r\n<li class=\"p1\">ก้อนเนื้อสีชมพูที่มีขอบนูนและเป็นรอยบุ๋มเป็นเกล็ดขรุขระตรงกลาง</li>\r\n<li class=\"p1\">ตุ่มใส ๆ สีชมพู หรือเป็นมันเงามีเส้นเลือดเล็ก ๆ อยู่บนพื้นผิว</li>\r\n<li class=\"p1\">รอยโรคสีขาวมันวาวเหมือนแผลเป็น ไม่มีเส้นขอบที่ชัดเจน</li>\r\n</ul>\r\n<p class=\"p4\"><span class=\"Apple-converted-space\"><img class=\"alignnone wp-image-77027 size-full\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://static.bangkokhospital.com/uploads/2023/04/WIHL-%E0%B8%A1%E0%B8%B0%E0%B9%80%E0%B8%A3%E0%B9%87%E0%B8%87%E0%B8%9C%E0%B8%B4%E0%B8%A7%E0%B8%AB%E0%B8%99%E0%B8%B1%E0%B8%87%E0%B8%94%E0%B8%B9%E0%B9%81%E0%B8%A5%E0%B8%88%E0%B8%B1%E0%B8%94%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%84%E0%B8%94%E0%B9%89-is-01.jpg\" alt=\"มะเร็งผิวหนังดูแลจัดการได้\" width=\"313\" height=\"250\" loading=\"lazy\"></span></p>\r\n<h4 class=\"p6\"><strong>ขั้นตอนการตรวจมะเร็งเบเซลเซลล์</strong></h4>\r\n<p class=\"p1\"><strong>การตรวจหารอยโรคมะเร็งเบเซลเซลล์ มีขั้นตอนดังต่อไปนี้<span class=\"Apple-converted-space\">&nbsp;</span></strong></p>\r\n<ul>\r\n<li class=\"p1\">การตรวจผิวหนังที่มีการผิดปกติโดยแพทย์ผิวหนัง</li>\r\n<li class=\"p1\">การตรวจชิ้นเนื้อผิวหนังโดยการตัดเนื้อเยื่อผิวหนังบางส่วนออกไปเพื่อส่องกล้องจุลทรรศน์ตรวจหาเซลล์มะเร็ง</li>\r\n<li class=\"p1\">การตรวจวินิจฉัยโรคด้วยคลื่นแม่เหล็กไฟฟ้า อาทิ<span class=\"s1\">&nbsp;X-rays, CT Scan&nbsp;</span>และ<span class=\"s1\">&nbsp;MRI&nbsp;</span>เพื่อตรวจหาการแพร่กระจายของโรคไปยังอวัยวะใกล้เคียงอื่น ๆ</li>\r\n</ul>\r\n<h4 class=\"p6\"><strong>รักษามะเร็งเบเซลเซลล์</strong></h4>\r\n<p class=\"p1\">โรคมะเร็งเบเซลเซลล์และมะเร็งสแควมัสเซลล์ขึ้นอยู่กับขนาด ตำแหน่ง และความลึกของก้อนเนื้อ รวมถึงอายุ สุขภาพ ความชอบส่วนตัวของผู้ป่วย และพฤติกรรมการใช้ชีวิตประจำวันของผู้ป่วย วิธีการรักษามีดังต่อไปนี้</p>\r\n<ul>\r\n<li class=\"p1\"><strong>การขูดและจี้ด้วยไฟฟ้า</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ขั้นตอนการทำหัตถการด้วยเครื่องมือขูดเนื้อเยื่อที่เป็นมะเร็งออก โดยจี้ด้วยเข็มไฟฟ้าเพื่อทำลายเซลล์มะเร็งให้หมด</li>\r\n<li class=\"p1\"><strong>การผ่าตัดชิ้นเนื้อ</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ก้อนเนื้อและผิวหนังโดยรอบจะถูกตัดออก แพทย์สามารถให้ยาชาเฉพาะที่และผ่าตัดแบบผู้ป่วยนอกที่โรงพยาบาล</li>\r\n<li class=\"p1\"><strong>การผ่าตัด</strong><span class=\"s3\"><strong>แบบ</strong></span><span class=\"s4\"><strong>&nbsp;Mohs&nbsp;</strong></span><span class=\"s1\"><strong>(Mohs Surgery):</strong>&nbsp;</span>เทคนิคการผ่าตัดเฉพาะทางโดยการนำเอาเนื้องอกออกทีละชั้น ๆ เพื่อตรวจดูด้วยกล้องจุลทรรศน์จนไม่เหลือเซลล์มะเร็ง</li>\r\n<li class=\"p1\"><strong>การรักษาด้วยความเย็น</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การจี้เย็นเนื้อเยื่อที่เป็นมะเร็งด้วยไนโตรเจนเหลว</li>\r\n<li class=\"p1\"><strong>การใช้ยาทา</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>สำหรับมะเร็งเบเซลเซลล์ที่ไม่รุนแรงสามารถรักษาได้ด้วยยาทา เช่น<span class=\"s1\">&nbsp;imiquimod&nbsp;</span>และ<span class=\"s1\">&nbsp;5-fluorouracil&nbsp;</span>หรือการฉายแสงเพื่อการบำบัด</li>\r\n<li class=\"p1\"><strong>รังสีรักษา</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การรักษาโรคโดยการใช้รังสีพลังงานสูงเพื่อทำลายเนื้อเยื่อเซลล์มะเร็งหรือทำให้ฝ่อลง</li>\r\n<li class=\"p1\"><strong>เคมีบำบัด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้ยาฆ่าเซลล์มะเร็ง ซึ่งอาจทำควบคู่กับรังสีรักษา</li>\r\n</ul>\r\n<p class=\"p1\">โรคมะเร็งเบเซลเซลล์และมะเร็งสเควมัสเซลล์สามารถรักษาให้หายได้ ผู้ป่วยส่วนใหญ่รักษาให้หายขาดได้ด้วยการผ่าตัดเพียงอย่างเดียว อย่างไรก็ตาม หากมะเร็งแพร่กระจายไปยังต่อมน้ำเหลืองหรืออวัยวะอื่น ๆ แล้ว อาจจำเป็นต้องใช้แผนรักษาที่เข้มข้นขึ้น เช่น รังสีรักษาหรือเคมีบำบัด<span class=\"Apple-converted-space\">&nbsp;</span></p>\r\n<h4 class=\"p3\"><strong>การพยากรณ์ผลการรักษาโรคมะเร็งเบเซลเซลล์</strong></h4>\r\n<p class=\"p1\">โดยทั่วไปแล้วทั้งโรคมะเร็งเบเซลเซลล์และมะเร็งสแควมัสเซลล์หากตรวจพบเร็วและได้รับการรักษาอย่างเหมาะสมมักจะได้ผลลัพธ์ที่ดี อัตราการรอดชีวิตใน <span class=\"s4\">5</span>&nbsp;ปีสำหรับผู้ป่วยโรคมะเร็งสเควมัสเซลล์ และโรคมะเร็งเบเซลเซลล์ที่ไม่ได้แพร่กระจายไปยังอวัยวะอื่นอยู่ที่ประมาณ<span class=\"s1\">&nbsp;95%&nbsp;</span>และ<span class=\"s1\">&nbsp;99%&nbsp;</span>ตามลำดับ หากมะเร็งมีการแพร่กระจายไปยังอวัยวะอื่น ๆ การพยากรณ์โรคอาจไม่ได้ผลที่น่าพอใจ</p>\r\n<h3 class=\"p3\"><strong>ป้องกันโรคมะเร็งผิวหนัง</strong></h3>\r\n<p class=\"p1\"><strong>การป้องกันโรคมะเร็งผิวหนังเป็นการป้องกันผิวหนังจากรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ซึ่งเป็นสาเหตุหลักของมะเร็งผิวหนัง โดยมีวิธีป้องกันดังต่อไปนี้</strong></p>\r\n<ol>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการถูกแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันการถูกแสงแดดเผาด้วยการอยู่ในร่ม ใส่อุปกรณ์ป้องกันแดด อาทิ หมวกและเสื้อแขนยาว ใช้ครีมกันแดดที่มีประสิทธิภาพป้องกันได้ทั้งรังสี<span class=\"s1\">&nbsp;UVA&nbsp;</span>และ<span class=\"s1\">&nbsp;UVB&nbsp;</span>และมี<span class=\"s1\">&nbsp;SPF 30&nbsp;</span>เป็นอย่างต่ำ</li>\r\n<li class=\"p1\"><strong>จำกัดเวลาการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>โดยเฉพาะอย่างยิ่งช่วงที่แดดแรงที่สุด<span class=\"s1\">&nbsp;(</span>ช่วง<span class=\"s1\">&nbsp;10.00&nbsp;</span>น<span class=\"s1\">.&nbsp;</span>และ<span class=\"s1\">&nbsp;16.00&nbsp;</span>น<span class=\"s1\">.)</span></li>\r\n<li class=\"p1\"><strong>หมั่นตรวจดูผิว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ตรวจดูสภาพผิวด้วยตัวเอง โดยดูให้ละเอียดว่ามีไฝหรือก้อนเนื้อแปลก ๆ หรือไม่ ถ้าพบความผิดปกติไม่ว่าจะเป็นขนาด รูปร่าง สี หรือเนื้อสัมผัสที่น่าสงสัยควรรีบปรึกษาแพทย์ผิวหนังทันที</li>\r\n<li class=\"p1\"><strong>หลีกเลี่ยงการอาบแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การใช้เตียงอาบแดด<span class=\"s1\">&nbsp;(Tanning Bed)&nbsp;</span>จะทำให้ผิวหนังได้รับรังสี<span class=\"s1\">&nbsp;UV&nbsp;</span>ที่เป็นอันตราย และเพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนังจึงไม่ควรใช้เป็นอย่างยิ่ง</li>\r\n<li class=\"p1\"><strong>ปกป้องลูกของคุณจากการโดนแสงแดด</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>ป้องกันลูก ๆ จากแสงแดดด้วยการใช้ครีมกันแดด หมวก และเสื้อผ้าหรืออุปกรณ์ป้องกันแดดอื่น ๆ และจำกัดเวลาการเล่นที่ออกแดด</li>\r\n<li class=\"p1\"><strong>ตรวจประวัติสมาชิกในครอบครัว</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>หากมีสมาชิกในครอบครัวเคยเป็นมะเร็งผิวหนัง คุณอาจมีความเสี่ยงมากกว่าคนอื่น จึงควรระมัดระวังเป็นพิเศษในการปกป้องผิวของคุณ<span class=\"Apple-converted-space\">&nbsp;</span></li>\r\n<li class=\"p1\"><strong>เลิกสูบบุหรี่</strong><span class=\"s1\"><strong>:</strong>&nbsp;</span>การสูบบุหรี่เพิ่มความเสี่ยงในการเป็นมะเร็งผิวหนัง จึงควรเลิกสูบเพื่อลดความเสี่ยง</li>\r\n</ol>\r\n<p class=\"p1\">การป้องกันเป็นปัจจัยสำคัญของมะเร็งผิวหนังจึงควรปฏิบัติตามอย่างเคร่งครัดเพื่อป้องกันตัวเองและลดความเสี่ยงในการเกิดมะเร็งผิวหนัง</p>', 'https://www.bangkokhospital.com/th/bangkok-cancer/content/management-of-skin-cancer', '/uploads/articles/image-1754286290463-558073096.jpg', '2025-06-27 05:15:39', '2025-10-05 17:29:43', 27, 1, '[\"bcc\"]'),
(4, 'ไม่ต้องรอให้สาย! 5 วิธีป้องกันโรคอ้วนในเด็กที่ทำได้จริง', '<p style=\"margin-left: 40px;\">&nbsp;</p>\r\n<figure class=\"image image_resized\" style=\"width: 78.39%;\"><img style=\"aspect-ratio: 1280/720;\" src=\"https://healthmedia.hss.moph.go.th/wp-content/uploads/2025/06/2025-06-13_13-42-56_717798.jpg\" sizes=\"100vw\" srcset=\"https://healthmedia.hss.moph.go.th/wp-content/uploads/2025/06/2025-06-13_13-42-56_717798.jpg 1280w, https://healthmedia.hss.moph.go.th/wp-content/uploads/2025/06/2025-06-13_13-42-56_717798-768x432.jpg 768w\" alt=\"\" width=\"1280\" height=\"720\"></figure>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>โรคอ้วนในเด็กเกิดจากอะไร ?</strong></p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; โรคอ้วน คือ ภาวะที่ร่างกายมีไขมันสะสมเกินจนส่งผลเสียต่อสุขภาพ โดยมีสาเหตุจากหลายปัจจัย ได้แก่ พันธุกรรม พ่อแม่อ้วน แม่เป็นเบาหวานขณะตั้งครรภ์ หรือมีโรคทางพันธุกรรม พฤติกรรมการกิน บริโภคอาหารแปรรูป ฟาสต์ฟู้ด ขนมหวาน หรือขนมขบเคี้ยวมากเกินไป&nbsp;การใช้ชีวิตนิ่งๆ ใช้เวลาอยู่กับหน้าจอมาก ไม่ค่อยเคลื่อนไหวร่างกาย ขาดการออกกำลังกาย ทำให้พลังงานที่รับเข้า มากกว่าพลังงานที่ใช้ออกไป</p>\r\n<p style=\"margin-left: 40px; text-align: justify;\">&nbsp;</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>อันตรายของโรคอ้วนในเด็ก &ndash; ไม่ใช่แค่ตัวเลขบนตาชั่ง !</strong></p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; โรคอ้วนไม่ได้วัดจากรูปร่างเพียงอย่างเดียว แต่ขึ้นอยู่กับปริมาณไขมันในร่างกายเมื่อเทียบกับ มวลกล้ามเนื้อ โดยทั่วไปใช้ดัชนีมวลกาย (BMI) เป็นตัววัดเบื้องต้น แต่สำหรับเด็ก ต้องพิจารณาอายุและเพศร่วมด้วย โดยสังเกตการเจริญเติบโต น้ำหนักเทียบกับส่วนสูง หรือ BMI ว่าเกินเกณฑ์ที่เหมาะสมตามวัยหรือไม่</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">และหากเด็กเป็นโรคอ้วน จะมีความเสี่ยง ดังนี้</p>\r\n<ul>\r\n<li data-list-item-id=\"eb18b72f324c42f3ea98d3dbb4393a171\">\r\n<p style=\"margin-left: 0px; text-align: justify;\">โรคเรื้อรัง เสี่ยงต่อเบาหวาน ความดันสูง ไขมันในเลือดสูง แม้ในวัยเด็ก</p>\r\n</li>\r\n<li data-list-item-id=\"e55c29070a661000ce01c9e496681a0fa\">\r\n<p style=\"margin-left: 0px; text-align: justify;\">ปัญหาทางเดินหายใจ เช่น ภาวะหยุดหายใจขณะหลับ ส่งผลต่อการนอนและการเรียนรู้</p>\r\n</li>\r\n<li data-list-item-id=\"ed17c892cb280f75d0a9abc96b4d31aea\">\r\n<p style=\"margin-left: 0px; text-align: justify;\">ปัญหาการเคลื่อนไหว เคลื่อนไหวลำบาก ร่วมกิจกรรมทางกายได้จำกัด</p>\r\n</li>\r\n<li data-list-item-id=\"ead41c315516721048a6ae67319a9fc67\">\r\n<p style=\"margin-left: 0px; text-align: justify;\">ผลกระทบทางจิตใจ ขาดความมั่นใจ ถูกล้อเลียน ถูกบูลลี่ นำไปสู่ภาวะซึมเศร้าหรือเครียด</p>\r\n</li>\r\n</ul>\r\n<p>&nbsp;</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>5 วิธีป้องกันโรคอ้วนในเด็กที่ทำได้จริง</strong></p>\r\n<ol>\r\n<li style=\"text-align: justify;\"><strong>&nbsp;สร้างสรรค์เมนูอาหารให้น่าสนใจ</strong> แทนการบังคับให้เด็กกินอาหารแบบน่าเบื่อ ลองทำให้น่าสนใจ เช่น จัดผักผลไม้เป็นรูปการ์ตูนหรือสัตว์น่ารัก ทำขนมปังโฮลวีทรูปสัตว์ จัดจานอาหารให้มีสีสันสดใส ดึงดูดความสนใจด้วยผักผลไม้หลากสีที่มีกากใยสูง</li>\r\n</ol>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>2. ลดอาหารแปรรูปและน้ำตาล</strong> ลดหรือหลีกเลี่ยงอาหารที่มีน้ำตาลและไขมันสูง เช่น ของทอด ขนมหวาน ขนมขบเคี้ยวที่ไม่มีประโยชน์ น้ำอัดลมและเครื่องดื่มรสหวานจัด</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>3. เพิ่มกิจกรรมทางกายที่สนุก </strong>ส่งเสริมให้เด็กทำกิจกรรมที่ชอบ เช่น วิ่ง ว่ายน้ำ ปั่นจักรยาน&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ออกกำลังกายเป็นประจำ อย่างน้อยสัปดาห์ละ 3-5 วัน วันละ 30 นาที ปรับกิจวัตรให้มีการเคลื่อนไหวมากขึ้น เช่น เดินขึ้นบันไดแทนลิฟต์ ฝึกทำงานบ้านง่าย ๆ เช่น รดน้ำต้นไม้ ช่วยหยิบของหรือเตรียมอาหารง่าย ๆ</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\"><strong>4. ลดเวลาหน้าจออย่างสมดุล </strong>จำกัดเวลาหน้าจอ โดยเฉพาะเด็ก 2-5 ขวบ ไม่ควรเกิน 30 นาทีต่อวัน &nbsp;ไม่ควรบังคับจนเกินไป แต่ชวนทำกิจกรรมอื่นทดแทน เช่น เล่นเกมกระดาน ประดิษฐ์ของเล่นจากวัสดุเหลือใช้</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">&nbsp;<strong>5. ค่อยๆ ปรับ ไม่กดดัน </strong>เปลี่ยนแปลงทีละน้อย ไม่ต้องรีบร้อน โดยให้กำลังใจและคำแนะนำที่ดีเพื่อสร้างแรงจูงใจ</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; การป้องกันโรคอ้วนในเด็กเริ่มต้นได้ที่บ้าน ไม่ต้องรอให้สายเกินแก้ ความรัก ความเข้าใจ และการสนับสนุนจากครอบครัว คือสิ่งสำคัญในการสร้างสมดุลและทำให้การมีสุขภาพดีเป็นเรื่องสนุกสำหรับเด็ก ๆ</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">แหล่งข้อมูล : ศูนย์การแพทย์กาญจนาภิเษก คณะแพทยศาสตร์ศิริราชพยาบาล มหาวิทยาลัยมหิดล,</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">คณะแพทยศาสตร์โรงพยาบาลรามาธิบดี มหาวิทยาลัยมหิดล, โรงพยาบาลพญาไท ศรีราชา</p>\r\n<p style=\"margin-left: 0px; text-align: justify;\">&nbsp;</p>\r\n<p style=\"margin-left: 0px;\"><iframe style=\"display: table; margin-left: auto; margin-right: auto;\" src=\"https://www.youtube.com/embed/klKaKebiD-c?si=_jS8UtOKJXN2QD_U\" width=\"560\" height=\"314\" allowfullscreen=\"allowfullscreen\"></iframe></p>', 'https://healthmedia.hss.moph.go.th/article/1747/\r\nhttps://healthme', '/uploads/articles/image-1752430293723-405054033.jpg', '2025-07-13 17:32:59', '2025-08-04 15:54:07', 14, 7, ''),
(5, 'การป้องกันและดูแลมะเร็งผิวหนังเบเซลเซลล์ (Basal Cell Carcinoma หรือ BCC)', '<p class=\"whitespace-normal break-words\"><strong>Basal Cell Carcinoma (BCC)</strong> เป็นมะเร็งผิวหนังที่พบบ่อยที่สุด คิดเป็นประมาณ 80% ของมะเร็งผิวหนังทั้งหมด เกิดจากเซลล์ในชั้นล่างสุดของหนังกำพร้า (epidermis) และมักเกิดในบริเวณที่ได้รับแสงแดดเป็นประจำ</p>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">คุณลักษณะสำคัญ:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>อัตราการเจริญเติบโต</strong>: ช้า</li>\r\n<li class=\"whitespace-normal break-words\"><strong>การแพร่กระจาย</strong>: ไม่ค่อยแพร่กระจายไปยังอวัยวะอื่น</li>\r\n<li class=\"whitespace-normal break-words\"><strong>อัตราการรักษาหาย</strong>: สูงมาก (95-99%) หากตรวจพบตั้งแต่เริ่มต้น</li>\r\n<li class=\"whitespace-normal break-words\"><strong>กลุ่มเสี่ยง</strong>: ผู้ที่มีผิวขาว อายุมาก ได้รับแสงแดดมาก</li>\r\n</ul>\r\n<h2 class=\"text-xl font-bold text-text-100 mt-1 -mb-0.5\">สาเหตุและปัจจัยเสี่ยง</h2>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">สาเหตุหลัก:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>รังสี UV</strong>: จากแสงแดดและหลอดไฟ UV</li>\r\n<li class=\"whitespace-normal break-words\"><strong>การได้รับรังสีสะสม</strong>: ตั้งแต่เด็กจนโต</li>\r\n</ul>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">ปัจจัยเสี่ยง:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>ผิวขาว</strong>: เสี่ยงสูงกว่าผิวสี</li>\r\n<li class=\"whitespace-normal break-words\"><strong>อายุมาก</strong>: มักพบในผู้ที่อายุ 40 ปีขึ้นไป</li>\r\n<li class=\"whitespace-normal break-words\"><strong>เพศชาย</strong>: เสี่ยงสูงกว่าหญิง</li>\r\n<li class=\"whitespace-normal break-words\"><strong>การทำงานกลางแจ้ง</strong>: นาน ๆ</li>\r\n<li class=\"whitespace-normal break-words\"><strong>ประวัติการเป็น BCC</strong>: มีโอกาสเป็นซ้ำ</li>\r\n<li class=\"whitespace-normal break-words\"><strong>ภูมิคุ้มกันอ่อนแอ</strong>: ผู้ป่วยปลูกถ่ายอวัยวะ</li>\r\n<li class=\"whitespace-normal break-words\"><strong>พันธุกรรม</strong>: ครอบครัวมีประวัติมะเร็งผิวหนัง</li>\r\n</ul>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">การติดตามผล:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>เดือนที่ 1-3</strong>: ตรวจทุก 1 เดือน</li>\r\n<li class=\"whitespace-normal break-words\"><strong>ปีแรก</strong>: ตรวจทุก 3-6 เดือน</li>\r\n<li class=\"whitespace-normal break-words\"><strong>ปีที่ 2-5</strong>: ตรวจทุก 6-12 เดือน</li>\r\n<li class=\"whitespace-normal break-words\"><strong>หลังปีที่ 5</strong>: ตรวจปีละ 1 ครั้ง</li>\r\n</ul>\r\n<h2 class=\"text-xl font-bold text-text-100 mt-1 -mb-0.5\">การป้องกัน</h2>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">การป้องกันแสงแดด:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>ครีมกันแดด SPF 30+</strong>: ทาทุกวัน ทาซ้ำทุก 2 ชั่วโมง</li>\r\n<li class=\"whitespace-normal break-words\"><strong>เสื้อผ้าปกป้อง</strong>: แขนยาว กางเกงขายาว หมวกปีกกว้าง</li>\r\n<li class=\"whitespace-normal break-words\"><strong>แว่นตากันแดด</strong>: กรอง UV 100%</li>\r\n<li class=\"whitespace-normal break-words\"><strong>หลีกเลี่ยงแสงแดดแรง</strong>: เวลา 10:00-16:00 น.</li>\r\n</ul>\r\n<h3 class=\"text-lg font-bold text-text-100 mt-1 -mb-1.5\">การตรวจตนเอง:</h3>\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\"><strong>ความถี่</strong>: เดือนละ 1 ครั้ง</li>\r\n<li class=\"whitespace-normal break-words\"><strong>วิธีการ</strong>: ใช้กระจกส่องตัวดูทั่วร่างกาย</li>\r\n<li class=\"whitespace-normal break-words\"><strong>สิ่งที่ต้องสังเกต</strong>:\r\n<ul class=\"[&amp;:not(:last-child)_ul]:pb-1 [&amp;:not(:last-child)_ol]:pb-1 list-disc space-y-1.5 pl-7\">\r\n<li class=\"whitespace-normal break-words\">ปุ่มใหม่ที่ไม่หาย</li>\r\n<li class=\"whitespace-normal break-words\">การเปลี่ยนแปลงของปุ่มเดิม</li>\r\n<li class=\"whitespace-normal break-words\">แผลที่ไม่หาย</li>\r\n</ul>\r\n</li>\r\n</ul>', '', '/uploads/articles/image-1754312803533-560661094.jpg', '2025-07-14 13:06:43', '2025-10-05 15:02:29', 4, 2, ''),
(6, 'เคล็ดลับป้องกันมะเร็งผิวหนังเพื่อสุขภาพผิวที่ยั่งยืน', '<p>การป้องกันมะเร็งผิวหนังสามารถทำได้โดยการหลีกเลี่ยงปัจจัยเสี่ยง เช่น แสงแดดและรังสี UV</p>\r\n<div class=\"elementor-element elementor-element-8828936 elementor-widget elementor-widget-heading\" data-id=\"8828936\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">ทาครีมกันแดดทุกวัน</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-0d95637 elementor-widget elementor-widget-text-editor\" data-id=\"0d95637\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>เลือกครีมกันแดดที่มีค่า SPF สูงกว่า 50 ขึ้นไป และต้องทาซ้ำทุก 2 ชั่วโมง&nbsp;โดยเฉพาะเวลาที่เหงื่อออกหรือว่ายน้ำ การทาครีมกันแดดควรทำแม้ในวันที่ฟ้าครึ้ม เพราะรังสี UV ยังสามารถทำร้ายผิวได้</p>\r\n<div class=\"elementor-element elementor-element-7dadea4 elementor-widget elementor-widget-heading\" data-id=\"7dadea4\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">หลีกเลี่ยงแสงแดดในช่วงเวลาแรง</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-e36b3c7 elementor-widget elementor-widget-text-editor\" data-id=\"e36b3c7\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>พยายามหลีกเลี่ยงการอยู่กลางแดดระหว่างเวลา 10.00 &ndash; 16.00 น. ซึ่งเป็นช่วงที่รังสี UV เข้มข้นที่สุด</p>\r\n<section class=\"elementor-section elementor-top-section elementor-element elementor-element-aa7a34c elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no\" data-particle_enable=\"false\" data-particle-mobile-disabled=\"false\" data-id=\"aa7a34c\" data-element_type=\"section\">\r\n<div class=\"elementor-container elementor-column-gap-default\">\r\n<div class=\"elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-fcab537\" data-id=\"fcab537\" data-element_type=\"column\">\r\n<div class=\"elementor-widget-wrap elementor-element-populated\">\r\n<div class=\"elementor-element elementor-element-9540ef8 elementor-widget elementor-widget-heading\" data-id=\"9540ef8\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">สวมเสื้อผ้าที่ป้องกัน UV</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-934e39f elementor-widget elementor-widget-text-editor\" data-id=\"934e39f\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>เสื้อแขนยาว หมวกปีกกว้าง และแว่นกันแดดเป็นวิธีง่ายๆ ในการปกป้องผิวจากแสงแดดโดยตรง</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-54bdd4a\" data-id=\"54bdd4a\" data-element_type=\"column\">\r\n<div class=\"elementor-widget-wrap elementor-element-populated\">\r\n<div class=\"elementor-element elementor-element-5e6aeb3 elementor-widget elementor-widget-heading\" data-id=\"5e6aeb3\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">ตรวจสอบผิวของตนเองเป็นประจำ</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-bb0d396 elementor-widget elementor-widget-text-editor\" data-id=\"bb0d396\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>การตรวจผิวหนังด้วยตนเองอย่างสม่ำเสมอจะช่วยให้คุณสามารถสังเกตเห็นความผิดปกติหรือการเปลี่ยนแปลงต่างๆ สังเกตความเปลี่ยนแปลงของไฝหรือจุดต่าง ๆ&nbsp;บนผิวหนัง หากพบสิ่งผิดปกติ&nbsp;ควรรีบปรึกษาแพทย์ทันที</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</section>\r\n<section class=\"elementor-section elementor-top-section elementor-element elementor-element-b5a0aea elementor-section-boxed elementor-section-height-default elementor-section-height-default wpr-particle-no wpr-jarallax-no wpr-parallax-no wpr-sticky-section-no\" data-particle_enable=\"false\" data-particle-mobile-disabled=\"false\" data-id=\"b5a0aea\" data-element_type=\"section\">\r\n<div class=\"elementor-container elementor-column-gap-default\">\r\n<div class=\"elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-9347722\" data-id=\"9347722\" data-element_type=\"column\">\r\n<div class=\"elementor-widget-wrap elementor-element-populated\">\r\n<div class=\"elementor-element elementor-element-ae68368 elementor-widget elementor-widget-heading\" data-id=\"ae68368\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">เลี่ยงการใช้เตียงอาบแดด</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-128ca9e elementor-widget elementor-widget-text-editor\" data-id=\"128ca9e\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>การใช้เตียงอาบแดดหรือการสัมผัสรังสี UV จากแหล่งอื่นนอกเหนือจากแสงแดด อาจเพิ่มความเสี่ยงต่อการเกิดมะเร็งผิวหนัง</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-957e565\" data-id=\"957e565\" data-element_type=\"column\">\r\n<div class=\"elementor-widget-wrap elementor-element-populated\">\r\n<div class=\"elementor-element elementor-element-8b2c241 elementor-widget elementor-widget-heading\" data-id=\"8b2c241\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\">รับประทานอาหารที่เสริมสุขภาพผิว</h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-4d9f66a elementor-widget elementor-widget-text-editor\" data-id=\"4d9f66a\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>อาหารที่อุดมไปด้วยสารต้านอนุมูลอิสระ เช่น ผลไม้และผักสด หรือการรับประทานวิตามินหรืออาหารเสริมบางชนิด สามารถช่วยต้านอนุมูลอิสระและปกป้องผิวจากการถูกทำลายโดยรังสี UV</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</section>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'https://www.bnhhospital.com/th/skin_cancer/bnh/?utm_source=chatgpt.com', '/uploads/articles/image-1758861577392-363351918.png', '2025-07-14 13:10:25', '2025-10-05 14:57:42', 3, 2, '[\"melanoma\",\"bcc\",\"scc\"]'),
(7, 'การรักษามะเร็งผิวหนังด้วย Mohs', '<p><strong><span lang=\"TH\">มะเร็งผิวหนัง</span></strong><br><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><span lang=\"TH\">มะเร็งผิวหนังเป็นมะเร็งที่เจริญช้า ๆ อย่างไร้ทิศทาง มีการแพร่กระจายไปทางกระแสเลือดและต่อมน้ำเหลืองน้อยมาก มักพบบริเวณศีรษะ คือ ประมาณ&nbsp;</span><strong>80-90%&nbsp;<span lang=\"TH\">และที่ใบหน้า&nbsp;</span>65%&nbsp;<span lang=\"TH\">ได้แก่ ตา หู จมูก การรักษามะเร็งผิวหนังจะได้ผลดีถ้าพบในระยะแรกเริ่มมีอาการ</span></strong><br><br><strong><span lang=\"TH\">ปัจจัยที่เป็นสาเหตุการเกิดมะเร็งผิวหนัง</span></strong></p>\r\n<ol>\r\n<li><span lang=\"TH\">แสงแดดและรังสีอัลตราไวโอเลตทั้ง&nbsp;</span>UVA&nbsp;<span lang=\"TH\">และ&nbsp;</span>UVB</li>\r\n<li><span lang=\"TH\">สารเคมี เช่น สารหนูที่ปนอยู่ในน้ำ</span></li>\r\n<li><span lang=\"TH\">แผลเป็นเนื่องจากไฟไหม้ น้ำร้อนลวก อาจทำให้กลายเป็นมะเร็งผิวหนังได้</span></li>\r\n<li><span lang=\"TH\">มีประวัติครอบครัวเป็นมะเร็งผิวหนัง</span></li>\r\n</ol>\r\n<p><strong><span lang=\"TH\">อาการที่บ่งบอกว่าเป็นมะเร็งผิวหนัง</span></strong></p>\r\n<ol>\r\n<li><span lang=\"TH\">ผื่นหรือก้อนที่เป็นอยู่เดิมมีรูปร่างเปลี่ยนแปลงไป</span></li>\r\n<li><span lang=\"TH\">มีผื่นหรือก้อนที่เกิดขึ้นใหม่และไม่หายใน&nbsp;</span>4-6&nbsp;<span lang=\"TH\">สัปดาห์</span></li>\r\n<li><span lang=\"TH\">ไฝ ปานที่โตเร็ว มีสีและรูปร่างเปลี่ยนไปจากเดิม มีอาการคันแตกเป็นแผล และมีเลือดออก</span></li>\r\n<li><span lang=\"TH\">แผลเรื้อรังไม่หายภายใน </span>4&nbsp;<span lang=\"TH\">สัปดาห์</span></li>\r\n</ol>\r\n<p><br><strong><span lang=\"TH\">การรักษามะเร็งผิวหนัง</span></strong><br><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong><span lang=\"TH\">การรักษามะเร็งผิวหนัง วิธีที่ดีที่สุดคือการผ่าตัดเอามะเร็งผิวหนังออกให้หมด ถ้ารอยโรคมีขนาดเล็กกว่า&nbsp;</span>2&nbsp;<span lang=\"TH\">เซนติเมตร อาจใช้วิธีรักษาโดยการขูดออกร่วมกับการจี้ด้วยไฟฟ้าหรือจี้ด้วยไนโตรเจนเหลว แต่ถ้ามะเร็งกระจายไปส่วนอื่นแล้วต้องใช้เคมีบำบัด บางครั้งอาจต้องใช้การฉายแสงร่วมด้วย เช่น มะเร็งแพร่กระจายไปยังกระดูกและสมอง การผ่าตัดมะเร็งผิวหนังออกให้หมดยังมีปัญหาเนื่องจากเราไม่สามารถรู้ขอบเขตการกระจายของมะเร็ง นายแพทย์&nbsp;</span>Frederic E Mohs&nbsp;<span lang=\"TH\">จึงคิดค้นวิธีการผ่าตัดที่เรียกว่า&nbsp;</span>Mohs Micrographic Surgery (MMS)&nbsp;<span lang=\"TH\">ซึ่งจะช่วยผ่าตัดมะเร็งผิวหนังออกได้หมด ถึงแม้ขอบเขตของมะเร็งจะเห็นไม่ชัด และสูญเสียเนื้อเยื่อปกติบริเวณรอบ ๆ รอยโรคได้น้อยที่สุด การรักษาวิธีนี้ได้ผลดี&nbsp;</span>90-95%<br><span lang=\"TH\">การทำผ่าตัดด้วยวิธี</span>&nbsp;MMS<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span lang=\"TH\">เป็นการตัดเฉพาะมะเร็งผิวหนังออกได้หมด โดยมีการเสียผิวหนังปกติที่อยู่ข้างเคียงน้อยที่สุดด้วยวิธีการตัดมะเร็งออกทีละชั้นเป็นชั้นบาง ๆ และจี้ด้วยไฟฟ้าเพื่อห้ามเลือดก่อนปิดแผลด้วยผ้ากอซแล้วน้ำชิ้นเนื้อไปตรวจทางพยาธิด้วยกล้องจุลทรรศน์ เพื่อดูว่าตำแหน่งใดที่ยังมีมะเร็งเหลืออยู่ ผู้ป่วยนั่งรอผลการตรวจชิ้นเนื้อประมาณ</span>&nbsp;2&nbsp;<span lang=\"TH\">ชั่วโมง ถ้ายังพบเซลล์มะเร็ง แพทย์จะกลับไปตัดซ้ำด้วยวิธีเดิมในตำแหน่งที่มีมะเร็งเหลืออยู่จนกว่าจะไม่พบเซลล์มะเร็งผิวหนังเหลืออยู่ที่บริเวณรอยโรคนั้น บางครั้งอาจต้องทำผ่าตัดซ้ำด้วยวิธีเดิม&nbsp;</span>2-3&nbsp;<span lang=\"TH\">ครั้งหรือมากกว่านั้น หลังจากนั้นทำการปิดแผลโดยการเย็บแผลหรือปล่อยให้แผลหายเองตามความเหมาะสมแต่ละราย</span><br><br><strong><span lang=\"TH\">มะเร็วผิวหนังที่ควรรักษาด้วยวิธี</span></strong><strong>&nbsp;MMS</strong></p>\r\n<ol>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังที่กลับเป็นซ้ำ</span></li>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังมีขนาดใหญ่กว่า&nbsp;</span>2&nbsp;<span lang=\"TH\">เซนติเมตร</span></li>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังปฐมภูมิ</span></li>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังที่เจริญอย่างรวดเร็วและรุนแรง</span></li>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังที่มีขอบเขตไม่ชัดเจน</span></li>\r\n<li><span lang=\"TH\">มะเร็งผิวหนังที่เกิดบนแผลเป็น</span></li>\r\n<li><span lang=\"TH\">มะเร็วผิวหนังที่ตัดออกไม่หมด หลังทำการผ่าตัดด้วยวิธีธรรมดา</span></li>\r\n</ol>', 'https://www.si.mahidol.ac.th/th/healthdetail.asp?aid=28&utm_source=chatgpt.com', '/uploads/articles/image-1754313154180-45985588.jpg', '2025-07-14 13:12:34', '2025-10-05 16:48:14', 7, 3, '[\"melanoma\"]'),
(8, 'การป้องกันมะเร็งผิวหนัง', '<div class=\"vc_row wpb_row vc_row-fluid\">\r\n<div class=\"wpb_column vc_column_container vc_col-sm-10 vc_col-sm-offset-1\">\r\n<div class=\"vc_column-inner\">\r\n<div class=\"wpb_wrapper\">\r\n<div class=\"wpb_text_column wpb_content_element large\">\r\n<div class=\"wpb_wrapper\">\r\n<p class=\"gt-block\"><span class=\"TextRun SCXW148427818 BCX0\" lang=\"EN-US\" xml:lang=\"EN-US\" data-contrast=\"auto\"><span class=\"NormalTextRun SCXW148427818 BCX0\">การป้องกันมะเร็งผิวหนังต้องใช้แนวทางที่ครอบคลุมเพื่อปกป้องตนเองจากอันตราย</span>&nbsp;</span><span class=\"NormalTextRun SCXW148427818 BCX0\">อัลตราไวโอเลต&nbsp;<a href=\"http://www.skincancer.org/th/blog/dress-to-protect-5-things-that-affect-how-well-your-clothes-block-uv-rays/\">(ยูวี)</a></span><span class=\"NormalTextRun SCXW148427818 BCX0\">&nbsp;การแผ่รังสี</span><span class=\"EOP SCXW148427818 BCX0\" data-ccp-props=\"{}\">&nbsp;</span></p>\r\n<p class=\"gt-block\">นั่นเป็นเพราะรังสี UV จากดวงอาทิตย์ไม่เพียงแต่เป็นอันตรายเท่านั้น แต่ยังแอบแฝงอีกด้วย ไม่เพียงแต่จะทำให้เกิดริ้วรอยก่อนวัยเท่านั้น&nbsp;<a href=\"http://www.skincancer.org/th/skin-cancer-information/\">โรคมะเร็งผิวหนัง</a>แม้จะหลีกเลี่ยงไม่ได้ก็ตาม แสงแดดสามารถทำร้ายคุณได้ ไม่ว่าจะเป็นเมฆและกระจกที่ทะลุผ่าน หรือหิมะ น้ำ และทราย นอกจากนี้ แสงแดดยังสามารถสะสมได้หลายปี จากการอยู่กลางแจ้งเป็นเวลานาน ไปจนถึงกิจกรรมง่ายๆ เช่น เดินเล่นกับสุนัข เดินจากรถไปที่ร้านค้า และนำจดหมายมาส่ง</p>\r\n<p class=\"gt-block\"><strong>มูลนิธิมะเร็งผิวหนัง</strong>&nbsp;ขอแนะนำให้คุณ:</p>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n<div class=\"vc_row wpb_row vc_row-fluid content-block\">\r\n<div class=\"wpb_column vc_column_container vc_col-sm-8 vc_col-sm-offset-2\">\r\n<div class=\"vc_column-inner\">\r\n<div class=\"wpb_wrapper\">\r\n<div class=\"wpb_text_column wpb_content_element\">\r\n<div class=\"wpb_wrapper\">\r\n<ul>\r\n<li><strong>แสวงหาร่มเงา</strong>โดยเฉพาะช่วงเวลา 10-4 น.</li>\r\n<li><strong>ไม่ได้รับ&nbsp;<a href=\"http://www.skincancer.org/th/risk-factors/sunburn/\">ถูกแดดเผา</a>.</strong></li>\r\n<li><strong>หลีกเลี่ยง&nbsp;<a href=\"http://www.skincancer.org/th/risk-factors/tanning/\">การฟอกหนัง</a></strong>และอย่าใช้เตียงอาบแดดแบบ UV เด็ดขาด</li>\r\n<li><strong>ปิดบัง&nbsp;</strong>สีสดสวย&nbsp;<a href=\"http://www.skincancer.org/th/skin-cancer-prevention/sun-protection/sun-protective-clothing/\">เสื้อผ้า</a>รวมถึงหมวกปีกกว้างและป้องกันรังสียูวี&nbsp;<a href=\"http://www.skincancer.org/th/skin-cancer-prevention/sun-protection/eye-protection/\">แว่นตากันแดด</a>.</li>\r\n<li><strong>ใช้ครีมกันแดดแบบป้องกันแสง UVA/UVB</strong>&nbsp;ด้วยค่า SPF 30 ขึ้นไปทุกวัน สำหรับกิจกรรมกลางแจ้งเป็นเวลานาน ให้ใช้ครีมกันแดดที่กันน้ำได้และป้องกันแสง UVA/UVB&nbsp;<a href=\"http://www.skincancer.org/th/skin-cancer-prevention/sun-protection/sunscreen/\">ครีมกันแดด</a>&nbsp;ที่มีค่า SPF 50 ขึ้นไป</li>\r\n<li><strong>ทาครีมกันแดด 1 ออนซ์ (2 ช้อนโต๊ะ)</strong>&nbsp;ทาให้ทั่วร่างกาย 30 นาทีก่อนออกไปข้างนอก ทาซ้ำทุก XNUMX ชั่วโมงหรือหลังจากว่ายน้ำหรือออกกำลังกายจนเหงื่อออกมากเกินไป ค้นหาครีมกันแดดโดยค้นหาในเว็บไซต์ของเรา&nbsp;<a href=\"http://www.skincancer.org/th/recommended-products/\">สินค้าแนะนำ.</a></li>\r\n<li><strong>ให้เด็กแรกเกิดอยู่ห่างจากแสงแดด</strong>. ใช้&nbsp;<a href=\"http://www.skincancer.org/th/blog/bringing-up-a-sun-safe-baby/\">ครีมกันแดดสำหรับทารก</a>&nbsp;อายุตั้งแต่ 6 เดือนขึ้นไป</li>\r\n<li><strong>ตรวจสอบผิวของคุณ</strong>&nbsp;ตั้งแต่หัวจรดเท้า&nbsp;<a href=\"http://www.skincancer.org/th/early-detection/self-exams/\">ทุกๆเดือน</a>.</li>\r\n<li><strong>ไปพบแพทย์ผิวหนัง</strong> อย่างน้อยปีละ 1 ครั้งเพื่อการตรวจผิวหนังโดยผู้เชี่ยวชาญ</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'https://www.skincancer.org/th/skin-cancer-prevention/?utm_source=chatgpt.com', '/uploads/articles/image-1754313330036-929449754.jpg', '2025-07-14 13:15:30', '2025-10-05 16:55:34', 7, 2, '[\"melanoma\",\"bcc\",\"scc\"]');
INSERT INTO `articles` (`article_id`, `title`, `content`, `source`, `image_url`, `created_at`, `updated_at`, `view_count`, `category_id`, `cancer_types`) VALUES
(9, 'โรคด่างขาว ภาวะผิดปกติของผิวที่สีไม่สม่ำเสมอ', '<h2>โรคด่างขาว คืออะไร</h2>\r\n<p><img class=\"size-full wp-image-52816 entered lazyloaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%94%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A7-%E0%B8%84%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%B0%E0%B9%84%E0%B8%A3.jpg\" sizes=\"(max-width: 1200px) 100vw, 1200px\" srcset=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร.jpg 1200w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-300x175.jpg 300w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-1024x597.jpg 1024w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-150x88.jpg 150w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-768x448.jpg 768w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-600x350.jpg 600w\" alt=\"โรคด่างขาว คืออะไร\" width=\"500\" height=\"292\" data-lazy-srcset=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร.jpg 1200w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-300x175.jpg 300w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-1024x597.jpg 1024w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-150x88.jpg 150w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-768x448.jpg 768w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร-600x350.jpg 600w\" data-lazy-sizes=\"(max-width: 1200px) 100vw, 1200px\" data-lazy-src=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/โรคด่างขาว-คืออะไร.jpg\" data-ll-status=\"loaded\"></p>\r\n<p>โรคด่างขาว (vitiligo) คือโรคผิวหนังชนิดหนึ่ง ที่เกิดความผิดปกติกับเซลล์ที่ทำหน้าที่สร้างเม็ดสีผิว (melanocytes) โดยเซลล์ดังกล่าวอาจถูกทำลายหรือหยุดการสร้างเม็ดสีผิว melanin ทำให้เกิดจุดหรือรอยด่างสีขาวบนผิว ซึ่งสามารถเกิดได้กับทุกส่วนบนร่างกาย ทั้งบนใบหน้า แขน ขา ลำตัว หรือส่วนอื่น ๆ ของร่างกาย ลักษณะเด่นคือสีผิวที่ไม่สม่ำเสมอ บางคนอาจมีแค่จุดเล็ก ๆ บางคนอาจเป็นวงกว้าง อย่างไรก็ตาม การมีรอยด่างขาวไม่ใช่อาการที่บ่งบอกถึงปัญหาสุขภาพที่ร้ายแรง และก็ไม่ใช่โรคติดต่อ</p>\r\n<h2>โรคด่างขาว เกิดจาก</h2>\r\n<p>ปัจจุบันยังไม่มีคำตอบที่ชัดเจนแบบ 100% ว่าโรคด่างขาวเกิดจากอะไร แต่ก็มีปัจจัยบางอย่างที่เชื่อว่ามีส่วนเกี่ยวข้อง ได้แก่</p>\r\n<ul>\r\n<li><strong>ระบบภูมิคุ้มกันทำงานผิดปกติ</strong>&nbsp;ร่างกายอาจเข้าใจผิด โจมตีเซลล์เม็ดสีของตัวเองจนเสียหาย</li>\r\n<li><strong>พันธุกรรม</strong>&nbsp;ถ้ามีคนในครอบครัวเคยเป็น โอกาสที่เราจะเป็นก็มากขึ้น</li>\r\n<li><strong>ต่อมไทรอยด์ทำงานเกิน</strong></li>\r\n<li><strong>ปัจจัยสิ่งแวดล้อม</strong>&nbsp;การกระตุ้น เช่น แดดเผา สัมผัสสารเคมีอันตราย</li>\r\n</ul>\r\n<h3>อาการของโรคด่างขาว</h3>\r\n<p>อาการหลักของโรคด่างขาวคือการปรากฏของรอยด่างสีขาวบนผิวหนัง ซึ่งอาจมีลักษณะดังนี้</p>\r\n<ul>\r\n<li aria-level=\"1\">มีผิวซีดและค่อย ๆ เปลี่ยนเป็นด่างขาว</li>\r\n<li aria-level=\"1\">มักไม่มีผื่นคันมาก่อนและเริ่มเกิดบริเวณที่สัมผัสแสงแดด</li>\r\n<li aria-level=\"1\">ขนาดและรูปทรงของรอยด่างมีความหลากหลาย ไม่ตายตัว</li>\r\n<li aria-level=\"1\">อาจมีการเปลี่ยนแปลงบริเวณที่เกิดด่างขาวไปตามระยะเวลา ทั้งขยายวงกว้างหรือปรากฏเพิ่มในบริเวณอื่น</li>\r\n</ul>\r\n<h2>วิธีการรักษาโรคด่างขาว</h2>\r\n<p>แม้โรคด่างขาวยังไม่มีวิธีรักษาที่ทำให้เม็ดสีกลับมา 100% แต่การรักษามุ่งเน้นไปที่การฟื้นฟูสีผิวและป้องกันการแพร่กระจายของด่างขาว โดยวิธีการรักษาที่เป็นที่นิยม ได้แก่</p>\r\n<ul>\r\n<li aria-level=\"1\"><strong>ใช้ยาสเตียรอยด์</strong>&nbsp;หรือสารกระตุ้นเม็ดสีเมลานิน ที่ช่วยฟื้นฟูสีผิว</li>\r\n<li aria-level=\"1\"><strong>รักษาด้วยเลเซอร์</strong>&nbsp;ใช้กับพื้นที่ขนาดเล็ก</li>\r\n<li aria-level=\"1\"><strong>การฉายแสง&nbsp;</strong>ช่วยกระตุ้นการสร้างเม็ดสีผิว</li>\r\n<li aria-level=\"1\"><strong>การฟอกสีผิว</strong>&nbsp;ใช้กับผู้ที่ด่างขาวแพร่กระจาย</li>\r\n<li aria-level=\"1\"><strong>ฉายแสงด้วยรังสียูวีบี</strong>&nbsp;ได้ผลดีกับใบหน้า ลำตัว แขน ขา</li>\r\n<li aria-level=\"1\"><strong>การปลูกถ่ายผิวหนัง</strong>&nbsp;นำผิวหนังปะให้สีผิวสม่ำเสมอ</li>\r\n</ul>\r\n<h2>สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว ?</h2>\r\n<p><img class=\"size-full wp-image-52818 entered lazyloaded\" style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/%E0%B8%AA%E0%B8%B1%E0%B8%87%E0%B9%80%E0%B8%81%E0%B8%95%E0%B9%84%E0%B8%94%E0%B9%89%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84%E0%B8%A3%E0%B8%A7%E0%B9%88%E0%B8%B2%E0%B9%80%E0%B8%A3%E0%B8%B2%E0%B8%AD%E0%B8%B2%E0%B8%88%E0%B9%80%E0%B8%AA%E0%B8%B5%E0%B9%88%E0%B8%A2%E0%B8%87%E0%B9%82%E0%B8%A3%E0%B8%84%E0%B8%94%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B8%82%E0%B8%B2%E0%B8%A7-.jpg\" sizes=\"(max-width: 1200px) 100vw, 1200px\" srcset=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว-.jpg 1200w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--300x175.jpg 300w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--1024x597.jpg 1024w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--150x88.jpg 150w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--768x448.jpg 768w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--600x350.jpg 600w\" alt=\"สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว\" width=\"500\" height=\"292\" data-lazy-srcset=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว-.jpg 1200w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--300x175.jpg 300w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--1024x597.jpg 1024w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--150x88.jpg 150w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--768x448.jpg 768w, https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว--600x350.jpg 600w\" data-lazy-sizes=\"(max-width: 1200px) 100vw, 1200px\" data-lazy-src=\"https://www.rama.mahidol.ac.th/ramachannel/wp-content/uploads/2025/04/สังเกตได้อย่างไรว่าเราอาจเสี่ยงโรคด่างขาว-.jpg\" data-ll-status=\"loaded\"></p>\r\n<p>หากคุณเริ่มสังเกตเห็นรอยด่างสีขาวที่ไม่หายไปตามกาลเวลา เช่น จุดสีขาวเล็ก ๆ ที่ขยายกว้างขึ้น หรือปรากฏในหลายจุดทั่วร่างกาย ควรพิจารณาพบแพทย์ผู้เชี่ยวชาญด้านผิวหนังเพื่อทำการวินิจฉัยเพิ่มเติม การพบแพทย์แต่เนิ่น ๆ จะช่วยเพิ่มโอกาสในการรักษาและรับมือได้ทันท่วงที</p>\r\n<h2>โรคด่างขาวสามารถติดต่อกันได้หรือไม่ ?</h2>\r\n<p>ด่างขาวไม่ใช่โรคติดต่อ ไม่สามารถแพร่เชื้อจากคนสู่คนผ่านการสัมผัส น้ำลาย หรืออากาศ ดังนั้นผู้ที่ป่วยเป็นโรคด่างขาวไม่ต้องกังวลว่าตนเองจะส่งต่อโรคให้แก่ผู้อื่น</p>\r\n<p>โรคด่างขาวเป็นภาวะทางผิวหนังที่แม้จะยังไม่มีวิธีรักษาให้หายขาด แต่การได้รับความรู้ ความเข้าใจ และการดูแลตนเองอย่างถูกต้อง สามารถช่วยให้ผู้ป่วยสามารถใช้ชีวิตได้อย่างมั่นใจมากขึ้น ทั้งนี้ การปรึกษาแพทย์ผู้เชี่ยวชาญถือเป็นกุญแจสำคัญ เพราะจะช่วยให้คุณเข้าใจถึงสาเหตุ อาการ และแนวทางการรักษาที่เหมาะสม การเผชิญหน้ากับโรคด่างขาวอย่างมีข้อมูลและความรู้เพียงพอ จะทำให้ผู้ป่วยรู้สึกเป็นมิตรกับร่างกายของตนเอง และรับมือกับการเปลี่ยนแปลงของผิวหนังอย่างเข้มแข็งและมั่นใจยิ่งขึ้น</p>', 'https://www.rama.mahidol.ac.th/ramachannel/article/%e0%b9%82%e0%b8%a3%e0%b8%84%e0%b8%94%e0%b9%88%e0%b8%b2%e0%b8%87%e0%b8%82%e0%b8%b2%e0%b8%a7-%e0%b8%a0%e0%b8%b2%e0%b8%a7%e0%b8%b0%e0%b8%9c%e0%b8%b4%e0%', '/uploads/articles/image-1758004495017-321198099.jpg', '2025-09-16 06:34:55', '2025-10-05 16:55:18', 8, 6, ''),
(10, 'รับมือ \"ผดผื่นคัน\" วายร้ายในหน้าร้อนนี้', '<p>เข้าสู่หน้าร้อนอย่างเป็นทางการ ปัญหาที่มักจะตามมาของคนส่วนใหญ่ในหน้าร้อนนี้คงหนีไม่พ้น &ldquo;ผดผื่นคัน&rdquo; ที่เกิดขึ้นเมื่อใดก็สร้างความรำคาญได้ไม่น้อยเลยทีเดียว ทำให้เราต้องแกะ ต้องเกา จนลุกลามกันไปใหญ่ วันนี้เรานำวิธีรับมือเจ้า ผดผื่นคัน นี้ มาฝากกัน</p>\r\n<p>ดร.นพ.เวสารัช เวสสโกวิท แห่งสถาบันโรคผิวหนัง อธิบายว่า อาการผด ผื่น คัน ส่วนใหญ่เกิดจากสภาวะของร่างกายที่เข้ากับสิ่งแวดล้อมไม่ได้ เช่น อยู่ที่อากาศเย็นแล้วไปอากาศร้อน ร่างกายของเราจึงไม่สามารถปรับตัวได้ทัน ส่งผลให้เกิดเหงื่อปริมาณมากที่ไปอุดตันรูขุมขน ทำให้เกิด &ldquo;ผด ผื่น คัน&rdquo; ตามข้อพับ ที่อับชื้นต่างๆ ตามร่างกาย มีลักษณะ คือ ตุ่มน้ำใสๆ แตกง่าย อาจจะมีอาการคันเล็กน้อย</p>\r\n<p>ถ้าหากเป็นมากจะมีลักษณะเป็น &ldquo;ตุ่มแดง&rdquo; และ &ldquo;ตุ่มหนอง&rdquo; ขึ้นมา แนะนำไปพบแพทย์เพื่อทำการรักษาอาการ</p>\r\n<h2>วิธีป้องกัน ผดผื่นคัน ที่จะเกิดในหน้าร้อน คือ</h2>\r\n<ol>\r\n<li>ป้องกันตั้งแต่การเลือกเสื้อผ้าที่สวมใส่ ควรจะเป็นเนื้อผ้าที่บางเบา เพื่อถ่ายเทความร้อน และเหงื่อได้สะดวก</li>\r\n<li>ทำความสะอาดร่างกาย เนื่องจากเหงื่อออกเยอะ อาจจะมีฝุ่นละอองเข้ามาติด ก่อให้เกิดเป็นปัญหาของผด ผื่น คัน ขึ้นมาได้ และหาก &ldquo;ผิวหนัง&rdquo; รู้สึกร้อนเกินไป ควรรีบหลบเข้าในที่ร่มทันที เพราะอาการ &ldquo;ผด ผื่น คัน&rdquo; เป็นอาการที่เกิดขึ้นได้ง่าย แต่ก็สามารถรักษาได้ง่ายด้วยเช่นกัน เพียงแค่ดูแลรักษาสุขภาพร่างกาย ให้สะอาดปราศจากสิ่งสกปรก</li>\r\n</ol>\r\n<p>ใครที่ไม่อยากเป็น เพียงนำเอาเคล็ดลับเล็กๆ น้อยๆ นี้ ไปดูแลสุขภาพกัน อาจทำให้ปัญหา &ldquo;ผด ผื่น คัน&rdquo; ไม่มากวนใจคุณอีกก็ได้</p>', 'https://www.rama.mahidol.ac.th/ramachannel/article/%e0%b8%a3%e0%b8%b1%e0%b8%9a%e0%b8%a1%e0%b8%b7%e0%b8%ad-%e0%b8%9c%e0%b8%94%e0%b8%9c%e0%b8%b7%e0%b9%88%e0%b8%99%e0%b8%84%e0%b8%b1%e0%b8%99-%e0%b8%a7%e0', '/uploads/articles/image-1758004697561-123395414.jpg', '2025-09-16 06:38:17', '2025-10-05 14:58:18', 7, 6, ''),
(11, 'การผ่าตัดมะเร็งผิวหนังด้วยวิธี Mohs Micrographic Surgery (MMS)', '<div class=\"elementor-element elementor-element-77be3c1 elementor-widget elementor-widget-heading\" data-id=\"77be3c1\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>การผ่าตัดมะเร็งผิวหนังด้วยวิธี Mohs Micrographic Surgery (MMS)</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-43e4ad57 elementor-widget elementor-widget-text-editor\" data-id=\"43e4ad57\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>การผ่าตัด Mohs Micrographic surgery (MMS) เป็นเทคนิคการผ่าตัดเฉพาะที่ใช้ในการรักษามะเร็งผิวหนังที่ผสมผสานการผ่าตัดและการตรวจทางพยาธิวิทยาเข้าด้วยกัน เพื่อให้ได้ประสิทธิภาพในการรักษามะเร็งผิวหนังสูงสุด เทคนิคนี้พัฒนาโดยนายแพทย์ Frederic E. Mohs ปัจจุบัน MMS จัดว่าเป็นการรักษาที่มีประสิทธิภาพสูงในการรักษามะเร็งผิวหนัง และลดโอกาสกลับเป็นซ้ำของมะเร็งผิวหนังมากที่สุด โดยเฉพาะมะเร็งผิวหนังชนิดไม่ใช่ melanoma เช่น มะเร็งผิวหนังชนิด basal cell carcinoma และ squamous cell carcinoma เนื่องจากเป็นวิธีที่สามารถวิเคราะห์ขอบเขตการกระจายของมะเร็งได้ทั่วถึง 100% และยังลดการสูญเสียเนื้อเยื่อปกติบริเวณรอบๆอีกด้วย การผ่าตัดวิธีนี้ สามารถทำเสร็จในวันเดียว ไม่จำเป็นต้องนอนโรงพยาบาล</p>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-b59749e elementor-widget elementor-widget-heading\" data-id=\"b59749e\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>ขั้นตอนการทำ MMS</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-ae21e0b elementor-widget elementor-widget-text-editor\" data-id=\"ae21e0b\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ol>\r\n<li>ฉีดยาชาเฉพาะที่ก่อนการผ่าตัด</li>\r\n<li>ตัดผิวหนังชั้นแรก บริเวณด้วยการตัดมะเร็งออกเป็นชั้นบางๆ จากนั้นจะปิดแผลด้วยผ้ากอซแล้วนำชิ้นเนื้อไปตรวจทางพยาธิด้วยกล้องจุลทรรศน์ เพื่อดูว่า</li>\r\n<li>ตำแหน่งใดที่ยังมีมะเร็งเหลืออยู่ ผู้ป่วยนั่งรอผลการตรวจชิ้นเนื้อประมาณ 2 ชั่วโมง</li>\r\n<li>หากยังพบเซลล์มะเร็งหลงเหลืออยู่ แพทย์ตัดชิ้นเนื้อซ้ำด้วยวิธีเดิม เฉพาะในตำแหน่งที่มีมะเร็งเหลืออยู่จนกว่าจะไม่พบเซลล์มะเร็ง<br>เมื่อไม่พบว่ามีเซลล์มะเร็งหลงเหลืออยู่แล้ว แพทย์จะเย็บแผลปิด หรือปล่อยให้แผลหายตามธรรมชาติขึ้นกับขนาดและตำแหน่งของแผล ตามความเหมาะสม</li>\r\n</ol>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-c1ee8a9 elementor-widget elementor-widget-heading\" data-id=\"c1ee8a9\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\">ความแตกต่างของการผ่าตัดมะเร็งผิวหนังแบบกว้าง (wide excision) และ MMS</h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-be714da elementor-widget elementor-widget-text-editor\" data-id=\"be714da\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<p>การผ่าตัดมะเร็งผิวหนังแบบกว้าง (wide excision) เป็นการผ่าตัดแบบดังเดิมเพื่อรักษามะเร็งผิวหนัง ซึ่งมีข้อแตกต่างจาก MMS ดังนี้</p>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-3af761c elementor-widget elementor-widget-heading\" data-id=\"3af761c\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h3 class=\"elementor-heading-title elementor-size-default\"><strong>1. วิธีการผ่าตัด</strong></h3>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-9a88e4c elementor-widget elementor-widget-text-editor\" data-id=\"9a88e4c\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ul>\r\n<li>Wide Excision: การผ่าตัดแบบกว้างจะตัดเนื้อมะเร็งและเนื้อรอบๆมะเร็งออกในครั้งเดียว โดยกำหนดขอบเขตของการตัดอิงจากชนิดของมะเร็ง และส่งชื้นเนื้อทั้งชิ้นเพื่อตรวจวิเคราะห์ทางพยาธิวิทยา</li>\r\n<li>MMS: จะตัดชั้นผิวหนังที่มีมะเร็งออกทีละชั้น โดยแต่ละชั้นจะนำไปตรวจทางพยาธิวิทยา หากพบเซลล์มะเร็ง จะทำการตัดชั้นถัดไปต่อไปจนกว่าจะไม่มีเซลล์มะเร็งเหลืออยู่</li>\r\n</ul>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-5afa736 elementor-widget elementor-widget-heading\" data-id=\"5afa736\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>2. การวิเคราะห์ทางพยาธิวิทยา</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-c74502f elementor-widget elementor-widget-text-editor\" data-id=\"c74502f\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ul>\r\n<li>Wide excision: จะตรวจวิเคราะห์ชิ้นเนื้อในแนวตั้งเหมือนการหั่นขนมปัง (bread loaf technique) ทำให้มีโอกาสพลาดไม่เห็นเซลล์มะเร็งที่เหลืออยู่ในบริเวณที่ไม่ได้ตัดชิ้นเนื้อมาวิเคราะห์ ดังรูป A โดยเฉพาะในมะเร็งผิวหนังที่มีขอบเขตไม่ชัด</li>\r\n<li>MMS: จะตรวจวิเคราะห์ชิ้นเนื้อในแนวนอน ทำให้สามารถวิเคราะห์ขอบเขตการกระจายของมะเร็งได้ทั่วถึง 100%</li>\r\n</ul>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-c7b1161 elementor-widget elementor-widget-heading\" data-id=\"c7b1161\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>3. อัตราการกลับเป็นซ้ำ</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-78bdbf9 elementor-widget elementor-widget-text-editor\" data-id=\"78bdbf9\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ul>\r\n<li>Wide Excision: อาจมีความเสี่ยงสูงกว่าที่มะเร็งจะกลับมาเป็นซ้ำ หากมีเซลล์มะเร็งหลงเหลืออยู่ในขอบเขตที่ตัดออก</li>\r\n<li>MMS: มีอัตราการกลับเป็นซ้ำน้อยกว่า ทั้งในมะเร็งผิวหนังชนิด basal cell carcinoma และ squamous cell carcinoma</li>\r\n</ul>\r\n<div class=\"elementor-element elementor-element-69a2970 elementor-widget elementor-widget-heading\" data-id=\"69a2970\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>4. ขนาดแผลผ่าตัด</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-91e0a86 elementor-widget elementor-widget-text-editor\" data-id=\"91e0a86\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ul>\r\n<li>Wide Excision: การผ่าตัดโดยวิธีนี้จะเอาเนื้อรอบๆมะเร็งออกไปมากกว่า ซึ่งอาจทำให้แผลผ่าตัดขนาดใหญ่กว่า</li>\r\n<li>MMS: แผลผ่าตัดเล็กกว่า เนื่องจากมีการสงวนชิ้นเนื้อปกติที่อยู่รอบๆ</li>\r\n</ul>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-f9b47fc elementor-widget elementor-widget-heading\" data-id=\"f9b47fc\" data-element_type=\"widget\" data-widget_type=\"heading.default\">\r\n<div class=\"elementor-widget-container\">\r\n<h2 class=\"elementor-heading-title elementor-size-default\"><strong>5. เวลาที่ใช้ในการรักษาและราคา</strong></h2>\r\n</div>\r\n</div>\r\n<div class=\"elementor-element elementor-element-158d820 elementor-widget elementor-widget-text-editor\" data-id=\"158d820\" data-element_type=\"widget\" data-widget_type=\"text-editor.default\">\r\n<div class=\"elementor-widget-container\">\r\n<ul>\r\n<li>Wide Excision: มักจะใช้เวลาน้อยกว่าและราคาถูกกว่า เนื่องจากทำการผ่าตัดในครั้งเดียว</li>\r\n<li>MMS: อาจใช้เวลานานกว่า เนื่องจากต้องมีการผสมผสานการตรวจวิเคราะห์ทางในระหว่างการผ่าตัด รวมถึงค่าใช้จ่ายสูงกว่า</li>\r\n</ul>\r\n</div>\r\n</div>\r\n</div>\r\n</div>', 'https://bangkokpattayahospital.com/th/health-articles-th/mohs-micrographic-surgery/\r\n', '/uploads/articles/image-1758861032109-69712083.webp', '2025-09-16 10:45:11', '2025-10-05 17:32:07', 13, 3, '[\"bcc\",\"scc\"]'),
(12, 'ลักษณะของ ไฝ อย่างไรที่ควรต้องเฝ้าระวัง', '<p><strong>&nbsp;</strong><strong>ไฝ คือ</strong><strong>&nbsp;</strong><br>&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;ภาวะหนึ่งของร่างกายที่บริเวณนั้นๆมีการรวมกลุ่มกันของเซลล์สร้างเม็ดสีหรือเซลล์ไฝ&nbsp;(Nevus cell)&nbsp;ทำให้เห็นไฝเป็นสีดำหรือสีน้ำตาล อาจเป็นจุดเรียบหรือตุ่มนูน</p>\r\n<p>&nbsp;</p>\r\n<p><strong>ไฝแบ่งตามชนิดที่เป็นได้</strong><strong>&nbsp;2&nbsp;ประเภท</strong></p>\r\n<ol>\r\n<li style=\"list-style-type: none;\">\r\n<ol>\r\n<li>ไฝตั้งแต่แรกเกิด มักมีขนาดโตตั้งแต่ 5 มิลลิเมตรขึ้นไป เป็นก้อนนูน อาจมีขนขึ้นบริเวณไฝด้วย</li>\r\n<li>ไฝที่เกิดขึ้นภายหลัง มักเป็นบริเวณที่โดนแสงแดด มักมีขนาดเล็ก เรียบ ถ้าเป็นไฝที่มีขนาดเล็กกว่า 5 มิลลิเมตร ผิวเรียบและไม่มีการเปลี่ยนแปลง จะเรียกว่า ขี้แมลงวัน ถ้าไฝมีลักษณะนูน โตเร็ว แตกเป็นแผล ควรมาพบแพทย์</li>\r\n</ol>\r\n</li>\r\n</ol>\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ไฝบางประเภทอาจกลายเป็นมะเร็งของผิวหนังได้&nbsp;&nbsp;สาเหตุที่แน่นอนยังไม่ทราบแน่ชัด ส่วนใหญ่มักเกิดจากการที่ผิวหนังถูกกับสิ่งกระตุ้นเป็นเวลานานๆ เช่นถูกแสงแดดจัดๆ ติดต่อกันเป็นเวลานานหลายปี ถูกถูไถจนเป็นแผลเป็นเวลานาน หรือ ถูกสารเคมี เป็นต้น</p>\r\n<p>&nbsp;</p>\r\n<p><strong>ลักษณะไฝที่ต้องเฝ้าระวังคือ</strong></p>\r\n<ol>\r\n<li style=\"list-style-type: none;\">\r\n<ol>\r\n<li>Asymmetry&nbsp; &nbsp; &nbsp;เมื่อแบ่งครึ่งจะไม่สมมาตร ครึ่งหนึ่งของไฝจะแตกต่างจากอีกด้านหนึ่ง</li>\r\n<li>Border&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ขอบเขตของไฝไม่สม่ำเสมอ ขอบเขตไม่ชัดเจน</li>\r\n<li>Color&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; มีหลากหลายสีหรือสีไม่สม่ำเสมอ</li>\r\n<li>Diameter&nbsp; &nbsp; &nbsp; &nbsp; ขนาดใหญ่กว่า 6 มิลลิเมตร</li>\r\n<li>Evolving&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ไฝที่มีการเปลี่ยนแปลงของสี รูปร่าง ขนาด โตเร็วผิดปกติ หรือ มีเลือดออก</li>\r\n</ol>\r\n</li>\r\n</ol>\r\n<p>&nbsp;</p>\r\n<p><strong>วิธีการรักษา</strong></p>\r\n<ol>\r\n<li style=\"list-style-type: none;\">\r\n<ol>\r\n<li>กรณีไฝอันตราย ควรพบแพทย์เพื่อเก็บตัวอย่างผิวหนัง ตัดชิ้นเนื้อไปตรวจทางพยาธิวิทยา</li>\r\n<li>กรณีไฝธรรมดาหรือขี้แมลงวัน สามารถกำจัดออกได้ด้วยคาร์บอนไดออกไซด์เลเซอร์ (CO<sub>2</sub>&nbsp;Laser)&nbsp;เป็นการใช้ความร้อนจี้เซลล์ไฝออกไป หลังการรักษาแผลจะเป็นสเก็ดอยู่ประมาณ&nbsp;5-7&nbsp;วัน</li>\r\n</ol>\r\n</li>\r\n</ol>\r\n<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;การดูแลผิวหลังทำเลเซอร์หลีกเลี่ยงกิจกรรมกลางแจ้งที่ไม่จำเป็นอย่างน้อย 2 สัปดาห์ เพื่อลดโอกาสการเกิดรอยคล้ำ</p>', 'https://www.vibhavadi.com/th/blogs/characteristics-of-moles-what-to-watch-out-for', '/uploads/articles/image-1758821425105-879192937.jpg', '2025-09-25 17:30:25', '2025-10-05 16:52:41', 12, 6, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `category_name`) VALUES
(1, 'ความรู้เกี่ยวกับมะเร็งผิวหนัง'),
(2, 'การป้องกัน'),
(3, 'การรักษา'),
(6, 'ความรู้ทั่วไปเกี่ยวกับผิวหนัง'),
(7, 'หมวดหมู่อื่น ๆ');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_text` varchar(500) NOT NULL,
  `status` enum('ปกติ','ถูกรายงาน','ซ่อน') DEFAULT 'ปกติ',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `comment_text`, `status`, `created_at`) VALUES
(1, 7, 1, ' ยินดีที่ได้รู้จัก', 'ปกติ', '2025-07-16 14:19:38'),
(2, 7, 1, '...', 'ถูกรายงาน', '2025-07-16 14:19:47'),
(4, 7, 1, '...', 'ปกติ', '2025-07-18 02:33:06'),
(7, 8, 1, 'asdf', 'ปกติ', '2025-08-01 05:14:29'),
(8, 11, 4, 'ผู้ชายใช้ได้ไหมครับ', 'ปกติ', '2025-08-04 13:22:00'),
(9, 12, 3, 'ลองดื่มน้ำเยอะ ๆ นะครับ', 'ปกติ', '2025-08-04 14:56:06'),
(10, 14, 1, 'สวัสดี', 'ปกติ', '2025-09-14 07:26:01'),
(11, 14, 1, 'ทดสอบบบ', 'ปกติ', '2025-09-14 07:26:21'),
(12, 14, 6, 'สวัสดีจ้า', 'ปกติ', '2025-09-23 11:43:56');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `status` enum('ปกติ','ถูกรายงาน','ซ่อน') DEFAULT 'ปกติ',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `update_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`post_id`, `user_id`, `title`, `content`, `status`, `created_at`, `update_at`) VALUES
(4, 1, 'ผื่นแดงคันขึ้นที่คอ มีใครพอทราบไหมคะว่าคืออะไร?', '<p>สวัสดีค่ะทุกคน! ตอนนี้กังวลมากเลยค่ะ 😭 จู่ ๆ ก็มีผื่นแดง ๆ ขึ้นที่บริเวณคอด้านข้างค่ะ มีอาการคันยิบ ๆ ด้วยค่ะ บางทีก็รู้สึกแสบ ๆ นิดหน่อย ลองทายาหม่องแล้วก็ไม่ดีขึ้นเลยค่ะ เป็นมาประมาณ 2-3 วันแล้วค่ะ</p>\r\n<p>ไม่แน่ใจว่าเป็นผื่นแพ้ หรือโดนอะไรกัดมา หรือเปล่าค่ะ เลยอยากจะขอคำแนะนำจากเพื่อน ๆ ในบอร์ดหน่อยค่ะว่า <strong>ผื่นแบบนี้คืออะไรคะ?</strong> แล้วมีวิธีบรรเทาอาการเบื้องต้น หรือสกินแคร์/ยาตัวไหนที่พอจะช่วยได้บ้างไหมคะ? ถ้ายังไม่ดีขึ้น คงต้องไปหาหมอผิวหนังค่ะ</p>\r\n<p><strong>รูปภาพประกอบ:</strong></p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/uploads/posts/image-1754314734770-697281685.jpg\" alt=\"\" width=\"333\" height=\"250\"></p>', 'ปกติ', '2025-07-15 16:42:12', '2025-08-04 13:39:18'),
(5, 3, 'ตากแดดจัด หน้าคล้ำ แสบผิว ควรดูแลยังไงดีครับ?', '<p>สวัสดีครับทุกคน! เมื่อวันหยุดไปเที่ยวทะเลมาครับ ตากแดดจัดมาก ๆ ลืมทากันแดดซ้ำด้วย 😅 ตอนนี้หน้าคล้ำขึ้นเยอะเลยครับ แถมยังรู้สึกแสบ ๆ ผิวเวลาโดนน้ำ หรือเวลาทาครีมด้วยครับ</p>\r\n<p>อยากมาขอคำแนะนำหน่อยครับว่า <strong>หลังตากแดดจัด ๆ แบบนี้ ผมควรดูแลผิวหน้ายังไงดีครับ?</strong> มีวิธีบรรเทาอาการแสบผิว หรือผลิตภัณฑ์ตัวไหนที่ช่วยฟื้นฟูผิวให้กลับมาปกติ และกระจ่างใสเหมือนเดิมบ้างครับ?</p>', 'ปกติ', '2025-07-15 16:45:34', '2025-08-04 16:07:36'),
(7, 3, '', 'ทักทายจร้าา', 'ปกติ', '2025-07-15 16:51:23', '2025-07-15 16:51:23'),
(8, 1, '', 'test', 'ปกติ', '2025-07-18 02:38:57', '2025-07-31 19:43:44'),
(11, 1, 'แชร์ประสบการณ์คนผิวแพ้ง่าย: ใช้สกินแคร์ตัวไหนแล้วรอดบ้าง?', '<p>สวัสดีค่ะชาวผิวแพ้ง่ายทุกคน! 🙌 เข้าใจเลยว่าการหาสกินแคร์ที่เหมาะกับผิวแพ้ง่ายมันยากแค่ไหน ใช้อะไรก็แพ้ไปหมด บางทีผื่นขึ้น แดง คัน ต้องมานั่งเสียเวลาพักหน้ากันอีก</p>\r\n<p>วันนี้เลยอยากมาชวนเพื่อน ๆ ที่มีผิวแพ้ง่ายเหมือนกัน มาแชร์ประสบการณ์กันหน่อยค่ะว่าใช้สกินแคร์ตัวไหนแล้ว <strong>\"รอด\"</strong> บ้าง?</p>\r\n<p><strong>สภาพผิวของ จขกท.:</strong></p>\r\n<ul>\r\n<li>\r\n<p>ผิวผสม ค่อนข้างแห้งช่วงแก้ม</p>\r\n</li>\r\n<li>\r\n<p>แพ้แอลกอฮอล์ น้ำหอม พาราเบน และสารเคมีบางชนิด</p>\r\n</li>\r\n<li>\r\n<p>ชอบมีผื่นแดงขึ้นง่ายเมื่อเจอฝุ่น หรืออากาศเปลี่ยน</p>\r\n</li>\r\n</ul>\r\n<p><strong>สกินแคร์ที่ จขกท. ใช้แล้วดี:</strong></p>\r\n<ul>\r\n<li>\r\n<p><strong>คลีนเซอร์:</strong> Cerave Hydrating Cleanser &ndash; อ่อนโยนมาก ไม่แห้งตึงหลังล้าง</p>\r\n</li>\r\n<li>\r\n<p><strong>มอยส์เจอร์ไรเซอร์:</strong> Physiogel Daily Moisture Therapy Cream &ndash; ชุ่มชื้นดี ไม่เหนอะหนะ</p>\r\n</li>\r\n<li>\r\n<p><strong>กันแดด:</strong> La Roche-Posay Anthelios Invisible Fluid SPF50+ &ndash; ไม่เป็นคราบ ไม่อุดตัน</p>\r\n</li>\r\n</ul>', 'ปกติ', '2025-08-03 19:26:39', '2025-08-03 19:26:39'),
(12, 4, 'หน้าแห้งแตกเป็นขุย ผู้ชายใช้สกินแคร์ตัวไหนดีครับ?', '<p>สวัสดีครับทุกคน! ผมเป็นผู้ชายครับ ปกติไม่ค่อยได้บำรุงผิวหน้าเท่าไหร่ แต่ช่วงนี้หน้าแห้งมาก ๆ เลยครับ โดยเฉพาะตรงแก้มกับคาง เป็นขุย ๆ เลยครับ บางทีก็คัน ๆ ด้วยครับ&nbsp;</p>\r\n<p>อยากมาขอคำแนะนำหน่อยครับว่ามีสกินแคร์ตัวไหนที่เหมาะกับผู้ชายที่ผิวแห้งบ้างครับ? อยากได้แบบที่ใช้ง่าย ๆ ไม่หลายขั้นตอนครับ เพราะปกติขี้เกียจทาอะไรเยอะแยะครับ</p>\r\n<p><strong>สิ่งที่กังวล:</strong></p>\r\n<ul>\r\n<li>\r\n<p>ไม่อยากให้เหนียวเหนอะหนะ</p>\r\n</li>\r\n<li>\r\n<p>กลัวใช้แล้วหน้ามันกว่าเดิม (แม้จะแห้งก็ตาม)</p>\r\n</li>\r\n<li>\r\n<p>ไม่รู้จะเริ่มจากอะไรดี</p>\r\n</li>\r\n</ul>', 'ปกติ', '2025-08-04 11:20:45', '2025-08-04 11:20:45'),
(13, 3, 'มีจุดดำเล็ก ๆ คล้ายไฝขึ้นที่หลังมือ ไม่แน่ใจคืออะไร', '<p>สวัสดีครับทุกคน! ผมมีเรื่องอยากสอบถามครับ คือช่วงหลังมานี้สังเกตเห็นว่ามี <strong>จุดดำ ๆ ขนาดเล็ก</strong> ขึ้นที่หลังมือครับ มันไม่ใหญ่มากครับ คล้าย ๆ ไฝ หรือกระ แต่รู้สึกว่ามันเข้มขึ้นเรื่อย ๆ ครับ ไม่ได้คันหรือเจ็บอะไรนะครับ แต่ก็อดกังวลไม่ได้ว่ามันคืออะไรกันแน่</p>\r\n<p>เลยอยากขอคำแนะนำจากผู้เชี่ยวชาญ หรือใครที่มีประสบการณ์คล้าย ๆ กันครับว่า <strong>จุดดำแบบในรูปนี้คืออะไรครับ?</strong> แล้วมันอันตรายไหมครับ? ควรไปพบแพทย์ดีไหมครับ หรือมีวิธีสังเกตเพิ่มเติมยังไงบ้างครับ</p>\r\n<p><strong>รูปภาพประกอบ:</strong></p>\r\n<p><strong><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"http://localhost:5000/uploads/posts/image-1754319292186-159586760.jpg\" alt=\"\" width=\"333\" height=\"250\"></strong></p>', 'ปกติ', '2025-08-04 14:55:08', '2025-09-16 11:05:54'),
(14, 1, 'ทดสอบระบบรายงานโพสต์และความคิดเห็น', '<p>ทดสอบระบบ</p>', 'ปกติ', '2025-09-14 07:25:40', '2025-09-14 08:50:29');

-- --------------------------------------------------------

--
-- Table structure for table `reported_comments`
--

CREATE TABLE `reported_comments` (
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `status` enum('กำลังดำเนินการ','ดำเนินการแล้ว') NOT NULL DEFAULT 'กำลังดำเนินการ',
  `review_report` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_comments`
--

INSERT INTO `reported_comments` (`comment_id`, `user_id`, `reason`, `status`, `review_report`, `created_at`) VALUES
(2, 4, 'ทดสอบการรายงาน', 'กำลังดำเนินการ', NULL, '2025-09-14 07:20:05'),
(10, 4, 'รายงาน\n', 'กำลังดำเนินการ', NULL, '2025-09-14 07:30:24'),
(10, 6, 'ทอสอบรายงานความคิดเห็น', 'ดำเนินการแล้ว', 'ทีมงานได้ทำการตรวจสอบความคิดเห็นนี้แล้ว พบว่าไม่มีความผิดตามข้อกล่าวหา รายงานนี้จึงถูกปฏิเสธ', '2025-09-14 07:27:50'),
(11, 3, 'ชาวีทดสอบ', 'ดำเนินการแล้ว', 'ทีมงานได้ทำการตรวจสอบความคิดเห็นนี้แล้ว พบว่าไม่มีความผิดตามข้อกล่าวหา รายงานนี้จึงถูกปฏิเสธ', '2025-09-14 07:29:01'),
(11, 4, 'คำหยาบ', 'ดำเนินการแล้ว', 'ทีมงานได้ทำการตรวจสอบความคิดเห็นนี้แล้ว พบว่าไม่มีความผิดตามข้อกล่าวหา รายงานนี้จึงถูกปฏิเสธ', '2025-09-16 11:06:30');

-- --------------------------------------------------------

--
-- Table structure for table `reported_posts`
--

CREATE TABLE `reported_posts` (
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reason` varchar(200) DEFAULT NULL,
  `status` enum('กำลังดำเนินการ','ดำเนินการแล้ว') NOT NULL DEFAULT 'กำลังดำเนินการ',
  `review_report` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_posts`
--

INSERT INTO `reported_posts` (`post_id`, `user_id`, `reason`, `status`, `review_report`, `created_at`) VALUES
(5, 1, 'test report post', 'กำลังดำเนินการ', NULL, '2025-09-17 05:05:12'),
(13, 7, 'รายงาน', 'กำลังดำเนินการ', NULL, '2025-09-16 11:02:58'),
(14, 3, 'ชาวี ทดสอบรายงาน', 'กำลังดำเนินการ', NULL, '2025-09-11 07:28:50'),
(14, 4, 'รายงานโพสต์', 'กำลังดำเนินการ', NULL, '2025-09-12 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `risk_recommendations`
--

CREATE TABLE `risk_recommendations` (
  `id` int(11) NOT NULL,
  `cancer_type` enum('nv','bcc','scc','mel') NOT NULL,
  `risk_level` enum('low','medium','high','veryhigh') NOT NULL,
  `recommendation` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `risk_recommendations`
--

INSERT INTO `risk_recommendations` (`id`, `cancer_type`, `risk_level`, `recommendation`) VALUES
(1, 'nv', 'low', 'ไม่พบความเสี่ยงจากไฝ ควรตรวจติดตามทุก 6-12 เดือน'),
(2, 'nv', 'medium', 'ควรเฝ้าระวังการเปลี่ยนแปลงของไฝ และตรวจโดยแพทย์ผิวหนัง'),
(3, 'nv', 'high', 'เสี่ยงต่อการพัฒนาเป็นมะเร็งผิวหนัง แนะนำพบแพทย์เพื่อตรวจโดยละเอียด'),
(4, 'bcc', 'low', 'โอกาสเป็น BCC ต่ำ ควรดูแลผิวและหลีกเลี่ยงแสงแดดจัด'),
(5, 'bcc', 'medium', 'ควรสังเกตผิวหนังบ่อย ๆ และพิจารณาปรึกษาแพทย์หากมีความผิดปกติ'),
(6, 'bcc', 'high', 'เสี่ยงสูงต่อ BCC ควรปรึกษาแพทย์ผิวหนังเพื่อวางแผนการวินิจฉัย'),
(7, 'scc', 'low', 'ความเสี่ยง SCC ต่ำ แนะนำให้ดูแลผิวหนังและตรวจเช็กปีละครั้ง'),
(8, 'scc', 'medium', 'ตรวจสุขภาพผิวเป็นประจำ และหลีกเลี่ยงการสัมผัสแสงแดดโดยตรง'),
(9, 'scc', 'high', 'ความเสี่ยงสูง ควรรีบพบแพทย์เพื่อทำการตรวจวินิจฉัยโดยด่วน'),
(10, 'mel', 'low', 'ไม่มีสัญญาณของ Melanoma แนะนำให้ตรวจสุขภาพประจำปี'),
(11, 'mel', 'medium', 'พบความเสี่ยงระดับปานกลาง ควรตรวจโดยแพทย์ผู้เชี่ยวชาญ'),
(12, 'mel', 'high', 'เสี่ยง Melanoma สูง ควรเข้ารับการตรวจทันทีโดยแพทย์ผิวหนัง'),
(13, 'nv', 'veryhigh', 'ไฝมีความผิดปกติรุนแรง ควรรีบพบแพทย์ผิวหนังเพื่อตัดชิ้นเนื้อตรวจทันที'),
(14, 'bcc', 'veryhigh', 'มีความเสี่ยงสูงมากต่อ BCC ควรเข้ารับการรักษาหรือผ่าตัดโดยเร็ว'),
(15, 'scc', 'veryhigh', 'มีโอกาสเป็น SCC รุนแรง ควรเข้ารับการตรวจและรักษาอย่างเร่งด่วน'),
(16, 'mel', 'veryhigh', 'เข้าข่าย Melanoma รุนแรง ต้องรีบตรวจวินิจฉัยและรักษาโดยด่วน');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `sex` enum('M','F') DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(255) NOT NULL,
  `role` enum('admin','user') DEFAULT 'user',
  `is_active` enum('ปกติ','ถูกระงับ') NOT NULL DEFAULT 'ปกติ',
  `reason` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `fullname`, `birthdate`, `sex`, `email`, `password`, `created_at`, `avatar`, `role`, `is_active`, `reason`) VALUES
(1, 'Arya Test', '2025-06-29', 'F', 'arya@mail.com', '$2b$10$u6QNsQcqiInP9kPO6BbKIOpdqVrakwPzfOmBDYbaW3hZR6VZXmoma', '2025-07-06 09:51:58', 'https://th.bing.com/th/id/OIG1.SnKHoowaI_EmJElcwbLW?pid=ImgGn', 'user', 'ปกติ', NULL),
(2, 'Boonmee Dee', '2000-01-01', 'M', 'boonmee@example.com', '$2b$10$KHBWFdPpka6d06yDVIkycumVNcDuCrOKtJZiTc3ywYCM6hJDsijeu', '2025-07-06 09:51:58', 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg', 'admin', 'ปกติ', NULL),
(3, 'Chavi Test', '2012-01-02', 'M', 'chavi@mail.com', '$2b$10$1OEX.NRdd2ZDDjCsTTzZH.BI3beVqMJ2797sjJUdqItqXhucQLIem', '2025-07-06 09:51:58', 'https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn', 'user', 'ปกติ', NULL),
(4, 'test', '2025-07-08', 'M', 'test@mail.com', '$2b$10$v.gz3DyX66dZC/gEFNrB3OwzOKbuKx7cXeH2XEth7AVSVglaQyF2q', '2025-07-06 09:51:58', 'https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn', 'user', 'ปกติ', NULL),
(5, 'Admin', '2000-01-01', 'M', 'admin@admin.com', '$2b$10$AoJZ/LxsDYt77KYcQRhcxODB0tdOpYvzW/DNjUndf.VLt1WVG/df2', '2025-08-04 04:15:57', 'https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn', 'admin', 'ปกติ', NULL),
(6, 'Name', '2000-01-01', 'M', 'name@mail.com', '$2b$10$CZBN6VclS9ig6hVeA7acguVQ748T0EwxeawAn.Jg5SMrZOROf4LSe', '2025-09-14 07:13:35', 'https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn', 'user', 'ปกติ', 'ทดสอบการระงับบัญชี'),
(7, 'Boonmee Namkham', '2025-09-01', 'M', 'boonmee@gmail.com', '$2b$10$W4bcdlBYOEUMnZ4ZPFchReHp.Spu5oHNuPPpxb1kMaboG6mR4XNXO', '2025-09-16 10:15:10', 'https://th.bing.com/th/id/OIG3.Tqppk2m07aAJKCGCEy9j?pid=ImgGn', 'user', 'ปกติ', ''),
(8, 'Test 002', '1995-01-02', 'F', 'test02@gmail.com', '$2b$10$dXDJv5mhDPDeM96BN/y5RuTFY/eEtD.5nu8IkBR82GQ04gER2lim6', '2025-10-01 19:30:01', 'https://th.bing.com/th/id/OIG1.SnKHoowaI_EmJElcwbLW?pid=ImgGn', 'user', 'ปกติ', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `analysis_results`
--
ALTER TABLE `analysis_results`
  ADD PRIMARY KEY (`result_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reported_comments`
--
ALTER TABLE `reported_comments`
  ADD PRIMARY KEY (`comment_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `reported_posts`
--
ALTER TABLE `reported_posts`
  ADD PRIMARY KEY (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `risk_recommendations`
--
ALTER TABLE `risk_recommendations`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cancer_type` (`cancer_type`,`risk_level`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `analysis_results`
--
ALTER TABLE `analysis_results`
  MODIFY `result_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `post_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `risk_recommendations`
--
ALTER TABLE `risk_recommendations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `analysis_results`
--
ALTER TABLE `analysis_results`
  ADD CONSTRAINT `analysis_results_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reported_comments`
--
ALTER TABLE `reported_comments`
  ADD CONSTRAINT `reported_comments_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`comment_id`),
  ADD CONSTRAINT `reported_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `reported_posts`
--
ALTER TABLE `reported_posts`
  ADD CONSTRAINT `reported_posts_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
  ADD CONSTRAINT `reported_posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
