////////////////////////////////////////////////////////////
// ==== in-out easing lib ====
// @author Gerard Ferrandez / http://www.dhteumeuleu.com/
// last update: Dec 12, 2012
// Released under the MIT license
// http://www.dhteumeuleu.com/LICENSE.html
////////////////////////////////////////////////////////////

"use strict";

var ge1doot = ge1doot || {};

ge1doot.Tweens = function () {
	var parent = this;
	this.tweens = [];
	this.iterate = function () {
		var i = 0, p;
		while ( p = this.tweens[i++] ) {
			p.ease();
		};
	}
	this.Add = function (steps, initValue, initValueTarget, isAngle) {
		this.target  = initValueTarget || 0;
		this.value   = initValue  || 0;
		this.steps   = steps;
		this.isAngle = isAngle || false;
		this.speedMod = 1;
		if (isAngle) {
			this.normalizePI = function () {
				if (Math.abs(this.target - this.value) > Math.PI) {
					if (this.target < this.value)  this.value -= 2 * Math.PI;
					else this.value += 2 * Math.PI;
				}
			};
		}
		this.setTarget(this.target);
		parent.tweens.push(this);
	}
	this.Add.prototype.setTarget = function (target, speedMod) {
		this.speedMod = (speedMod) ? speedMod : 1;
		this.target   = target;
		if (this.isAngle) {
			this.target = this.target % (2 * Math.PI);
			this.normalizePI();
		}
		if (this.running && this.oldTarget === target) return;
		this.oldTarget = target;
		this.running   = true;
		this.prog      = 0;
		this.from      = this.value;
		this.dist      = -(this.target - this.from) * 0.5;
	}
	this.Add.prototype.ease = function () {
		if (!this.running) return;
		var s = this.speedMod * this.steps;
		if (this.prog++ < s) {
			this.value = this.dist * (Math.cos(Math.PI * (this.prog / s)) - 1) + this.from;
			if (this.isAngle) this.normalizePI();
		} else {
			this.running = false;
			this.value = this.target;
		}
	}
}