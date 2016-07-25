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

class ProductClient extends BaseClient{

	public function getProducts($catId = null) {

		//http://rm.backend.smart-startup.ru/api/products/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');


		if ($catId){
			$this->params['categoryCode'] = $catId;
		}

		try {
			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/products/',
				'GET',
				$this->params,
				'',
				[
					'Accept' => 'application/json',
					'Accept-Encoding' => 'gzip',
				],
				'application/json'
			);

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		return $this->processResponse($res, 'products');
	}

	public function getProduct($productId) {

		//http://rm.backend.smart-startup.ru/api/products/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');


		$this->params['productCode'] = $productId;

		try {

			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/product/',
				'GET',
				$this->params,
				'',
				[
					'Accept' => 'application/json',
					'Accept-Encoding' => 'gzip',
				],
				'application/json'
			);

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		print_r($res); exit;

		return $this->processResponse($res, 'product');
	}
}