export interface Product {
    id: string;
    name: string;
    image: string[];
    pdf: string;
    part_number: string;
    quantity: number;
    in_stock: boolean;
    description: string;
    show_pdf: boolean;
    show_product: boolean;
    price: number;
  }
  
  export type ProductCategory = 
    "CLEANING SETS & MULTIPURPOSE BUCKETS" |
    "DUSTPANS AND BROOMS" |
    "BRUSHES" |
    "CARPET SWEEPERS" |
    "WIPERS & SQUEEGEES" |
    "TOILET BRUSHES" |
    "METAL FLOOR & PANE WIPERS";
  
  export interface ProductsData {
    flora: {
      [key in ProductCategory]: Product[];
    };
  }
  