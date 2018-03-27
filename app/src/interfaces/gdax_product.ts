// gdax_api_interaces.ts
// interface for gdax product
export interface gdaxProduct {
    id: string;
    base_currency: string;
    quote_currency: string;
    base_min_size: string;
    base_max_size: string;
    quote_increment: string;
    display_name: string;
    status: string;
    margin_enabled: boolean;
    status_message?: any;
    min_market_funds?: any;
    max_market_funds?: any;
    post_only: boolean;
    limit_only: boolean;
    cancel_only: boolean;
}