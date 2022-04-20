import * as PIXI from 'pixi.js';
//import { Loader } from 'pixi.js';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

class DonutShop{
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

    elements : any = {
        // donutCount: null,
        // multiplier: null,
        // clickerCount: null,
        // clicker: null,
        // multiplierCost: null,
        // purchaseMultiplier: null,
        // clickerCost: null,
        // purchaseClicker: null
    };

    get multiplierCount(){
        return this.#multiplierCount;
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
			//swapMulti(true);
			multiplierBlockEnabled.visible=true;
        }
        else {
            this.elements.purchaseMultiplier.disabled = true;
			//swapMulti(false);
			multiplierBlockEnabled.visible=false;
        }

        if (this.#donutCount >= this.#clickerCost){
            this.elements.purchaseClicker.disabled = false;
			clickerBlockEnabled.visible=true;
        }
        else {
            this.elements.purchaseClicker.disabled = true;
			clickerBlockEnabled.visible=false;
        }
    }

    constructor(){
        this.elements.donutCount = document.getElementById('donut-count') as HTMLLabelElement;
        
        this.elements.multiplier = document.getElementById('multiplier') as HTMLLabelElement;
        
        this.elements.clickerCount = document.getElementById('clicker-count') as HTMLLabelElement;
        
        this.elements.clicker = document.getElementById('clicker') as HTMLButtonElement;
        this.elements.multiplierCost = document.getElementById('multiplier-cost') as HTMLLabelElement;
        
        this.elements.purchaseMultiplier = document.getElementById('purchase-multiplier') as HTMLButtonElement;
        this.elements.clickerCost = document.getElementById('clicker-cost') as HTMLLabelElement;
        this.elements.purchaseClicker = document.getElementById('purchase-clicker') as HTMLButtonElement;
        this.#update();
        
        //this = instanceOfMyClass
        setInterval(this.#run.bind(this), 1000);

        this.elements.clicker.addEventListener('click',this.incrementDonutCount.bind(this));
        this.elements.purchaseMultiplier.addEventListener('click',this.addMultiplier.bind(this));
        this.elements.purchaseClicker.addEventListener('click',this.addClicker.bind(this));
    } 

    #autoClick(){
        for (let i = 0; i < this.#clickerCount; ++i){
            this.incrementDonutCount();
        }
    }

    #run(){
        this.#autoClick();
        //this.#donutsPerSecond();
    }

    addMultiplier(){
        if (this.#donutCount >= this.#multiplierCost){
            this.#multiplierCount++;
            this.#donutCount -= this.#multiplierCost;
            this.#multiplierCost += this.#multiplierCostIncrement;
            this.#multiplierCostIncrement++;
            this.#update();
        }
    }

    addClicker(){
        if (this.#donutCount >= this.#clickerCost){
            this.#clickerCount++;
            this.#donutCount -= this.#clickerCost;
            this.#clickerCost += this.#clickerCostIncrement;
            this.#clickerCostIncrement++;
            this.#update();
        }
    }
    
    incrementDonutCount(){
        this.#donutCount += 1 * this.multiplier;
        this.#update();
    }
    
}



//import { Sprite } from 'pixi.js';

//const interactionManager = new PIXI.InteractionManager(app.renderer)

const NES_RES_WIDTH = 256;
const NES_RES_HEIGHT = 224;
const BAKER_VX_MAX = 5;
const BAKER_VY_MAX = 5;
const GRAVITY = 0.5;

const app = new PIXI.Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	//resolution: window.devicePixelRatio || 1,
	//autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight,
	//autoResize: true,
});

const resizeHandler = () => {
	const scaleFactor = Math.min(
	  window.innerWidth / NES_RES_WIDTH,
	  window.innerHeight / NES_RES_HEIGHT
	);
	const newWidth = Math.ceil(NES_RES_WIDTH * scaleFactor);
	const newHeight = Math.ceil(NES_RES_HEIGHT * scaleFactor);
	
	app.renderer.view.style.width = `${newWidth}px`;
	app.renderer.view.style.height = `${newHeight}px`;
  
	app.renderer.resize(newWidth, newHeight);
	mainContainer.scale.set(scaleFactor); 
  };

