<?php

use Emsifa\ApiWilayah\Generator;
use Emsifa\ApiWilayah\Repository;

require "vendor/autoload.php";

$repository = new Repository(__DIR__.'/data');

$repository->cache('provinces.csv');
$repository->cache('regencies.csv');
$repository->cache('districts.csv');
$repository->cache('villages.csv');
$repository->cache('tps.csv');

$generator = new Generator($repository, __DIR__.'/static/api');


$generator->generate();
