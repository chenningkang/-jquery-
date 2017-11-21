////////////////////////////////////////////////////////////
// ==== HTML5 CANVAS transform Image ====
// @author Gerard Ferrandez / http://www.dhteumeuleu.com/
// last update: Nov 14, 2012
// Released under the MIT license
// http://www.dhteumeuleu.com/LICENSE.html
////////////////////////////////////////////////////////////

"use strict";

var ge1doot = ge1doot || {};

ge1doot.transform = {};

// ==== triangle constructor ====
ge1doot.transform.Triangle = function (parent, p0, p1, p2) {
	this.p0 = p0;
	this.p1 = p1;
	this.p2 = p2;
	this.next = false;
	// ---- pre calculation for transform----
	this.d    = p0.tx * (p2.ty - p1.ty) - p1.tx * p2.ty + p2.tx * p1.ty + (p1.tx - p2.tx) * p0.ty;
	this.pmy  = p1.ty - p2.ty;
	this.pmx  = p1.tx - p2.tx;
	this.pxy  = p2.tx * p1.ty - p1.tx * p2.ty;
	// ---- link for iteration ----
	if (!parent.firstTriangle) parent.firstTriangle = this; else parent.prev.next = this;
	parent.prev = this;
};

// ==== image constructor ====
ge1doot.transform.Image = function (imgSrc, lev, callback) {
	this.canvas        = ge1doot.screen;
	this.ctx           = this.canvas.ctx;
	this.pointer       = ge1doot.pointer;
	this.texture       = new Image();
	this.texture.src   = imgSrc;
	this.lev           = lev || 1;
	this.isLoading     = true;
	this.firstPoint    = false;
	this.firstTriangle = false;
	this.prev          = false;
	this.callback      = callback;
};