const mainContainer = new PIXI.Container();
app.stage.addChild(mainContainer);
const ticker = PIXI.Ticker.shared;

window.addEventListener('resize', resizeHandler, false);
resizeHandler();



//let keys: {[key: string]: Boolean} = {};

class DonutBlock extends PIXI.Sprite {
	_vY : number = 0;
	vYMax : number = 10;
	get vY():number{
		return this._vY;
	}
	set vY(value : number) {
		if (Math.abs(value) > this.vYMax){
			this._vY = Math.sign(value) * this.vYMax;
		}
		else {
			this._vY = value;
		}
	}

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
	}

	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//this._bounds.rect = new PIXI.Rectangle(this.x,this.y,this.width,this.height);
		this.anchor.set(0.5);
		super.x = 85;
		this.y = 140;
	}

}

class MultiplierBlock extends PIXI.Sprite {
	// _enabled : Boolean = false;
	// get enabled() :Boolean {
	// 	return this._enabled;
	// }
	// set enabled(value :Boolean){
	// 	if (value){
	// 		this.texture = PIXI.Texture.from("multiplier-block-enabled");
	// 	}
	// 	else {
	// 		this.texture = PIXI.Texture.from("multiplier-block-disabled");
	// 	}
	// 	this._enabled = value;
	// }
	_vY : number = 0;
	vYMax : number = 10;
	get vY():number{
		return this._vY;
	}
	set vY(value : number) {
		if (Math.abs(value) > this.vYMax){
			this._vY = Math.sign(value) * this.vYMax;
		}
		else {
			this._vY = value;
		}
	}

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
	}


	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//this._bounds.rect = new PIXI.Rectangle(this.x,this.y,this.width,this.height);
		this.anchor.set(0.5);
		super.x = 135;
		this.y = 140;
	}

}

class MultiplierBlockEnabled extends PIXI.Sprite {
	// _enabled : Boolean = false;
	// get enabled() :Boolean {
	// 	return this._enabled;
	// }
	// set enabled(value :Boolean){
	// 	if (value){
	// 		this.texture = PIXI.Texture.from("multiplier-block-enabled");
	// 	}
	// 	else {
	// 		this.texture = PIXI.Texture.from("multiplier-block-disabled");
	// 	}
	// 	this._enabled = value;
	// }
	_vY : number = 0;
	vYMax : number = 10;
	get vY():number{
		return this._vY;
	}
	set vY(value : number) {
		if (Math.abs(value) > this.vYMax){
			this._vY = Math.sign(value) * this.vYMax;
		}
		else {
			this._vY = value;
		}
	}

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
	}


	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//this._bounds.rect = new PIXI.Rectangle(this.x,this.y,this.width,this.height);
		this.anchor.set(0.5);
		super.x = 135;
		this.y = 140;
	}

}

class ClickerBlock extends PIXI.Sprite {
	// _enabled : Boolean = false;
	// get enabled() :Boolean {
	// 	return this._enabled;
	// }
	// set enabled(value :Boolean){
	// 	if (value){
	// 		this.texture = PIXI.Texture.from("clicker-block-enabled");
	// 	}
	// 	else {
	// 		this.texture = PIXI.Texture.from("cliker-block-disabled");
	// 	}
	// 	this._enabled = value;
	// }
	_vY : number = 0;
	vYMax : number = 10;
	get vY():number{
		return this._vY;
	}
	set vY(value : number) {
		if (Math.abs(value) > this.vYMax){
			this._vY = Math.sign(value) * this.vYMax;
		}
		else {
			this._vY = value;
		}
	}

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
	}

	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//this._bounds.rect = new PIXI.Rectangle(this.x,this.y,this.width,this.height);
		this.anchor.set(0.5);
		this.x = 185;
		this.y = 140;
		//this.position.x = 200;
	}

}

