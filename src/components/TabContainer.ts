import {
    type VNode,
    h
} from 'preact';
import { useState, useRef } from 'preact/hooks';

export interface TabPicker {
    text: string,
    badge?: string,
    badge_css?: string,
};

export function TabContainer(
    items: Array<{ tp: TabPicker, body?: VNode<any> }>
) {
    const [activeIndex, setActiveIndex] = useState(0);
    const refA = useRef<HTMLDivElement>(null);

    if (items.length === 0)
        return h('span', {
            class: 'w-full mb-4 block text-center px-1.5 py-1.5 rounded bg-gray-100 border border-gray-400 text-gray-500'
        }, 'chirp chirp! nothing to see here :0');

    return h('div', { name: 'TabContainer', class: 'mb-4' },
        h('div', { class: 'flex' },
            // tab pickers
            h('nav', {
                    ref: refA,
                    class: 'flex gap-x-1 mr-1 w-full overflow-x-scroll scrollbar-none',
                    role: 'tablist',
                    'aria-label': 'Tabs',
                    'aria-orientation': 'horizontal',
                },
                ...items.map((v, i) => {
                    return h('button', {
                        onClick: (e: MouseEvent) => {
                            (e.target as HTMLButtonElement).scrollIntoView({
                                inline: 'center',
                                block: 'center',
                                behavior: 'smooth'
                            });
                            setActiveIndex(i);
                        },
                        type: 'button',
                        class: 'min-w-fit py-1 px-2 inline-flex items-center gap-x-2 text-sm font-medium text-center border rounded-t-lg focus:text-gray-700 '
                                + (i === activeIndex ? 'border-green-600 border-b-transparent text-green-600' : 'opacity-50'),
                        role: 'tab',
                        'aria-selected': (i === activeIndex ? 'true' : 'false'),
                    },
                    v.tp.text,
                    v.tp.badge
                        ? h('span', {
                            class: 'py-0.5 px-1.5 rounded-full text-xs font-medium bg-green-600 text-white '
                                    + (v.tp.badge_css || ''),
                        }, v.tp.badge)
                        : undefined,
                    );
                })
            ),
            // navigator buttons
            h('button', {
                onClick: () => {
                    refA.current!.scrollTo({
                        left: refA.current!.scrollLeft - 200,
                        behavior: 'smooth'
                    });
                },
                type: 'button',
                class: 'block sticky min-w-fit -mb-px py-1 px-2 inline-flex items-center gap-x-2 text-xs font-medium text-center border rounded hover:bg-green-600',
            }, '<'),
            h('button', {
                onClick: () => {
                    refA.current!.scrollTo({
                        left: refA.current!.scrollLeft + 200,
                        behavior: 'smooth'
                    });
                },
                type: 'button',
                class: 'block sticky min-w-fit -mb-px py-1 px-2 inline-flex items-center gap-x-2 text-xs font-medium text-center border rounded hover:bg-green-600',
            }, '>'),
        ),
        // tab panels
        // h('div', null,
            ...items.map((v, i) => {
                return h('div', {
                    role: 'tabpanel',
                    class: 'border border-green-600 '
                        + (i === activeIndex ? '' :  'hidden'),
                }, v.body);
            })
        // )
    );
}
