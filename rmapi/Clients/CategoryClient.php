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

class CategoryClient {
	protected $ci;
	//Constructor
	public function __construct(ContainerInterface $ci) {
		$this->ci = $ci;
	}

	public function getCategories($request, $response, $args) {

		//http://rm.backend.smart-startup.ru/api/categories/

		$apiClient = new ApiClient();
		$apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');

		try {

			list($response, $statusCode, $httpHeader) = $apiClient->callApi(
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

			if (!$response) {
				return array(null, $statusCode, $httpHeader);
			}

		} catch (ApiException $e) {
			echo 'Error';
			exit;
		}


		print_r($response); exit;


	}

	public function method2($request, $response, $args) {
		//your code
		//to access items in the container... $this->ci->get('');
	}

	public function method3($request, $response, $args) {
		//your code
		//to access items in the container... $this->ci->get('');
	}
}