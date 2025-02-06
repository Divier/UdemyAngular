export interface Product {
    description: string;
    price: number;
}

/*const phone : Product = {
    description: 'Nokia A1',
    price: 150.0
}

const tablet : Product = {
    description: 'iPad Air',
    price: 250.0
}*/

interface TaxInformationOptions {
    tax: number;
    product: Product[];
}

export function taxCalculation(options: TaxInformationOptions): [number, number] {

    let total = 0;
    const {product, tax} = options;

    product.forEach( ({ price }) => {
        total += price;
    })
    return [total, total * tax]
}

/*const shoppingCart = [phone, tablet];
const tax = 0.15;

const [total, totalTax] = taxCalculation({
    tax,
    product: shoppingCart
});*/

//console.log('TOTAL:', total);
//console.log('TAX:', totalTax);