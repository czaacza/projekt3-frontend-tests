import Benchmark from 'benchmark';

import { getUserOrders } from '../src/api/orders';

const suite = new Benchmark.Suite();

suite.add('getUserOrders', async function (deferred) {
  await getUserOrders();
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
