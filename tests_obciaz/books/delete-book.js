import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '15s', target: 50 },
        { duration: '30s', target: 200 },
        { duration: '15s', target: 0 },
    ],
};

export default function () {
    const bookId = "2f0821a1-9dd9-4a94-9289-bd389d65c1af";

    let res = http.del(`http://localhost:3001/books/${bookId}`);

    check(res, {
        'deleted with status 200 or 404': (r) => r.status === 200 || r.status === 404
    });
    sleep(1);
}
