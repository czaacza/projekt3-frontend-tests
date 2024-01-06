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
    const bookId = 27400;
    const payload = JSON.stringify({
        title: 'Updated title',
        author: 'Updated author',
        year: 2024,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.put(`http://localhost:3001/books/${bookId}`, payload, params);
    check(res, { 'updated with status 200': (r) => r.status === 200 });
    sleep(1);
}
