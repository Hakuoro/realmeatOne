<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';


$app = new \Slim\App;

// Get container
$container = $app->getContainer();

// Register component on container
$container['view'] = function ($container) {
	$view = new \Slim\Views\Twig('../templates', [
		//'cache' => '../cache'
		'cache' => false
	]);
	$view->addExtension(new \Slim\Views\TwigExtension(
		$container['router'],
		$container['request']->getUri()
	));

	return $view;
};


$app->get('/hello/{name}', function (Request $request, Response $response) {
	$name = $request->getAttribute('name');
	$response->getBody()->write("Hello, $name");

	return $response;
});

$app->get('/', function (Request $request, Response $response) {

	return $this->view->render($response, 'index.html', [
		'categories' => (new \Clients\CategoryClient($this))->getCategories(''),
		'products' => (new \Clients\ProductClient($this))->getProducts('')
	]);
});

$app->get('/categories/{id}', function (Request $request, Response $response, $args) {

	return $this->view->render($response, 'index.html', [
		'categories' => (new \Clients\CategoryClient($this))->getCategories(''),
		'products' => (new \Clients\ProductClient($this))->getProducts($args['id'])
	]);
});


//$app->get('/api/categories', '\Clients\CategoryClient:getCategories');
$app->get('/categories', '\Clients\CategoryClient:getCategories');


$app->run();