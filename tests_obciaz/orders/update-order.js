import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '30s', target: 100 },
        { duration: '10s', target: 0 },
    ],
};

export default function () {
    const orderId = 27400;

    const payload = JSON.stringify({
        user_id: 48560, 
        books: [
            { id: "alius absens amplexus", order_id: 22357, quantity: 4 },
        ],
        first_name: "Vinnie",
        last_name: "Hayes",
        phone: "(487) 533-3487",
        email: "Arianna71@hotmail.com",
        comments: "Zaktualizowany komentarz",
        status: "zaktualizowany_status"
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    let res = http.put(`http://localhost:3001/orders/${orderId}`, payload, params);
    check(res, { 'updated with status 200': (r) => r.status === 200 });
    sleep(1);
}
