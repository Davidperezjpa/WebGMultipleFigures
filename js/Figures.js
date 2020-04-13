function createCube(size, posx, posy, posz) {
	this.size = size;
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;

	this.vertices = [(1. + posx) * size, (1. + posy) * size, (1. + posz) * size,
		(-1. + posx) * size, (1. + posy) * size, (1. + posz) * size,
		(-1. + posx) * size, (-1. + posy) * size, (1. + posz) * size,
		(1. + posx) * size, (-1. + posy) * size, (1. + posz) * size,
		(1. + posx) * size, (-1. + posy) * size, (-1. + posz) * size,
		(1. + posx) * size, (1. + posy) * size, (-1. + posz) * size,
		(-1. + posx) * size, (1. + posy) * size, (-1. + posz) * size,
		(-1. + posx) * size, (-1. + posy) * size, (-1. + posz) * size,
	];

	this.indices = [0, 1, 2, 0, 2, 3, // Front face
		0, 3, 4, 0, 4, 5, // Right face
		0, 5, 6, 0, 6, 1, // Top face
		1, 6, 7, 1, 7, 2, // Left face
		7, 4, 3, 7, 3, 2, // Bottom face
		4, 7, 6, 4, 6, 5 // Back face
	];
};

function createSphere(radius, posx, posy, posz){
	this.indices =[];
	this.vertices =[];
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;
	var SPHERE_DIV = radius;
	//var SPHERE_DIV = 12;
	var i, ai, si, ci;
	var j, aj, sj, cj;
	var p1, p2;
	for (j = 0; j <= SPHERE_DIV; j++) 
	{
	  aj = j * Math.PI / SPHERE_DIV;
	  sj = Math.sin(aj);
	  cj = Math.cos(aj);
	  for (i = 0; i <= SPHERE_DIV; i++) 
	  {
		ai = i * 2 * Math.PI / SPHERE_DIV;
		si = Math.sin(ai);
		ci = Math.cos(ai);
		this.vertices.push(si * sj + posx);  // X
		this.vertices.push(cj + posy);       // Y
		this.vertices.push(ci * sj + posz);  // Z
	  }
	}
	for (j = 0; j < SPHERE_DIV; j++){
		for (i = 0; i < SPHERE_DIV; i++){
			p1 = j * (SPHERE_DIV+1) + i;
			p2 = p1 + (SPHERE_DIV+1);
			this.indices.push(p1);
			this.indices.push(p2);
			this.indices.push(p1 + 1);
			this.indices.push(p1 + 1);
			this.indices.push(p2);
			this.indices.push(p2 + 1);
		}
	}
}


function createPyramid(base, height, posx, posy, posz) {
	this.base = base;
	this.height = height;
	this.posx = posx;
	this.posy = posy;
	this.posz = posz;

	this.vertices = [ (-1.*base)+posx, (0.*base)+posy, (-1.*base)+posz,
		(-1.*base)+posx, (0.*base)+posy, (1.*base)+posz,
		(1.*base)+posx, (0.*base)+posy, (1.*base)+posz,
		(1.*base)+posx, (0.*base)+posy, (-1.*base)+posz,
		(0.*height)+posx, (1.*height)+posy, (0.*height)+posz
	];

	this.indices = [0, 1, 2, 3, 0, 4, 3, 2, 4, 1];
};