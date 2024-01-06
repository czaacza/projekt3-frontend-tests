import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '15s', target: 0 },
    ],
};

export default function () {
    const payload = JSON.stringify({
        title: 'Nowa książka',
        author: 'Autor',
        year: 2024,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post('http://localhost:3001/books', payload, params);
    check(res, { 'created with status 201': (r) => r.status === 201 });
    sleep(1);
}
