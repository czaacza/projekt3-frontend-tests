import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '15s', target: 0 },
    ],
};

export default function () {
    const orderId = 42076;
    let res = http.del(`http://localhost:3001/orders/${orderId}`);
    check(res, { 'deleted with status 204 or 404': (r) => r.status === 204 || r.status === 404 });
    sleep(1);
}
