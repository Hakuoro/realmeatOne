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
use Slim\Http\Response;

class CategoryClient {
	protected $ci;
	//Constructor
	public function __construct(ContainerInterface $ci) {
		$this->ci = $ci;

		/** @var \Slim\Views\Twig view */
		$this->view = $this->ci->view;

	}

	public function getCategories() {

		//http://rm.backend.smart-startup.ru/api/categories/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');

		try {

			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/categories/',
				'GET',
				[],
				'',
				[
					'Accept' => 'application/json',
					'Accept-Encoding' => 'gzip',
				],
				'application/json'
			);

			if (!$res) {
				throw  new \Exception('Cannot get categories', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		return $res->categories;

	}


	public function getCategory($id) {

		//http://rm.backend.smart-startup.ru/api/categories/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');

		try {

			list($res, $statusCode, $httpHeader) = $apiClient->callApi(
				'/categories/',
				'GET',
				[],
				'',
				[
					'Accept' => 'application/json',
					'Accept-Encoding' => 'gzip',
				],
				'application/json'
			);

			if (!$res) {
				throw  new \Exception('Cannot get categories', 500);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}

		return $res->categories;

	}
}