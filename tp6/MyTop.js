class MyTop extends CGFobject{

	constructor(scene , slices, minS, maxS, minT, maxT, rad) 
	{
		super(scene);

		this.slices = slices;
		this.rad = rad;

		this.minS = minS;
		this.maxS = maxS;
		this.minT = minT;
		this.maxT = maxT;

		this.initBuffers();
	};

	initBuffers()
	{
		this.vertices = [
		];


		this.indices = [
		];


		this.normals = [
		];


		this.texCoords = [
		];


		this.vertices.push(0);
		this.vertices.push(0);
		this.vertices.push(0);

		this.normals.push(0);
		this.normals.push(0);
		this.normals.push(1);


		var angle = Math.PI*2/(this.slices);
		var newangle = 0;
		var x = 0;
		var y = 0;
		var z = 0;

		var count = 0;
		while(count < this.slices)
		{
			x = Math.cos(newangle);
			y = Math.sin(newangle);
			

			this.vertices.push(this.rad*x);
			this.vertices.push(this.rad*y);
			this.vertices.push(0);

			this.normals.push(0);
			this.normals.push(0);
			this.normals.push(1);

			newangle = newangle + angle;
			count++;
		}

		for(var i = 1; i < this.slices; i++)
		{
			this.indices.push(0);
			this.indices.push(i);
			this.indices.push(i+1);
		}

		this.indices.push(0);
		this.indices.push(this.slices);
		this.indices.push(1);


		
		var angle = Math.PI*2/(this.slices);
		var newangle = 0;
		var x = 0;
		var y = 0;
		var z = 0;

		var count = 0;
		
		this.texCoords.push(0.5*this.maxS);
		this.texCoords.push(0.5*this.maxT);
		while(count < this.slices)
		{
			x = -Math.cos(newangle);
			y = Math.sin(newangle);
			

			this.texCoords.push(0.5*(x + this.maxS));
			this.texCoords.push(0.5*(y + this.maxT));

			newangle = newangle + angle;
			count++;
		}

		
		this.primitiveType=this.scene.gl.TRIANGLES;
		console.log(this.indices);
		this.initGLBuffers();
	};

};