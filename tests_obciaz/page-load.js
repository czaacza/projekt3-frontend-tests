import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
    vus: 10,
    duration: '10s',
};

export default function () {
    const response = http.get('http://localhost:5173/');

    sleep(1);
}