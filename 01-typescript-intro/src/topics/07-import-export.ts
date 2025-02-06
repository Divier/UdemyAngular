import { Product, taxCalculation } from './06-function-destructuring'

const shoppingCart: Product[] = [
    {
        description: 'Nokia',
        price: 100
    },
    {
        description: 'iPad',
        price: 150
    }
]

const [total, totalTax] = taxCalculation({
    tax: 0.15,
    product: shoppingCart
});

console.log('TOTAL:', total);
console.log('TAX:', totalTax);