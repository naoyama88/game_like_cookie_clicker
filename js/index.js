"use strict";

class Observable {
    constructor() {
        // TODO
    }
}

class Observer {
    constructor() {
        // TODO
    }

    update(id, value) {
        document.getElementById(id).innerText = value;
    }
}

class Field extends Observer {
    constructor() {
        super();
        // TODO
    }
}

class Business extends Observable {
    constructor(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId) {
        super();

        this._price = price;
        this._number = number;
        this._profit = profit;
        this._totalEarning = totalEarning;

        this._priceId = priceId;
        this._numberId = numberId;
        this._profitId = profitId;
        this._totalEarningId = totalEarningId;
        this._buyButtonId = buyButtonId;

        this._isDisabled = true;
        this._observers = [];
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
        this.notifyObservers(this.priceId, value);
    }

    get number() {
        return this._number;
    }

    set number(value) {
        this._number = value;
        this.notifyObservers(this.numberId, value);
    }

    get level() {
        return this._level;
    }

    set level(value) {
        this._level = value;
        this.notifyObservers(this.levelId, value);
    }

    get profit() {
        return this._profit;
    }

    set profit(value) {
        this._profit = value;
        this.notifyObservers(this.profitId, value);
    }

    get totalEarning() {
        return this._totalEarning;
    }

    set totalEarning(value) {
        this._totalEarning = value;
        this.notifyObservers(this.totalEarningId, value);
    }

    get priceId() {
        return this._priceId;
    }

    get numberId() {
        return this._numberId;
    }

    get profitId() {
        return this._profitId;
    }

    get totalEarningId() {
        return this._totalEarningId;
    }

    get buyButtonId() {
        return this._buyButtonId;
    }

    get isDisabled() {
        return this._isDisabled;
    }

    set isDisabled(value) {
        this._isDisabled = value;
    }

    get observers() {
        return this._observers;
    }

    addObserver(observer) {
        this._observers.push(observer);
    }

    notifyObservers(id, value) {
        this.observers.forEach((observer) => {
            observer.update(id, value);
        });
    }
}

class VendingMachine extends Business{
    constructor(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId) {
        super(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId);
    }
}

class GroceryStore extends Business{
    constructor(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId) {
        super(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId);
    }
}

class HairSalon extends Business{
    constructor(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId) {
        super(price, number, profit, totalEarning, priceId, numberId, profitId, totalEarningId, buyButtonId);
    }
}

class Game extends Observable {
    constructor(totalEarning, wallet, walletId, totalEarningId) {
        super();
        this.regularIncomeId = null;
        this._totalEarning = totalEarning;
        this._wallet = wallet;

        this._walletId = walletId;
        this._totalEarningId = totalEarningId;
        this._observers = [];
    }

    get businesses() {
        return this._businesses;
    }

    set businesses(value) {
        this._businesses = value;
    }

    get totalEarning() {
        return this._totalEarning;
    }

    set totalEarning(value) {
        this._totalEarning = value;
        this.notifyObservers(this.totalEarningId, value);
    }

    get wallet() {
        return this._wallet;
    }

    set wallet(value) {
        this._wallet = value;
        this.notifyObservers(this.walletId, value);
    }

    get walletId() {
        return this._walletId;
    }

    get totalEarningId() {
        return this._totalEarningId;
    }

    get observers() {
        return this._observers;
    }

    startGame() {
        this.checkAvailability();
        Object.keys(this.businesses).forEach(key => {
            document.getElementById(this.businesses[key].priceId).innerText = this.businesses[key].price;
            document.getElementById(this.businesses[key].profitId).innerText = this.businesses[key].profit;
        });
        this.startShowing();
    }

    startShowing() {
        this.regularIncomeId = setInterval(() =>  {
            this.regularIncome()
        },1000);
    }

    // stopShowing() {
    //     clearInterval( this.passageId );
    // }

    regularIncome() {
        this.getRegularIncome();
        this.checkAvailability();
    }

    pickUpMoney() {
        this.wallet++;
        this.checkAvailability();
    }

    updateTotalEarning() {
        let totalEarning = 0;
        Object.keys(this.businesses).forEach(key => {
            totalEarning += this.businesses[key].totalEarning;
        });
        this.totalEarning = totalEarning;
    }

    buy(business) {
        if (this.wallet >= business.price) {
            this.wallet -=  business.price;
            business.number++;
            business.totalEarning = business.profit * business.number;
            this.updateTotalEarning();
        }
        this.checkAvailability();
    }

    getRegularIncome() {
        Object.keys(this.businesses).forEach(key => {
            if (this.businesses[key].number > 0) {
                this.wallet += this.businesses[key].profit * this.businesses[key].number;
            }
        });
    }

    checkAvailability() {
        Object.keys(this.businesses).forEach(key => {
            let isDisabled = this.wallet < this.businesses[key].price;
            this.businesses[key].isDisabled = isDisabled;
            document.getElementById(this.businesses[key].buyButtonId).disabled = isDisabled; // FIXME don't wanna operate screen things here
        });
    }

    addObserver(observer) {
        this._observers.push(observer);
    }

    notifyObservers(id, value) {
        this.observers.forEach((observer) => {
            observer.update(id, value);
        });
    }

    update(id, value) {
        this.observers.forEach((observer) => {
            observer.update(id, value);
        });
    }

}

let game = new Game(0, 0, "wallet", "totalEarning");

let vending =  new VendingMachine(100, 0, 2, 0, "priceOfVendingMachine", "numberOfVendingMachine", "vendingMachineProfit", "vendingMachineTotalEarning", "buyVendingMachineButton");
vending.addObserver(game);
let grocery =  new GroceryStore(1000, 0, 10, 0, "priceOfGroceryStore", "numberOfGroceryStore", "groceryStoreProfit", "groceryStoreTotalEarning", "buyGroceryStoreButton");
grocery.addObserver(game);
let hair =  new HairSalon(4000, 0, 30, 0, "priceOfHairSalon", "numberOfHairSalon", "hairSalonProfit", "hairSalonTotalEarning", "buyHairSalonButton");
hair.addObserver(game);

let businesses = {
    "vending" : vending,
    "grocery" : grocery,
    "hair" : hair,
};

game.businesses = businesses;
game.addObserver(new Field());

window.onload = function () {
    game.startGame();
};

let saveId = setInterval(() =>  {
    saveGame()
},60000);

function saveGame() {
    localStorage.setItem("game", JSON.stringify(game));
}
