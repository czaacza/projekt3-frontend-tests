import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '30s', target: 150 },
    ],
};

export default function () {
    const payload = JSON.stringify({
        user_id: 48560,
        books: [
            { id: "Testowanie oprogramowania", order_id: 22357, quantity: 4 },
        ],
        first_name: "Vinnie",
        last_name: "Hayes",
        phone: "(487) 533-3487",
        email: "Arianna71@hotmail.com",
        comments: "Comment",
        status: "adulatio"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.post('http://localhost:3001/orders', payload, params);
    check(res, { 'created with status 201': (r) => r.status === 201 });
    sleep(1);
}
