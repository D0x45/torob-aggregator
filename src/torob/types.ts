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
