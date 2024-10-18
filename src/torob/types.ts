export interface Error {
    detail: string;
    error: {
        message: string;
        error_user_msg: string;
        redirect_url: string;
    };
};

export interface ProductSellersResult {
    results: SellerInfo[];
    count: number;
}

export interface SellerInfo {
    availability: boolean;
    name1: string;
    name2: string;
    shop_name: string;
    shop_name2: string;
    shop_id: number;
    prk: string;
    problem_report_type: ProblemReportType;
    page_url: string;
    is_filtered_by_city: boolean;
    is_filtered_by_official_shop: boolean;
    is_filtered_by_warranty: boolean;
    is_filtered_by_bnpl: boolean;
    shop_score_percentile: number;
    shop_votes_count: number;
    button_text: string;
    price: number;
    price_text: string;
    price_text_striked: string;
    price_text_mode: PriceTextMode;
    is_price_unreliable: boolean;
    price_string: string;
    shop_score: number;
    show_report_button: boolean;
    more_info: MoreInfo | null;
    score_info: ScoreInfo;
    is_adv: boolean;
    last_price_change_date: null | string;
    show_purchase_warning: boolean;
    installment: null;
    guarantee_info: GuaranteeInfo;
}

export interface GuaranteeInfo {
    status: "disabled" | "enabled";
}

export interface MoreInfo {
    payment_on_delivery: null | string;
    free_shipping: null | string;
    same_day_delivery: null | string;
    shipping_types: ShippingType[];
    heavy_items: null | string;
    same_day_free_shipping: null | string;
    selected_shipping_info: null;
}

export type ShippingType =
    | "باربری های درون شهری یا برون شهری"
    | "خودروی فروشگاه"
    | "دسترسی آنلاین"
    | "شرکتهای پست خصوصی نظیر تیپاکس"
    | "پست سفارشی"
    | "پست پیشتاز"
    | "پیک";

export type PriceTextMode =
    | "active"
    | "disabled";

export type ProblemReportType = "" | "online";

export interface ScoreInfo {
    score: number;
    score_text: string;
    score_color: ScoreColor;
    score_background_color: ScoreBackgroundColor;
    complaints_info: ComplaintsInfo;
}

export interface ComplaintsInfo {
    title: string;
    summary: string[];
}

export type ScoreBackgroundColor =
    | "#daf2d5"
    | "#e7fae3"
    | "#ecedef"
    | "#edfaeb";

export type ScoreColor =
    | "#0b5124"
    | "#248212"
    | "#333333"
    | "#649124";

export interface SearchResults {
    results:                  SearchItem[];
    count:                    number;
    max_price:                number;
    min_price:                number;
    next:                     string;
    previous:                 null;
    canonical_url:            string;
    spellcheck:               Spellcheck;
    available_filters:        any[];
    attributes:               Attribute[];
    filters1:                 SearchFilters1[];
    filters2:                 SearchFilters2[];
    related_queries:          null;
    seo_title:                string;
    seo_description:          string;
    category_is_leaf:         boolean;
    filter_by_category_title: string;
    categories:               Category[];
    parent_categories:        any[];
}

export interface Attribute {
    title:       string;
    slug:        string;
    type:        string;
    badge_text?: string;
    items:       AttributeItem[];
    url?:        string;
}

export interface AttributeItem {
    id?:    number;
    slug?:  string;
    name1?: string;
    name2?: string;
    name?:  string;
    value?: string;
}

export interface Category {
    title:      string;
    cat_id:     number;
    cat_slug:   string;
    brand_id:   null;
    brand_slug: null;
    id:         string;
    slug:       string;
}

export interface SearchFilters1 {
    title:       string;
    slug:        string;
    type:        string;
    badge_text?: string;
    items?:      SearchFilters1Item[];
    url?:        string;
}

export interface SearchFilters1Item {
    id?:    number;
    slug:   string;
    name1?: string;
    name2?: string;
    value?: number;
}

export interface SearchFilters2 {
    title:       string;
    slug:        string;
    type:        string;
    items?:      SearchFilters2Item[];
    badge_text?: string;
}

export interface SearchFilters2Item {
    name:  string;
    value: string;
}

