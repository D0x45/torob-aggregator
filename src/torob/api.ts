import {
    type ProductSellersResult,
    type SearchResults,
    type Error,
} from './types';

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