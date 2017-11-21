// definition file for ragdollentine-line.html (apart again)
ge1doot.json = {
	shapes:{
		body:{
			width:80,
			height:60,
			shape:function(ctx) {
				ctx.moveTo(30,30);
				ctx.lineTo(50, 30);
				ctx.strokeStyle = "rgb(128,128,128)";
				ctx.lineWidth = 50;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		},
		body2:{
			width:80,
			height:80,
			shape:function(ctx) {
				ctx.moveTo(30,40);
				ctx.lineTo(50, 40);
				ctx.strokeStyle = "rgb(255,255,255)";
				ctx.lineWidth = 20;
				ctx.lineCap = 'round';
				ctx.stroke();
				ctx.moveTo(50,40);
				ctx.lineTo(80, 5);
				ctx.lineTo(80, 75);
				ctx.lineTo(50, 40);
				ctx.lineWidth = 5;
				ctx.lineCap = 'round';
				ctx.stroke();
				ctx.fillStyle = "rgb(255,255,255)";
				ctx.fill();
			}
		},
		shoulder:{
			width:60,
			height:30,
			shape:function(ctx) {
				ctx.moveTo(15,15);
				ctx.lineTo(45, 15);
				ctx.strokeStyle = "rgb(255,128,0)";
				ctx.lineWidth = 25;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		},
		shoulder2:{
			width:60,
			height:30,
			shape:function(ctx) {
				ctx.moveTo(15,15);
				ctx.lineTo(45, 15);
				ctx.strokeStyle = "rgb(0,101,203)";
				ctx.lineWidth = 15;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		},
		leg:{
			width:60,
			height:12,
			shape:function(ctx) {
				ctx.moveTo(6,6);
				ctx.lineTo(36, 6);
				ctx.strokeStyle = "rgb(255,255,255)";
				ctx.lineWidth = 12;
				ctx.lineCap = 'round';
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(54, 6, 9, Math.PI/2, -Math.PI/2);
				ctx.fillStyle = "rgb(255,128,0)";
				ctx.fill();
				ctx.closePath();
			}
		},
		leg2:{
			width:60,
			height:12,
			shape:function(ctx) {
				ctx.moveTo(6,6);
				ctx.lineTo(36, 6);
				ctx.strokeStyle = "rgb(255,255,255)";
				ctx.lineWidth = 12;
				ctx.lineCap = 'round';
				ctx.stroke();
				ctx.beginPath();
				ctx.arc(54, 6, 9, Math.PI/2, -Math.PI/2);
				ctx.fillStyle = "rgb(0,101,203)";
				ctx.fill();
				ctx.closePath();
			}
		},
		chain:{
			width:20,
			height:3,
			shape:function(ctx) {
				ctx.moveTo(2,2);
				ctx.lineTo(18, 2);
				ctx.strokeStyle = "rgb(255,255,255)";
				ctx.lineWidth = 3;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		},
		tie:{
			width:60,
			height:10,
			shape:function(ctx) {
				ctx.moveTo(4,5);
				ctx.lineTo(56, 5);
				ctx.strokeStyle = "rgb(64,64,64)";
				ctx.lineWidth = 8;
				ctx.lineCap = 'round';
				ctx.stroke();
			}
		},
		head:{
			width:50,
			height:50,
			shape:function(ctx) {
				ctx.beginPath();
				ctx.arc(25, 25, 25, 0, 2 * Math.PI);
				ctx.fillStyle = 'rgb(255,255,255)';
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				ctx.arc(16, 25, 9, Math.PI/2, -Math.PI/2);
				ctx.fillStyle = "rgb(255,128,0)";
				ctx.fill();
				ctx.closePath();
			}
		},
		head2:{
			width:50,
			height:50,
			shape:function(ctx) {
				ctx.beginPath();
				ctx.arc(25, 25, 25, 0, 2 * Math.PI);
				ctx.fillStyle = 'rgb(255,255,255)';
				ctx.fill();
				ctx.closePath();
				ctx.beginPath();
				ctx.globalCompositeOperation = 'destination-out';
				ctx.moveTo(10,50);
				ctx.lineTo(20, 25);
				ctx.lineTo(20, 50);
				ctx.lineTo(10, 50);
				ctx.fillStyle = "rgb(255,255,255)";
				ctx.fill();
				ctx.closePath();
			}
		},
		love:{
			width:80,
			height:80,
			shape:function(ctx) {
				var x = 0;
				var y = 0;
				var h = 80;
				var w = 80;
				var y0 = x + 0.5 * w, x0 = y + 0.3 * h;
				var y1 = x + 0.1 * w, x1 = y + 0.0 * h;
				var y2 = x + 0.0 * w, x2 = y + 0.6 * h;
				var y3 = x + 0.5 * w, x3 = y + 0.9 * h;
				var y4 = x + 1.0 * w, x4 = y + 0.6 * h;
				var y5 = x + 0.9 * w, x5 = y + 0.0 * h;
				ctx.beginPath();
				ctx.moveTo(x0,y0);
				ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
				ctx.bezierCurveTo(x4,y4,x5,y5,x0,y0);
				ctx.fillStyle = "rgb(255,0,0)";
				ctx.fill();
				ctx.closePath();	
			}
		}
	},
	ragdolls:[
		{
			name: "man",
			points: [
				{x:0,y:-10},   // 0
				{x:0,y:-40},   // 1 head
				{x:-20,y:0},   // 2 body
				{x:-10,y:70},  // 3
				{x:10,y:70},   // 4
				{x:20,y:0},    // 5
				{x:-20,y:140}, // 6 left leg
				{x:-20,y:200}, // 7
				{x:20,y:140},  // 8 right leg
				{x:20,y:200}, // 9
				{x:-60,y:0},   // 10 left arm
				{x:-120,y:0,linkIn:true},  // 11
				{x:60,y:0},   // 12 right arm
				{x:120,y:0,linkOut:true},  // 13
				{x:0,y:80},   // 14 end body
				{x:0,y:15},   // 15
				{x:0,y:60}    // 16
			],
			links: [
				{p0:0,p1:14,shape:"body",d0:0, d1:0},
				{p0:15,p1:1,shape:"head", d0:-25, d1:20},
				{p0:2,p1:10,shape:"shoulder",d0:0, d1:0},
				{p0:5,p1:12,shape:"shoulder",d0:0, d1:0},
				{p0:3,p1:6,shape:"shoulder",d0:0, d1:0},
				{p0:4,p1:8,shape:"shoulder",d0:0, d1:0},
				{p0:10,p1:11,shape:"leg",d0:0, d1:0},
				{p0:12,p1:13,shape:"leg",d0:0, d1:0},
				{p0:6,p1:7,shape:"leg",d0:0, d1:0},
				{p0:8,p1:9,shape:"leg",d0:0, d1:0},
				{p0:15,p1:16,shape:"tie",d0:0, d1:0},
				{p0:2,p1:4},
				{p0:2,p1:3},
				{p0:3,p1:4},
				{p0:2,p1:5},
				{p0:3,p1:5},
				{p0:5,p1:4},
				{p0:3,p1:14},
				{p0:14,p1:4},
				{p0:2,p1:0},
				{p0:0,p1:5},
				{p0:1,p1:14, f:0.1},
				{p0:2,p1:15},
				{p0:5,p1:15},
				{p0:15,p1:14},
				{p0:6,p1:8, f:0.0025}
			]
		},
		{
			name: "lady",
			points: [
				{x:0,y:0},   // 0
				{x:0,y:-40},  // 1
				{x:0,y:80},  // 2
				{x:0,y:10},  // 3
				{x:0,y:60},  // 4
				{x:0,y:100, linkIn:true},  // 5
				{x:0,y:60},  // 6
				{x:0,y:100}, // 7
				{x:-30,y:-40}, // 8
				{x:30,y:-40}, // 9
				{x:0,y:140},  // 10
				{x:0,y:200}, // 11
				{x:0,y:140}, // 12
				{x:0,y:200,linkOut:true},// 13
				{x:0,y:80,m:0.1},
				{x:0,y:60,m:0.1},
				{x:0,y:40,m:0.1},
				{x:0,y:20,m:0.1},
				{x:0,y:0,m:0.1},
				{x:0,y:-20,m:0.1},
				{x:0,y:-40,m:0.1},
				{x:0,y:-60,m:0.1},
				{x:0,y:-80,m:0.1},
				{x:0,y:-100,m:0.1},
				{x:0,y:-120,m:0.1, fly:1} // 24
				
				
			],
			links: [
				{p0:3,p1:6,shape:"shoulder2", d0:0, d1:0},
				{p0:6,p1:7,shape:"leg2", d0:0, d1:0},
				{p0:2,p1:10,shape:"shoulder2", d0:0, d1:0},
				{p0:10,p1:11,shape:"leg2", d0:0, d1:0},
				{p0:2,p1:12,shape:"shoulder2", d0:0, d1:0},
				{p0:12,p1:13,shape:"leg2", d0:0, d1:0},
				{p0:0,p1:2,shape:"body2",d0:20, d1:20},
				{p0:0,p1:1,shape:"head2", d0:0, d1:10},
				{p0:3,p1:4,shape:"shoulder2", d0:0, d1:0},
				{p0:4,p1:5,shape:"leg2", d0:0, d1:0},
				{p0:3,p1:0},
				{p0:3,p1:2},
				{p0:2,p1:8},
				{p0:2,p1:9},
				{p0:8,p1:0},
				{p0:9,p1:0},
				{p0:8,p1:9},
				{p0:8,p1:1, f:0.02},
				{p0:1,p1:9, f:0.02},
				{p0:7,p1:14,shape:"chain"},
				{p0:14,p1:15,shape:"chain"},
				{p0:15,p1:16,shape:"chain"},
				{p0:16,p1:17,shape:"chain"},
				{p0:17,p1:18,shape:"chain"},
				{p0:18,p1:19,shape:"chain"},
				{p0:19,p1:20,shape:"chain"},
				{p0:20,p1:21,shape:"chain"},
				{p0:21,p1:22,shape:"chain"},
				{p0:22,p1:23,shape:"chain"},
				{p0:24,p1:23,shape:"love"}
			]
		}
	]
};