// ==== loading prototype ====
ge1doot.transform.Image.prototype.loading = function () {
	if (this.texture.complete && this.texture.width) {
		this.isLoading = false;
		var points = [];
		// ---- create points ----
		for (var i = 0; i <= this.lev; i++) {
			for (var j = 0; j <= this.lev; j++) {
				var tx = (i * (this.texture.width / this.lev));
				var ty = (j * (this.texture.height / this.lev));
				var p = {
					tx: tx,
					ty: ty,
					nx: tx / this.texture.width,
					ny: ty / this.texture.height,
					next: false
				};
				points.push(p);
				if (!this.firstPoint) this.firstPoint = p; else this.prev.next = p;
				this.prev = p;
			}
		}
		var lev = this.lev + 1;
		for (var i = 0; i < this.lev; i++) {
			for (var j = 0; j < this.lev; j++) {
				// ---- up ----
				var t = new ge1doot.transform.Triangle(this, 
					points[j + i * lev],
					points[j + i * lev + 1],
					points[j + (i + 1) * lev]
				);
				// ---- down ----
				var t = new ge1doot.transform.Triangle(this,
					points[j + (i + 1) * lev + 1],
					points[j + (i + 1) * lev],
					points[j + i * lev + 1]
				);
			}
		}
		// ---- isLoaded callback ---
		this.callback && this.callback.isLoaded && this.callback.isLoaded(this);
	}
};
// ==== transform prototype ====
ge1doot.transform.Image.prototype.transform = function (p0, p1, p2, p3) {
	// ---- loading ----
	if (this.isLoading) {
		this.loading();
		// ---- show wireframe ----
		if (this.stroke) {
			this.isPointerInside(0, 0, p0, p1, p2, p3);
			this.ctx.strokeStyle = this.stroke;
			this.ctx.lineWidth = 1;
			this.ctx.stroke();
		}
		return false;
	} else {
		// ---- project points ----
		var p = this.firstPoint;
		do {
			var mx = p0.X + p.ny * (p3.X - p0.X);
			var my = p0.Y + p.ny * (p3.Y - p0.Y);
			p.px = (mx + p.nx * (p1.X + p.ny * (p2.X - p1.X) - mx));
			p.py = (my + p.nx * (p1.Y + p.ny * (p2.Y - p1.Y) - my));
		} while ( p = p.next );
		// ---- draw triangles ----
		var w = this.canvas.width;
		var h = this.canvas.height;
		var t = this.firstTriangle;
		do {
			var p0 = t.p0;
			var p1 = t.p1;
			var p2 = t.p2;
			// ---- centroid ----
			var xc = (p0.px + p1.px + p2.px) / 3;
			var yc = (p0.py + p1.py + p2.py) / 3;
			// ---- clipping ----
			var isTriangleVisible = true;
			if (xc < 0 || xc > w || yc < 0 || yc > h) {
				if (Math.max(p0.px, p1.px, p2.px) < 0 || Math.min(p0.px, p1.px, p2.px) > w || Math.max(p0.py, p1.py, p2.py) < 0 || Math.min(p0.py, p1.py, p2.py) > h) {
					isTriangleVisible = false;
				}
			}
			if (isTriangleVisible) {
				var dx, dy, d;
				this.ctx.save();
				this.ctx.beginPath();
				// ---- draw non anti-aliased triangle ----
				dx = xc - p0.px;
				dy = yc - p0.py;
				d = Math.max(Math.abs(dx), Math.abs(dy));
				this.ctx.moveTo(p0.px - 2 * (dx / d), p0.py - 2 * (dy / d));
				dx = xc - p1.px;
				dy = yc - p1.py;
				d = Math.max(Math.abs(dx), Math.abs(dy));
				this.ctx.lineTo(p1.px - 2 * (dx / d), p1.py - 2 * (dy / d));
				dx = xc - p2.px;
				dy = yc - p2.py;
				d = Math.max(Math.abs(dx), Math.abs(dy));
				this.ctx.lineTo(p2.px - 2 * (dx / d), p2.py - 2 * (dy / d));
				this.ctx.closePath();
				// ---- show wireframe ----
				if (this.stroke) {
					this.ctx.strokeStyle = this.stroke;
					this.ctx.lineWidth = 1;
					this.ctx.stroke();
				}
				// ---- clip ----
				this.ctx.clip();
				// ---- texture mapping ----
				this.ctx.transform(
					-(p0.ty * (p2.px - p1.px) -  p1.ty * p2.px  + p2.ty *  p1.px + t.pmy * p0.px) / t.d, // m11
					 (p1.ty *  p2.py + p0.ty  * (p1.py - p2.py) - p2.ty *  p1.py - t.pmy * p0.py) / t.d, // m12
					 (p0.tx * (p2.px - p1.px) -  p1.tx * p2.px  + p2.tx *  p1.px + t.pmx * p0.px) / t.d, // m21
					-(p1.tx *  p2.py + p0.tx  * (p1.py - p2.py) - p2.tx *  p1.py - t.pmx * p0.py) / t.d, // m22
					 (p0.tx * (p2.ty * p1.px  -  p1.ty * p2.px) + p0.ty * (p1.tx *  p2.px - p2.tx  * p1.px) + t.pxy * p0.px) / t.d, // dx
					 (p0.tx * (p2.ty * p1.py  -  p1.ty * p2.py) + p0.ty * (p1.tx *  p2.py - p2.tx  * p1.py) + t.pxy * p0.py) / t.d  // dy
				);
				this.ctx.drawImage(this.texture, 0, 0);
				this.ctx.restore();
			}
		} while ( t = t.next );
		return true;
	}
}
// ==== isPointerInside prototype ====
ge1doot.transform.Image.prototype.isPointerInside = function (x, y, p0, p1, p2, p3) {
	this.ctx.beginPath();
	this.ctx.moveTo(p0.X, p0.Y);
	this.ctx.lineTo(p1.X, p1.Y);
	this.ctx.lineTo(p2.X, p2.Y);
	this.ctx.lineTo(p3.X, p3.Y);
	this.ctx.closePath();
	return this.ctx.isPointInPath(x, y);
}