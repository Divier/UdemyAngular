export class Person {
    
    constructor(
        public fistName: string,
        public lastName: string,
        private address: string = 'No Adrress'
    ) {}
}

/*export class Hero extends Person {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string
    ){
        super(realName, 'New York');
    }
}*/

export class Hero {

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ){
    }
}

const person = new Person('Tony', 'Stark', 'New York');
const iroman = new Hero('Iroman', 45, 'Tony', person);

console.log(iroman);