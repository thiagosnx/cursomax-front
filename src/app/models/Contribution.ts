export interface Contribution {
    url: string;
}

export interface Donation {
    value: DoubleRange,
    ip : string,
    qr_code_base64:string,
    qr_code:string,
}