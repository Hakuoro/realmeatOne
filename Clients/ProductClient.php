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
use Interop\Container\ContainerInterface;
use Slim\Http\Request;
use Slim\Http\Response;

class ProductClient {
	protected $ci;
	//Constructor
	public function __construct(ContainerInterface $ci) {
		$this->ci = $ci;

		/** @var \Slim\Views\Twig view */
		$this->view = $this->ci->view;

	}

	public function getProducts($catId = null) {

		//http://rm.backend.smart-startup.ru/api/products/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');

		$params = [];

		if ($catId){
			$params['categoryCode'] = $catId;
		}

		try {
			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/products/',
				'GET',
				$params,
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

		return $res->products;

	}

	public function getProduct($productId) {

		//http://rm.backend.smart-startup.ru/api/products/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');


		$params['productCode'] = $productId;

		try {

			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/product/',
				'GET',
				$params,
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

		//print_r($res); exit;

		return $res;

	}
}