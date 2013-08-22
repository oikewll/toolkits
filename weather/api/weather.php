<?php
	header("Content-Type:text/html; charset=utf-8");
	header('Content-Type:text/json');
	$id = $_GET['id'];
	$cb = $_GET['callback']; 
	$type = $_GET['type'];//cityinfo、sk
	//天气全部
	switch ($type) {
		case 'sk':
			$jp = 'http://www.weather.com.cn/data/sk/'. $id .'.html';
			break;
		case 'cityinfo':
			$jp = 'http://www.weather.com.cn/data/cityinfo/'. $id .'.html';
			break;		
		default:
			$jp = 'http://m.weather.com.cn/data/'. $id .'.html';
			break;
	}
	
	$contents = file_get_contents($jp);
	exit($cb. '(' .$contents . ')');
?>