import Benchmark from 'benchmark';

import { addToCart } from '../functions/cartButton';

const suite = new Benchmark.Suite();

const mockBook = {
  id: '1',
  title: 'Sample Book',
  author: 'John Doe',
  description: 'A great book for testing purposes.',
  price: 19.99,
  image: 'book-image-url.jpg',
};

suite.add('addToCart', function () {
  addToCart(mockBook);
});

suite
  .on('start', function () {
    console.log('Benchmarking...');
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Benchmark complete.');
  })
  .run({ async: true });
