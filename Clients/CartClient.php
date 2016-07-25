<?php
/**
 * Created by PhpStorm.
 * User: b.pechorin@corp.mail.ru
 * Date: 30.06.16
 * Time: 20:10
 */

namespace Clients;

use Api\ApiClient;
use Api\ApiException;


/**
 * Class CartClient
 * @package Clients
 */

class CartClient extends BaseClient{

	public function getCart() {

		//http://rm.backend.smart-startup.ru/api/basket/get-all/?rmSessionId=5791d02969889
		try {
			list($res, $statusCode, $httpHeader) = $this->callApi('/basket/get-all/');

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}


		return [];
	}

	public function addProduct($productId, $orderWeight, $amount) {

		// http://rm.backend.smart-startup.ru/api/basket/add/?productCode=kolbasa_servelat_finskiy_v_k&orderWeight=0.8&amount=1&rmSessionId=5791d02969889

		$this->params['productCode'] 	= $productId;
		$this->params['orderWeight'] 	= $orderWeight;
		$this->params['amount'] 		= $amount;

		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/basket/add/');

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		print_r($res); exit;

		$product = $this->processResponse($res, 'product');

		return $product;
	}

	public function removeProduct($productId, $orderWeight) {

		//http://rm.backend.smart-startup.ru/api/basket/remove/?productCode=kolbasa_servelat_finskiy_v_k&orderWeight=0.4&rmSessionId=5791d02969889

		$this->params['productCode'] 	= $productId;
		$this->params['orderWeight'] 	= $orderWeight;

		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/basket/add/');

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		print_r($res); exit;

		$product = $this->processResponse($res, 'product');

		return $product;
	}


}