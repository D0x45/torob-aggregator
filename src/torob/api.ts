import {
    type ProductSellersResult,
    type SearchResults,
    type ProductDetails,
    type Error,
} from './types';

export function getProductIDFromURL(url: string): string {
    // https://torob.com/p/896f7b67-aa8f-4510-aafa-e21d7d178124/%DA%AF%D9
    const { pathname } = new URL(url);

    if (false === pathname.startsWith('/p/'))
        throw 'Invalid Torob product url!';

    return pathname.slice(
        3, // skip the /p/
        pathname.indexOf('/', 3)
    );
}

export async function getProductSellers(
    product_id: string,
    search_id: string = '',
    cities: string = '',
    province: string = '',
    seed: string = '',
): Promise<ProductSellersResult> {
    const resp = await fetch(`https://api.torob.com/v4/base-product/sellers/?source=next_desktop&discover_method=direct&_bt__experiment=&search_id=${search_id}&cities=${cities}&province=${province}&prk=${product_id}&list_type=products_info&seed=${seed}`);
    const data: ProductSellersResult | Error = await resp.json();

    if (resp.status !== 200)
        throw (data as Error).error.message;

    return (data as ProductSellersResult);
}

export async function getSearchResults(query: string): Promise<SearchResults> {
    const resp = await fetch(`https://api.torob.com/v4/base-product/search/?page=0&sort=popularity&size=24&query=${query}&q=${query}&source=next_desktop`);
    const data: SearchResults | Error = await resp.json();

    if (resp.status !== 200)
        throw (data as Error).error.message;

    return (data as SearchResults);
}

export async function getProductsDetails(prk: string): Promise<ProductDetails> {
    const resp = await fetch(`https://api.torob.com/v4/base-product/details-log-click/?source=next_desktop&discover_method=browse&_bt__experiment=&prk=${prk}&is_adv=&rank=1&search_id=6711268458a8723560b1f4d1&suid=6711268458a8723560b1f4d1&max_seller_count=30&deliver_city=&_url_referrer=`);
    const data: ProductDetails | Error = await resp.json();

    if (resp.status !== 200)
        throw (data as Error).error.message;

    return (data as ProductDetails);
}
