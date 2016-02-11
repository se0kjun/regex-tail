import test from 'ava';
global.Promise = Promise;
import execa from 'execa';

test(async t => {
	t.true((await execa('./index.js', ['--version'])).stdout.length >= 0);
});
