import Benchmark from 'benchmark';

import { fetchProducts } from '../src/api/products';

const suite = new Benchmark.Suite();

suite.add('fetchProducts', async function (deferred) {
  await fetchProducts();
  deferred.resolve();
}, { defer: true });

suite
  .on('start', function() {
    console.log('Benchmarking...');
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Benchmark complete.');
  })
  .run({ async: true });
