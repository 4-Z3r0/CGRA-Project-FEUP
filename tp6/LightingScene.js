var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

class LightingScene extends CGFscene 
{
	constructor()
	{
		super();

	};

	init(application) 
	{
		super.init(application);

		this.enableTextures(true);

		this.initCameras();

		this.initLights();
		
		this.gl.clearColor(0.53, 0.81, 0.98, 1.0);
		this.gl.clearDepth(100.0);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.depthFunc(this.gl.LEQUAL);

		this.axis = new CGFaxis(this);

		this.light1=true; 

		this.light2=true; 

		this.light3=true; 

		this.light4=true; 

		this.speed= 3.0;


		this.currVehicleAppearance = 'Normal';
		
		this.vehicleAppearances = [
		'Normal', 'Camuflage', 'Zebra'
		];



		this.axisDisplay = false;
	
		this.setUpdatePeriod(20);
			
		this.maxVelocity = 0.04;
		
		this.minVelocity = -0.04;

		this.displayVehicle = true;
			
		this.altimetry= [
						[ 2.0 , 3.0 , 2.0, 4.0, 2.5, 2.4, 2.3, 1.3, 0.0 ],
						[ 2.0 , 3.0 , 2.0, 4.0, 7.5, 6.4, 4.3, 1.3, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 2.0, 4.0, 2.5, 2.4, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 2.0, 4.0, 3.5, 2.4, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 0.0 , 0.0 , 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],
						[ 2.0 , 3.0 , 2.0, 1.0, 2.5, 2.4, 2.3, 1.3, 0.0 ]
						];
		
		//terreno
		this.terrain = new MyTerrain(this,0,1,0,1,8,50,50,this.altimetry);

		
		//roda
		this.wheel = new MyMovingWheel(this, 20, -1, 1, -1, 1, 0.5, 0.4);

		//para-lamas
		
		this.fender1 = new MyFenderComplete(this,8,1,2);

		this.fender2 = new MyFenderComplete(this,8,1,2);

		this.fender3 = new MyFenderComplete(this,8,1,2);

		this.fender4 = new MyFenderComplete(this,8,1,2);

		//vehicle
		this.vehicle = new MyMovingVehicle(this);
		this.vehicle.x = 14;

		this.deltaSide = 1;


		//crane

		this.crane = new MyCrane(this, this.vehicle,12,15);
	

		
	};

	initCameras() 
	{
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
	};

	initLights() 
	{
		this.setGlobalAmbientLight(0,0,0, 1.0);
		

		this.lights[0].setPosition(14, 20, 1, 1);

        this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
                this.lights[1].setSpecular(1.0,1.0,1.0,1.0);
       	this.lights[0].enable();  
        this.lights[0].setVisible(false);
      
		

		this.lights[1].setPosition(-14, 20, 1, 1);

        this.lights[1].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[1].setSpecular(1.0,1.0,1.0,1.0);
        this.lights[1].enable();
        this.lights[1].setVisible(false);

        this.lights[2].setPosition(0, 20, 10,1);
        this.lights[2].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[2].enable();
        this.lights[2].setVisible(false);


        this.lights[3].setPosition(0, 20, -10,1);
        this.lights[3].setDiffuse(1.0,1.0,1.0,1.0);
        this.lights[3].enable();
        this.lights[3].setVisible(false);
       
	};

	updateLights() 
	{
		for (var i = 0; i < this.lights.length; i++)
			this.lights[i].update();
	}

	checkKeys()
	{
		var text="Keys pressed: ";
		var keysPressed=false;
		if (this.gui.isKeyPressed("KeyW"))
		{
			text+=" W ";
			if (this.vehicle.velocity < this.maxVelocity)
			{
				this.vehicle.velocity  = this.vehicle.velocity + 0.0001;
				
			}
			
			keysPressed=true;
		}
		if (this.gui.isKeyPressed("KeyS"))
		{
			text+=" S ";
			if (this.vehicle.velocity > this.minVelocity)
			{
				this.vehicle.velocity = this.vehicle.velocity - 0.0001;
			}
			
			keysPressed=true;
			
		}
		if (this.gui.isKeyPressed("KeyA"))
		{
			text+=" A ";
			this.vehicle.turnFrontWheelsToTheLeft();
			//this.vehicle.angle += 0.05;
			this.vehicle.angle += 0.05*this.vehicle.velocity*100;
	
			keysPressed=true;

			
		}
		if (this.gui.isKeyPressed("KeyD"))
		{
			text+=" D ";
			this.vehicle.turnFrontWheelsToTheRight();
			//this.vehicle.angle -= 0.05;
			this.vehicle.angle -= 0.05*this.vehicle.velocity*100;
	
			keysPressed=true;

			
		}
		if(!this.gui.isKeyPressed("KeyA") && !this.gui.isKeyPressed("KeyD") && this.vehicle.vehicle.frontRightWheel.movSide != 0)
		{	
			if (this.vehicle.vehicle.frontRightWheel.movSide > 0)
				this.deltaSide = 1;
			else
				this.deltaSide = -1;
			
			this.vehicle.vehicle.frontRightWheel.movSide -= this.deltaSide;
			this.vehicle.vehicle.frontLeftWheel.movSide -= this.deltaSide;
			
		}
		
	}

	isBetween(min, max, value)
	{
		if(value <= max && value >= min)
		{
			return true;
		}
		else
			return false;
	}

	update(currTime)
	{
		this.checkKeys();
		this.vehicle.update(currTime);	
		this.maxVelocity = this.speed/100.0;	
		this.crane.update(currTime);
		this.crane.update(currTime);


	
		if (this.isBetween(5.5, 6.8, this.vehicle.x- this.crane.x) && this.isBetween(-1.4, -0.4, this.vehicle.z - this.crane.z))
		{
				this.crane.displayTV = true;
		}

	}



	displayAxis()
	{
		this.axisDisplay = !this.axisDisplay;
	};



	display() 
	{
		// ---- BEGIN Background, camera and axis setup

		// Clear image and depth buffer everytime we update the scene
		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// Initialize Model-View matrix as identity (no transformation)
		this.updateProjectionMatrix();
		this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Update all lights used
		this.updateLights();

		// Draw axis
	
		if (this.axisDisplay)
		{
			this.pushMatrix();
			this.scale(5,5,5);
			this.axis.display();
			this.popMatrix();
		}
	


		//terreno
		this.pushMatrix();
		this.terrain.display();
		this.popMatrix();


		if(this.currVehicleAppearance == 'Camuflage')
			this.vehicle.vehicle.appearanceKey = "0";	
		else
		{
			if(this.currVehicleAppearance == 'Zebra')
				this.vehicle.vehicle.appearanceKey = "1";
			else
				this.vehicle.vehicle.appearanceKey = "2";
		}

		//veiculo
		if (this.vehicle.isMoving)
		{
			this.pushMatrix();
			this.vehicle.display();
			this.popMatrix();
		}
	
		this.pushMatrix();
		this.translate(this.crane.x,0, this.crane.z);
		this.crane.display();
		this.popMatrix();

			
	



		//cena de ligar e desligar as luzes

		if(this.light1 == false)
			this.lights[0].disable();
		else
			this.lights[0].enable();

		if(this.light2 == false)
			this.lights[1].disable();
		else
			this.lights[1].enable();

		if(this.light3 == false)
			this.lights[2].disable();
		else
			this.lights[2].enable();

		if(this.light4 == false)
			this.lights[3].disable();
		else
			this.lights[3].enable();


	};








};
