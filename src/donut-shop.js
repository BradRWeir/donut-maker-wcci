export class DonutShop{
    #multiplierValue = 1.2; //static
    #multiplierCount = 0;
    #clickerCount = 0;
    #multiplierCost = 100;
    get multiplierCost() {
        return this.#multiplierCost;
    }

    #multiplierCostIncrement = 10;

    #clickerCost = 100;

    get clickerCost(){
        return this.#clickerCost;
    }

    #clickerCostIncrement = 10;

    elements = {
        donutCount: null,
        multiplier: null,
        clickerCount: null,
        clicker: null,
        multiplierCost: null,
        purchaseMultiplier: null,
        clickerCost: null,
        purchaseClicker: null
    }

    get multiplierCount(){
        return this.#donutCount;
    }

    #donutCount = 0;
    get donutCount(){
        return Math.floor(this.#donutCount);
    }

    get multiplier(){
        if (this.#multiplierCount > 0)
        {
            return this.#multiplierCount * this.#multiplierValue;
        }
        return 1;
    }

    #update(){
        this.elements.donutCount.innerText = this.donutCount;
        this.elements.multiplier.innerText = this.multiplier;
        this.elements.clickerCount.innerText = this.#clickerCount;
        this.elements.multiplierCost.innerText = this.#multiplierCost;
        this.elements.clickerCost.innerText = this.#clickerCost;
        if (this.#donutCount >= this.#multiplierCost){
            this.elements.purchaseMultiplier.disabled = false;
        }
        else {
            this.elements.purchaseMultiplier.disabled = true;
        }

        if (this.#donutCount >= this.#clickerCost){
            this.elements.purchaseClicker.disabled = false;
        }
        else {
            this.elements.purchaseClicker.disabled = true;
        }
    }

    constructor(){
        this.elements.donutCount = document.getElementById('donut-count');
        
        this.elements.multiplier = document.getElementById('multiplier');
        
        this.elements.clickerCount = document.getElementById('clicker-count');
        
        this.elements.clicker = document.getElementById('clicker');
        this.elements.multiplierCost = document.getElementById('multiplier-cost');
        
        this.elements.purchaseMultiplier = document.getElementById('purchase-multiplier');
        this.elements.clickerCost = document.getElementById('clicker-cost');
        this.elements.purchaseClicker = document.getElementById('purchase-clicker');
        this.#update();
        
        //this = instanceOfMyClass
        setInterval(this.#run.bind(this), 1000);

        this.elements.clicker.addEventListener('click',this.#incrementDonutCount.bind(this));
        this.elements.purchaseMultiplier.addEventListener('click',this.#addMultiplier.bind(this));
        this.elements.purchaseClicker.addEventListener('click',this.#addClicker.bind(this));
    } 

    #autoClick(){
        for (let i = 0; i < this.#clickerCount; ++i){
            this.#incrementDonutCount();
        }
    }

    #run(){
        this.#autoClick();
        //this.#donutsPerSecond();
    }

    #addMultiplier(){
        if (this.#donutCount >= this.#multiplierCost){
            this.#multiplierCount++;
            this.#donutCount -= this.#multiplierCost;
            this.#multiplierCost += this.#multiplierCostIncrement;
            this.#multiplierCostIncrement++;
            this.#update();
        }
    }

    #addClicker(){
        if (this.#donutCount >= this.#clickerCost){
            this.#clickerCount++;
            this.#donutCount -= this.#clickerCost;
            this.#clickerCost += this.#clickerCostIncrement;
            this.#clickerCostIncrement++;
            this.#update();
        }
    }
    
    #incrementDonutCount(){
        this.#donutCount += 1 * this.multiplier;
        this.#update();
    }
    
}