import http from 'k6/http';
import { check } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 150 },
        { duration: '30s', target: 0 },
    ],
};

export default function () {
    const payload = JSON.stringify({
        username: 'Jan_Kowalski',
        email: `jan${Math.random()}@example.com`,
        password: 'password123',
        isAdmin: false
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post('http://localhost:3001/users', payload, params);
    check(res, { 'status was 201': (r) => r.status == 201 });
}