export interface SearchItem {
    badges:                  any[];
    media_urls:              MediaURL[];
    discount_info:           any[];
    random_key:              string;
    name1:                   string;
    name2:                   string;
    more_info_url:           string;
    web_client_absolute_url: string;
    price:                   number;
    price_text:              string;
    price_text_mode:         PriceTextMode;
    shop_text:               string;
    stock_status:            string;
    delivery_city_name:      null;
    delivery_city_flag:      null;
    is_adv:                  boolean;
    similar_api:             string;
    card_type:               CardType;
    estimated_sell:          string;
    image_url:               string;
    image_count:             number;
    direct_cta:              null;
}

export type CardType = "default";

export interface MediaURL {
    type: MediaType;
    url:  string;
}

export type MediaType = "image";

export interface Spellcheck {
    is_spellchecked: boolean;
    initial_query:   string;
    corrected_query: string;
}

export interface ProductDetails {
    badges:                            unknown[];
    media_urls:                        MediaURL[];
    discount_info:                     unknown[];
    random_key:                        string;
    name1:                             string;
    name2:                             string;
    more_info_url:                     string;
    web_client_absolute_url:           string;
    price:                             number;
    price_text:                        string;
    price_text_mode:                   PriceTextMode;
    shop_text:                         string;
    stock_status:                      string;
    delivery_city_name:                unknown;
    delivery_city_flag:                unknown;
    is_adv:                            boolean;
    similar_api:                       string;
    card_type:                         string;
    estimated_sell:                    string;
    image_url:                         string;
    image_count:                       number;
    direct_cta:                        unknown;
    products_info:                     ProductsInfo;
    products_in_store_info:            ProductsInStoreInfo;
    products_instore_info:             ProductsInStoreInfo;
    seller_title:                      string;
    filters:                           Filters;
    buy_box_price_text:                string;
    buy_box_button_text:               string;
    min_price:                         number;
    max_price:                         number;
    variants:                          Variant[];
    contents:                          any[];
    breadcrumbs:                       Breadcrumb[];
    structural_specs:                  StructuralSpecs;
    key_specs:                         KeySpec[];
    slug_name:                         string;
    is_confirmed:                      boolean;
    is_accessible:                     boolean;
    availability:                      boolean;
    similar_listing:                   string;
    similar_products:                  string;
    torob_category:                    number;
    no_index:                          boolean;
    buy_box_button_link:               string;
    buy_box_show_purchase_warning:     boolean;
    new_buy_box_button_text:           string;
    new_buy_box_button_text2:          string;
    new_buy_box_button_badge:          string;
    new_buy_box_button_badge_style:    string;
    new_buy_box_button_link:           string;
    new_buy_box_button_scrol_to_prk:   string;
    new_buy_box_source_prk:            string;
    new_buy_box_source_type:           NewBuyBoxSourceTypeEnum;
    new_buy_box_chevron_text:          string;
    new_buy_box_show_purchase_warning: boolean;
    new_buy_box_contact_url:           unknown;
    interview_survey_data:             unknown;
    image_urls:                        ImageURL[];
    seo_title:                         string;
    seo_description:                   string;
}

export interface Breadcrumb {
    id:       number;
    title:    string;
    url:      string;
    cat_id:   number;
    brand_id: number | null;
}

export interface Filters {
    items: FiltersItem[];
    url:   string;
}

export interface FiltersItem {
    title:                       string;
    type:                        string;
    action:                      string;
    price_str:                   string;
    icon:                        string;
    order?:                      string[];
    online_shop_display_count?:  number;
    offline_shop_display_count?: number;
    is_active?:                  boolean;
}

export interface ImageURL {
    source: string;
    urls:   string[];
}

export interface KeySpec {
    header: string;
    items:  KeySpecItem[];
}

export interface KeySpecItem {
    icon:  string;
    key:   string;
    value: string[];
}

export enum NewBuyBoxSourceTypeEnum {
    Online = "online",
}

export interface ProductsInStoreInfo {
    ordering:            number;
    title:               string;
    tab_title:           string;
    result:              ProductsInStoreInfoResult[];
    seed:                string;
    count:               number;
    is_visible:          boolean;
    sellers_url:         string;
    map_sellers_api_url: string;
    map_sellers_url:     string;
}

