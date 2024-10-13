import {
    createRef,
    h, render,
} from 'preact';

import { useState } from 'preact/hooks';

import { getProductIDFromURL } from './torob/api';

import './index.css';
import './torob.gif';

function App() {
    const refA = createRef();
    const [productIDs, setProductIDs] = useState<string[]>([]);

    console.debug(productIDs);

    return h('div', { class: 'w-full px-3 py-4' },

        h('div', { class: 'flex mb-4' },
            h('h1', { class: 'text-2xl' }, 'Torob Aggregator'),
            h('img', { class: 'h-8 ml-2', src: 'torob.gif' }, null),
        ),

        h('textarea', {
            ref: refA,
            class: 'w-full mb-4 border'
        }, null),

        h('button', {
                class: 'bg-indigo-500 text-white text-lg px-2 py-2 rounded flex',
                onClick: () => {
                    if (refA.current === null) return;

                    // console.log(.value.split('\n'));
                    setProductIDs(
                        (refA.current as HTMLTextAreaElement).value
                        .split('\n').map(ln => getProductIDFromURL(ln.trim()))
                    );
                }
            },
            'Generate Results'
        ),

        ...productIDs.map(id => h('p', null, id))
    );
}

render(
    h(App, null),
    document.body
);
