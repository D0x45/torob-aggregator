import { h } from 'preact';

function GenericRecordTable(rows: Array<Record<string, any>>) {

    if (rows.length === 0)
        return h('span', {
            class: 'w-full block mb-4 text-center px-1.5 py-1.5 rounded bg-gray-100 border border-gray-400 text-gray-500'
        }, 'no data to show here!');

    return h('table', { class: 'w-full text-center text-gray-500 mb-4' },
        h('thead',
            { class: 'uppercase text-gray-700 bg-gray-50 border border-gray-200' },
            h('tr', null,
                Object.keys(rows[0]).map(k => h('th', null, k))
            )
        ),
        h('tbody', null,
            rows.map(record => {
                return h('tr',
                    { class: 'odd:bg-white even:bg-gray-100 border border-gray-200' },
                    Object.values(record).map(v => h('td', null, v))
                );
            })
        )
    );
}

export default GenericRecordTable;
