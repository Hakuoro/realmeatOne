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

class CategoryClient extends BaseClient{


	public function getCategories() {

		//http://rm.backend.smart-startup.ru/api/categories/
		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/categories/');

			if (!$res) {
				throw  new \Exception('Cannot get categories', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}


		return $this->processResponse($res, 'categories');

	}


	public function getCategory($id) {

		//http://rm.backend.smart-startup.ru/api/categories/

		try {

			list($res, $statusCode, $httpHeader) = $this->callApi('/categories/');

			if (!$res) {
				throw  new \Exception('Cannot get categories', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}


		return $this->processResponse($res, 'categories');
	}
}