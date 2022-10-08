import redis from '@config/cache';
import Queue from 'bull';

import * as jobs from './jobs';

const queues = Object.values(jobs).map(job => ({
    bull: new Queue(job.key, {
        redis: { host: redis.config.redis.host, port: redis.config.redis.port },
    }),
    name: job.key,
    handle: job.handle,
}));

export default {
    queues,
    add(name: string, data: any) {
        const queue = queues.find(queue => (queue.name = name));
        return queue?.bull.add(data);
    },
    process() {
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            queue.bull.on('failed', (job, err) => {
                console.log('Job failed', queue.name, job.data);
                console.log(err);
            });
        });
    },
};

// const mailQueue = new Queue(RegistrationMail.key, {
//     redis: { host: redis.config.redis.host, port: redis.config.redis.port },
// });

// export default mailQueue;
