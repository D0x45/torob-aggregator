import { h, render } from 'preact';
import { useState, useMemo } from 'preact/hooks';

import {
    type ProductDetails,
    type SellerInfo,
} from './torob/types';
import {
    getProductIDFromURL,
    getProductSellers,
    getProductsDetails,
} from './torob/api';

import GenericRecordTable from './components/GenericRecordTable';
import FullScreenOverlayLoading from './components/FullScreenOverlayLoading';
import {
    TabContainer,
} from './components/TabContainer';

import './index.css';
import './torob.gif';

type ProductInfoAndSellers = {
    info: ProductDetails,
    sellers: SellerInfo[]
};
type ProductsData<ProductID extends string = string>
    = Record<ProductID, ProductInfoAndSellers>;

function App() {
    const [inProgress, setInProgress] = useState(false);
    const [productsData, setProductsData] = useState<ProductsData>({});

    const intersectingShopIDs = useMemo(() => {
        let first_run = true;
        let shop_ids: number[] = [];

        for (const product_id in productsData) {
            const product_data = productsData[product_id];
            const product_shop_ids = product_data.sellers.map(s => s.shop_id);

            if (first_run) {
                first_run = false;
                shop_ids = product_shop_ids;
                // shop_names = product_data.sellers.map(s => s.shop_name);
            } else {
                // intersect the seller ids
                shop_ids = product_shop_ids.filter(
                    i => shop_ids.includes(i)
                );
                console.log('intersect length=', shop_ids.length);
            }
        }

        return shop_ids;
    }, [productsData]);

    const _doTheThing = async (target: HTMLInputElement) => {
        const productId = getProductIDFromURL(target.value);
        setInProgress(true);

        try {
            if (productId in productsData)
                throw 'this product is already in the list!';

            const j = await getProductsDetails(productId);
            const v = await getProductSellers(productId);

            setProductsData({
                ...productsData,
                [productId]: {
                    info: j,
                    sellers: v.results,
                }
            });
        } catch(e) { console.error(e); }

        setInProgress(false);
        target.value = '';
    };

    return h('div', { class: 'w-full px-3 py-4' },
        FullScreenOverlayLoading(inProgress),

        // app header
        h('div', { class: 'flex mb-4' },
            h('h1', { class: 'text-2xl' }, 'Torob Aggregator'),
            h('img', { class: 'h-8 ml-2', src: 'torob.gif' }, null),
        ),

        // the input text box
        h('input', {
            type: 'text',
            class: 'w-full border rounded mb-4 px-1 py-1',
            placeholder: 'e.g. https://torob.com/p/e73e32df-f315-4e68-8675-b078016831d7/%DA%AF%D9... (DRAG and DROP also works)',
            onKeyup: (e: KeyboardEvent) => (e.key !== 'Enter') && _doTheThing(e.target as HTMLInputElement),
            onMouseLeave: (e: MouseEvent) => _doTheThing(e.target as HTMLInputElement),
        }, null),

        GenericRecordTable(
            Object.entries(productsData).map(v => {
                return {
                    'Image': h('img', {
                        src: v[1].info.image_url,
                        class: 'h-32 w-32'
                    }),
                    // 'ID': v[0],
                    'Title': v[1].info.name2 || v[1].info.name1,
                    'Min Price':  v[1].info.min_price.toLocaleString('en-us'),
                    'Max Price':  v[1].info.max_price.toLocaleString('en-us'),
                    'Sellers': v[1].sellers.length,
                    'Actions': h('button', {
                        class: 'text-lg font-lg text-center bg-red-500 text-white py-3 px-3 border rounded-lg',
                        type: 'button',
                        onclick: () => {
                            delete productsData[v[0]];
                            const newData = { ...productsData };
                            setProductsData(newData);
                        }
                    }, 'X')
                };
            })
        ),

        TabContainer(
            intersectingShopIDs.map(id => {
                // TODO: gather all the products provided by this seller
                // and list them here with packaging price and all
                return {
                    tp: { text: `${id}`, badge: '!', badge_css: 'bg-red-500' },
                    body: h(
                        'span', { class: 'px-2 py-2' },
                        `${id}`
                    )
                };
            })
        )
    );
}

render(
    h(App, null),
    document.body
);
