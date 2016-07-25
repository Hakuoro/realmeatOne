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

		if ($catId){
			$this->params['categoryCode'] = $catId;
		}

		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/products/');

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

		$this->params['productCode'] = $productId;

		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/product/');

			if (!$res) {
				throw  new \Exception('Cannot get products', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		$product = $this->processResponse($res, 'product');

		 if (isset($product->weightOrder)){

			 $slices = explode(';', $product->weightOrder);

			 foreach ($slices as $weight){

				 if ($weight) {
					 $product->slices[] = [
						 'weight' => $weight,
						 'price' => round($product->price * $weight, 2)
					 ];
				 }
			 }

		 }

		return $product;
	}
}