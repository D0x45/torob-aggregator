import { h } from 'preact';

function FullScreenOverlayLoading(show: boolean) {
    return h('div', {
            id: 'loading-screen',
            class: 'w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50 ' + (show ? '' : 'hidden')
        },
        h('span', { class: 'text-rose-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0' },
            h('svg', {
                    class: 'animate-spin -ml-1 mr-3 h-10 w-10',
                    fill: 'none',
                    viewBox: '0 0 24 24'
                },
                h('path', {
                    class: 'opacity-75', fill: 'currentColor',
                    d: 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                })
            )
        )
    );
}

export default FullScreenOverlayLoading;
