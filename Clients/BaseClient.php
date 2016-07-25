<?php
/**
 * Created by PhpStorm.
 * User: b.pechorin@corp.mail.ru
 * Date: 25.07.16
 * Time: 10:07
 */

namespace Clients;


use Api\ApiClient;
use Interop\Container\ContainerInterface;

class BaseClient
{

	const SESSION_NAME = 'rmSessionId';

	protected $ci;


	/**
	 * @var \Slim\Views\Twig
	 */
	protected $view;

	/**
	 * @var \Slim\Http\Cookies
	 */
	protected $cookies;

	/**
	 * @var string
	 */
	protected $session = '';


	protected $params = [];

	/**
	 * @var null ApiClient
	 */
	protected $apiClient = null;

	//Constructor
	public function __construct(ContainerInterface $ci) {
		$this->ci = $ci;

		$this->view = $this->ci->view;

		$this->cookies = $this->ci->cookie;

		$this->session = $this->cookies->get(self::SESSION_NAME, '');

		if ($this->session){
			$this->params[self::SESSION_NAME] = $this->session;
		}

		$this->apiClient = $this->ci->apiClient;

		$this->apiClient->getConfig()->setHost('http://rm.backend.smart-startup.ru/api');
	}


	protected function processResponse($response, $section){

		 if (isset($response->{self::SESSION_NAME})){

			 $this->cookies->set(self::SESSION_NAME,
				 [
					 'value' => $response->{self::SESSION_NAME},
					 'expires' => date('Y-m-d H:i:s', time() + 36000)
				 ]
			 );
		 }

		return $response->{$section};
	}

	protected function callApi($url){

		return $this->apiClient->callApi(
			$url,
			'GET',
			$this->params,
			'',
			[
				'Accept' => 'application/json',
				'Accept-Encoding' => 'gzip',
			],
			'application/json'
		);
	}
}