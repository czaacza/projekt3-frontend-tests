import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '1m', target: 200 },
        { duration: '1m', target: 0 },
    ],
};

export default function () {
    const userId = '769568a2-ea9f-46be-b83c-ff18b34cdd28';

    let res = http.del(`http://localhost:3001/users/${userId}`);
    check(res, { 'status was 204 or 404': (r) => r.status == 204 || r.status == 404});
    sleep(1);
}

