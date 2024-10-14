//MULTI COLOR ROTATING TRIANGLE

const verteXData = [
	0,1,0,	//v1 position
	1,-1,0,	//v2 position
	-1,-1,0	//v3 position
	];
	
	
	//BUILD ANOTHER BUFFER
	
	const colorData = [
	//Red 	Green	Blue
	0.8,	0.05	,0.7,
	0,		0.7		,1  ,
	0.5,	0.5		,0.5
	];
	
	const positionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
	
	const colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertexData),gl.STATIC_DRAW);
	
	
	const vertexShader = gl.createShader(gl.VERTEX_SHADER);
	gl.ShaderSource(vertexShader,`
	precision mediump float;
	
	
	attribute vec2 color;
	attribute vec3 position;
	varying vec3 vColor;
	
	void main(){
		vColor = color;
		gl_Position = vec4(position,1);
	}
	`);
	
	gl.compileShader(vertexShader);
	
	const fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(fragmentShader,`
	varying vec3 vColor;
	
	void main(){
	gl_Fragcolor(vColor,1);
	}
	`);
	
	gl.compileShader(fragmentShader);
	console.log(gl.getInfoLog(fragmentShader));
	
	const program = gl.createProgram();
	gl.attachShader(program,vertexShader);
	gl.attachShader(program,fragmentShader);
	
	gl.linkProgram(program);
	
	const positionLocation = gl.getAttributeLocation(program,`position`);
	gl.enableVertexAttribArray(positionLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER,positionBuffer);
	gl.vertexAttribPointer(positionLocation,gl.FLOAT,false,0,0);
	
	const colorLocation= gl.getAttributeLocation(program,`color`);
	gl.enableVertexAttribArray(colorLocation);
	gl.bindBuffer(gl.ARRAY_BUFFER,colorBuffer);
	gl.vertexAttribPointer(colorLocation,colorBuffer,gl.FLOAT,false,0,0);
	
	
	gl.useProgram(program);
	gl.drawArrays(gl.TRIANGLES,0,3);