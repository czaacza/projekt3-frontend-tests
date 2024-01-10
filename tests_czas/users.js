import Benchmark from 'benchmark';

import { getStoredUser, isUserAdmin } from '../src/api/users';

const suite = new Benchmark.Suite();

suite.add('getStoredUser', async function (deferred) {
  await getStoredUser();
  deferred.resolve();
}, { defer: true });

const mockUser = {
  id: '123',
  username: 'mockuser',
  email: 'mockuser@example.com',
  isAdmin: true,
  details: {
    firstName: 'Mock',
    lastName: 'User',
    phone: '123-456-7890',
  },
};

suite.add('isUserAdmin', function () {
  isUserAdmin(mockUser);
});

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