class ClickerBlockEnabled extends PIXI.Sprite {
	// _enabled : Boolean = false;
	// get enabled() :Boolean {
	// 	return this._enabled;
	// }
	// set enabled(value :Boolean){
	// 	if (value){
	// 		this.texture = PIXI.Texture.from("clicker-block-enabled");
	// 	}
	// 	else {
	// 		this.texture = PIXI.Texture.from("cliker-block-disabled");
	// 	}
	// 	this._enabled = value;
	// }
	_vY : number = 0;
	vYMax : number = 10;
	get vY():number{
		return this._vY;
	}
	set vY(value : number) {
		if (Math.abs(value) > this.vYMax){
			this._vY = Math.sign(value) * this.vYMax;
		}
		else {
			this._vY = value;
		}
	}

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		super.x = value;
	}

	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//this._bounds.rect = new PIXI.Rectangle(this.x,this.y,this.width,this.height);
		this.anchor.set(0.5);
		this.x = 185;
		this.y = 140;
		//this.position.x = 200;
	}

}




class Baker extends PIXI.Sprite {
	//keys :any = {};
	_vX = 0;
	_vY = 0;

	get vX(){
		return this._vX;
	}

	set vX(value){
		if (Math.abs(value) < this.vXMax)
			this._vX = value;
		else
			this._vX = Math.sign(value)*this.vXMax;
	}


	get vY(){
		return this._vY;
	}

	set vY(value){
		if (Math.abs(value) < this.vYMax)
			this._vY = value;
		else
			this._vY = Math.sign(value)*this.vXMax;
			baker.isJumping = false;
	}

	vXMax = BAKER_VX_MAX;
	vYMax = BAKER_VY_MAX;
	minX = 0 + this.width;
	minY = 0 + this.height;
	maxX = app.screen.width - this.width;
	maxY = 174;

	override get x() : number{
		return super.x;
	}

	override set x(value: number) {
		//console.log(this.x,this.y,this.height,this.width,app.view.height,app.view.width,app.screen.height,app.screen.width);
		if (value >= this.minX && value <= this.maxX)
			super.x = value;
		else
			super.x = this.maxX;
	}

	override get y() : number {
		return super.y;
	}

	override set y(value: number) {
		if (value >= this.minY && value <= this.maxY)
			super.y = value;
		else
			{
				this.isJumping = false;
				//super.y = this.maxY;
			}
	}

	constructor(textureUrl : string){
		super(PIXI.Texture.from(textureUrl));
		//ticker.add(this.update.bind(this));
		//this._bounds.rect = this;
		
		this.anchor.set(0.5);
		this.x = 19;
		this.y = 7;
		
	}

	isMovingLeft: Boolean = false;
	isMovingRight: Boolean = false;
	isJumping: Boolean = false;

	startJump(){
		this.isJumping = true;
		//keys["Space"] = false;
	}

	startLeft(){
		
		this.isMovingLeft = true;
		this.isMovingRight = false;
	}

	endLeft(){
		this.isMovingLeft = false;
		
	}

	startRight(){
		this.isMovingRight = true;
		this.isMovingLeft = false;
	}

	endRight(){
		this.isMovingRight = false;
	}


	update(delta : number) :void{
		//console.log(this.vX,this.vY,this.isJumping);
		if (this.isJumping == true){
			this.vY -= 500 *delta;
			//this.isJumping == false;
		}
		else {
			//this.vY += 5 * delta;
		}
		if (this.isMovingLeft){
			if (this.scale.x < 0) this.scale.x *= -1;
			this.vX -= 1 * delta;
		}
		else if (this.isMovingRight){
			if (this.scale.x > 0) this.scale.x *= -1;
			this.vX += 1 * delta;
		}
		else{
			if (this.vX > -1.25 || this.vX < 1.25)
				this.vX = 0;
			else if (this.vX > -1.25)
				this.vX -= 1 * delta;
			else if (this.vX < 1.25)
				this.vX += 1 * delta;
			else if (this.vX < 0.5 && this.vX > -0.5)
				this.vX = 0;
		}
		
		this.vY += GRAVITY * delta;
		this.x += this.vX * delta;
		this.y += this.vY * delta;
	}

}

// const loader = PIXI.Loader.shared;
// const sprites : any = {};

// function loadTextures(loader, resources){
// 	sprites.baker = new Baker(resources.baker.texture);
// 	sprites.donutBlock = new Baker(resources.donutBlock.texture);
// 	sprites.multiplierBlock = new Baker(resources.multiplierBlock.texture);
// 	sprites.clickerBlock = new Baker(resources.clickerBlock.texture);
// }

