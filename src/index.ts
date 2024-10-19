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

    const commonSellers = useMemo(() => {
        let first_run = true;
        let shop_ids: string[] = [];
        let shop_infos: Record<string, SellerInfo> = {};

        for (const product_id in productsData) {
            const product_data = productsData[product_id];
            const product_shop_map = Object.fromEntries(
                product_data.sellers.map(s => [s.shop_id.toString(), s])
            );

            // reset it
            shop_infos = {};

            if (first_run) {
                first_run = false;
                shop_ids = Object.keys(product_shop_map);
                shop_infos = product_shop_map;
            } else {
                // intersect the seller ids
                shop_ids = Object.keys(product_shop_map).filter(
                    shop_id => {
                        const t = shop_ids.includes(shop_id);

                        if (t) {
                            shop_infos[shop_id] = product_shop_map[shop_id];
                        }

                        return t;
                    }
                );
                console.log('intersect length=', shop_ids.length);
            }
        }

        return { shop_ids, shop_infos };
    }, [ productsData ]);

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
                    'image': h('img', {
                        src: v[1].info.image_url,
                        class: 'h-24 w-24'
                    }),
                    // 'ID': v[0],
                    'product': v[1].info.name2 || v[1].info.name1,
                    'min. price':  v[1].info.min_price.toLocaleString(),
                    'max. price':  v[1].info.max_price.toLocaleString(),
                    'sellers': v[1].sellers.length,
                    'actions': h('button', {
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
            commonSellers.shop_ids.filter(shop_id => {
                return (commonSellers.shop_infos[shop_id].availability);
            }).sort((shop_id_a, shop_id_b) => {
                const shop_a = commonSellers.shop_infos[shop_id_a],
                      shop_b = commonSellers.shop_infos[shop_id_b];

                return shop_b.score_info.score - shop_a.score_info.score;
            }).map(shop_id => {
                const shop_name = commonSellers.shop_infos[shop_id].shop_name;
                const shop_score = commonSellers.shop_infos[shop_id].score_info.score_text;

                let contents = [];
                let total_price = 0;
                let badge_css = 'bg-red-500';

                if (commonSellers.shop_infos[shop_id].score_info.score >= 3)
                    badge_css = 'bg-yellow-400';

                if (commonSellers.shop_infos[shop_id].score_info.score >= 4.5)
                    badge_css = 'bg-green-500';

                lp1: for (const product_id in productsData) {
                    const product_data = productsData[product_id];

                    lp0: for (const product_seller of product_data.sellers) {
                        if (shop_id != product_seller.shop_id.toString()) continue;
                        contents.push({
                            'product': productsData[product_id].info.name2 || product_seller.name1,
                            'price': product_seller.price_text,
                            'free shipping': product_seller.more_info?.free_shipping || '-',
                            // 'heavy items': product_seller.more_info?.heavy_items || '-',
                            // 'payment on delivery': product_seller.more_info?.payment_on_delivery || '-',
                            // 'same day delivery': product_seller.more_info?.same_day_delivery || '-',
                            'same day free shipping': product_seller.more_info?.same_day_free_shipping || '-',
                            'actions': h('button',{
                                type: 'button',
                                class: 'text-sm font-sm text-center bg-green-500 text-white py-1 px-2 border rounded-sm',
                                onClick: () => window.open(product_seller.page_url)
                            }, 'View'),
                        });

                        // if product is unavailable,
                        // make the total price zero and return
                        if (product_seller.price == 0) {
                            total_price = 0;
                            break lp1;
                        }

                        total_price += product_seller.price;
                        break lp0;
                    }
                }

                contents.push({
                    a: 'TOTAL',
                    b: total_price.toLocaleString(),
                });

                return {
                    __total_price: total_price,
                    tp: { text: `${shop_name}`, badge: `${shop_score}`, badge_css },
                    body: (total_price === 0) ? undefined : h(
                        'span', { class: 'px-2 py-2' },
                        GenericRecordTable(contents)
                    )
                };
            }).filter((v) => {
                // unavailable products make the total zero
                return (v.__total_price !== 0);
            }).sort((tp_a, tp_b) => {
                return tp_a.__total_price - tp_b.__total_price;
            })
        )
    );
}

render(
    h(App, null),
    document.body
);
