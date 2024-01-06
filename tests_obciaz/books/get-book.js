import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const bookId = 27400; // Przykładowe ID książki

    let res = http.get(`http://localhost:3001/books/${bookId}`);
    check(res, { 'status was 200': (r) => r.status === 200 });
    sleep(1);
}
