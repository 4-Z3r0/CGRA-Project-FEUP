
class MyBackP3 extends CGFobject
{
	constructor(scene,minS,maxS,minT,maxT) 
	{
		super(scene);

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;
		

		
		this.initBuffers();
	};



	initBuffers()
	{
		this.vertices = [
			2.9,-0.08,1.8,
			2.9,-0.08,0,
			3.4,0.35,1.8,
			3.4,0.35,0,
			];

		this.indices = [
			0,1,2,
			3,2,1,
		];
		
		this.normals = [
		Math.sqrt(0.5),-Math.sqrt(0.5),0,
		Math.sqrt(0.5),-Math.sqrt(0.5),0,
		Math.sqrt(0.5),-Math.sqrt(0.5),0,
		Math.sqrt(0.5),-Math.sqrt(0.5),0,
		];


		this.texCoords = [
			this.minS,this.maxT,
			this.maxS,this.maxT,
			this.minS,this.minT,
			this.maxS,this.minT
		];

			
		this.primitiveType=this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	};
};