// loader.add('baker','mario-baker-1.png')
// .add('donutBlock','donut-block.png')
// .add('multiplierBlock','multiplier-block-disabled.png')
// .add('clickerBlock','clicker-block-disabled.png')
// .onComplete(loadTextures);

// PIXI.Loader.shared.add(["mario-baker-1.png","donut-block.png","multiplier-block-disabled.png","clicker-block-disabled.png"]);
// PIXI.Loader.shared.load();

const baker = new Baker("mario-baker-1.png");
const donutBlock = new DonutBlock("donut-block.png");
const multiplierBlock = new MultiplierBlock("multiplier-block-disabled.png");
const clickerBlock = new ClickerBlock("clicker-block-disabled.png");

const multiplierBlockEnabled = new MultiplierBlockEnabled("multiplier-block.png");
const clickerBlockEnabled = new ClickerBlockEnabled("clicker-block.png");

multiplierBlockEnabled.visible = false;
clickerBlockEnabled.visible = false;

const donutShop = new DonutShop();

const background = PIXI.Sprite.from("mario-baker-background.png");

mainContainer.addChild(background);

mainContainer.addChild(baker);
mainContainer.addChild(donutBlock);

mainContainer.addChild(multiplierBlock);
mainContainer.addChild(clickerBlock);

mainContainer.addChild(multiplierBlockEnabled);
mainContainer.addChild(clickerBlockEnabled);


// const sprite = Sprite.from("mario-baker-2.png");
// sprite.x = 59;
// app.stage.addChild(sprite);
// app.ticker.add((delta) => {
// 	sprite.rotation += 0.1 * delta;
// });

//const background: PIXI.Sprite = PIXI.Sprite.from("mario-baker-background.png");

// function gameLoop(){
	
// }


function update(delta : number): void {
	baker.update(delta);
	updateFixedInterval();
	if(checkCollision(baker,donutBlock)){
		console.log('multx',multiplierBlock)
		baker.vX = -1*baker.vX;
		baker.vY = -1*baker.vY;
		donutShop.incrementDonutCount();
	};

	if(checkCollision(baker,multiplierBlock)){
		console.log('collision!')
		baker.vX = -1*baker.vX;
		baker.vY = -1*baker.vY;
		donutShop.addMultiplier();
	};

	if(checkCollision(baker,clickerBlock)){
		console.log('collision!')
		baker.vX = -1*baker.vX;
		baker.vY = -1*baker.vY;
		donutShop.addClicker();
	};
}

const G_TICK = 40; //1000/40 = 25 fps
let g_Time = 0;

function updateFixedInterval(): void {
	//console.log(delta);
	let now = (new Date()).getTime();
	let timeDiff = now - g_Time;
	if (timeDiff < G_TICK)
		return;


	//fixed operations
	//console.log(baker.vY);
	if (keys["Space"]  && baker.isJumping == false){
		//console.log('test');
		baker.startJump();
		keys["Space"] = false;
		
	}
	if (keys["KeyD"]){
		baker.startRight();
		baker.endLeft();
	}
	else {
		baker.endRight();
	}
	if (keys["KeyA"]){
		baker.startLeft();
		baker.endRight();
	}
	else {
		baker.endLeft();
	}
}

ticker.add(update);




ticker.start();

let keys : {[key: string] : Boolean }= {};

window.addEventListener("keydown", handleUserKeyDown);

function handleUserKeyDown(e : KeyboardEvent){
	//console.log(e.code);
	keys[e.code] = true;

}

window.addEventListener("keyup", handleUserKeyUp);

function handleUserKeyUp(e : KeyboardEvent){
	keys[e.code] = false;
}

function checkCollision(spriteA : PIXI.Sprite, spriteB: PIXI.Sprite) : Boolean{
	//console.log(spriteA.y,spriteB.y+spriteB.height);
	//return false;

	//return false;
	return (spriteA.x + spriteA.width > spriteB.x
		&& spriteA.x <= spriteB.x + spriteB.width
		&& spriteA.y + spriteA.height >= spriteB.y
		&& spriteA.y <= spriteB.y + spriteB.height)

}

// function swapMulti(enabledValue: Boolean){
// 	multiplierBlock.enabled = enabledValue;
// }

