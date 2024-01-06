import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    const userId = 38484;
    const payload = JSON.stringify({
        username: 'Updated_Username',
        email: 'newemail@example.com',
        password: 'newpassword123',
        isAdmin: false
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.put(`http://localhost:3001/users/${userId}`, payload, params);
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