export interface ProductsInStoreInfoResult {
    prk:                    string;
    shop_id:                number;
    name1:                  string;
    name2:                  string;
    shop_name:              string;
    shop_name2:             string;
    price:                  number;
    price_string:           string;
    is_price_unreliable:    boolean;
    button_text:            ButtonText;
    problem_report_type:    ProblemReportType;
    last_price_change_date: string;
    badges:                 any[];
    image_info:             ImageInfo | null;
    is_filtered_by_city:    boolean;
    page_url:               string;
    score_info:             ScoreInfo;
    address:                string;
}

export enum ButtonText {
    اطلاعاتتماس = "اطلاعات تماس",
}

export interface ImageInfo {
    thumbnail_image_url: string;
    shop_images_api_url: string;
    count:               number;
}


export interface ScoreInfo {
    score:                  number;
    score_text:             string;
    score_color:            ScoreColor;
    score_background_color: ScoreBackgroundColor;
    complaints_info:        ComplaintsInfo;
}

export interface ComplaintsInfo {
    title:   string;
    summary: string[];
}


export interface ProductsInfo {
    ordering:    number;
    title:       string;
    tab_title:   string;
    result:      ProductsInfoResult[];
    seed:        string;
    count:       number;
    is_visible:  boolean;
    sellers_url: string;
}

export interface ProductsInfoResult {
    availability:                 boolean;
    name1:                        string;
    name2:                        string;
    shop_name:                    string;
    shop_name2:                   string;
    shop_id:                      number;
    prk:                          string;
    problem_report_type:          NewBuyBoxSourceTypeEnum;
    page_url:                     string;
    is_filtered_by_city:          boolean;
    is_filtered_by_official_shop: boolean;
    is_filtered_by_warranty:      boolean;
    is_filtered_by_bnpl:          boolean;
    shop_score_percentile:        number;
    shop_votes_count:             number;
    button_text:                  string;
    price:                        number;
    price_text:                   string;
    price_text_striked:           string;
    price_text_mode:              PriceTextMode;
    is_price_unreliable:          boolean;
    price_string:                 string;
    shop_score:                   number;
    show_report_button:           boolean;
    more_info:                    MoreInfo;
    score_info:                   ScoreInfo;
    is_adv:                       boolean;
    last_price_change_date:       string;
    show_purchase_warning:        boolean;
    installment:                  InstallmentProvider[] | null;
    guarantee_info:               GuaranteeInfo;
}

export interface InstallmentProvider {
    title:         string;
    short_title:   string;
    logo:          string;
    name:          string;
    description:   string;
    more_info_url: null | string;
}

export interface StructuralSpecs {
    source:  string;
    headers: Header[];
}

export interface Header {
    header: string;
    specs:  { [key: string]: string };
}

export interface Variant {
    title: string;
    items: VariantItem[];
}

export interface VariantItem {
    badges:                  any[];
    media_urls:              MediaURL[];
    discount_info:           any[];
    random_key:              string;
    name1:                   string;
    name2:                   string;
    more_info_url:           string;
    web_client_absolute_url: string;
    price:                   number;
    price_text:              string;
    price_text_mode:         string;
    shop_text:               string;
    stock_status:            string;
    delivery_city_name:      unknown;
    delivery_city_flag:      unknown;
    is_adv:                  boolean;
    similar_api:             string;
    card_type:               string;
    estimated_sell:          string;
    image_url:               string;
    image_count:             number;
    direct_cta:              unknown;
    selected:                boolean;
    title:                   string;
    slug_name:               string;
    show_image:              boolean;
    attributes:              Attributes;
}

export interface Attributes {
    nfc:              string;
    ram:              string;
    year:             string;
    model:            string;
    weight:           string;
    battery:          string;
    chipset:          string;
    network:          string;
    storage:          string;
    cpu_type:         string;
    sim_card:         string;
    core_count:       string;
    main_camera:      string;
    originality:      string;
    rom_country:      string;
    screen_size:      string;
    battery_type:     string;
    stock_status:     string;
    active_status:    string;
    selfie_camera:    string;
    operating_system: string;
}
