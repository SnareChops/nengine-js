// @ts-ignore
import fs from 'fs';

async function* walk(dir: string): AsyncGenerator<string> {
    for await (const d of await fs.promises.opendir(dir)) {
        const entry = `${dir}/${d.name}`;
        if (d.isDirectory()) yield* walk(entry);
        else if (d.isFile() && /.*\.test\.(?:ts|js)$/.test(d.name)) yield entry;
    }
}

let passed = 0;
let failed = 0;
async function run(fn: Function) {
    const name = fn.name;
    try {
        await fn();
        passed++;
        console.log(`\t\u2713 ${name}`);
    } catch (err) {
        failed++;
        console.error(`\t❌ ${name}`);
        console.error('\t' + err);
    }
}

(async () => {
    // @ts-ignore
    for await (const file of walk(process.cwd())) {
        const content = await import(file);
        console.log('\n' + file);
        for (const prop of Object.values(content)) {
            if (typeof prop === 'function' && /^test.*/.test(prop.name)) await run(prop);
        }
    }
    console.log(`\n${passed} passed\n${failed} failed\n${passed + failed} total`);
})();