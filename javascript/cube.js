var Cube = function(opt){
  //存放所有点坐标
  this.dots = [];
  //存放面
  this.faces = [];
  this.init(opt);
};

Cube.prototype.init = function(opt) {
  this.xpos = opt.x;
  this.ypos = opt.y;
  this.zpos = opt.z;
  this.length = opt.length;
  // body...

  //初始化坐标点
  for(var i=0; i<8; i++){
    this.dots.push({x:0, y:0, z:0})
  }

  this.setVector();

  //初始化面
  this.faces.push([this.dots[0], this.dots[1], this.dots[3], this.dots[2]]);
  this.faces.push([this.dots[2], this.dots[3], this.dots[5], this.dots[4]]);
  this.faces.push([this.dots[4], this.dots[5], this.dots[7], this.dots[6]]);
  this.faces.push([this.dots[6], this.dots[7], this.dots[1], this.dots[0]]);
  this.faces.push([this.dots[1], this.dots[3], this.dots[5], this.dots[7]]);
  this.faces.push([this.dots[0], this.dots[2], this.dots[4], this.dots[6]]);
};

Cube.prototype.setVector = function(){
  var x = this.xpos; y = this.ypos; z = this.zpos;
  var len = this.length / 2;
  this.dot = [];
  this.dot.push(new Vector(x - len, y - len, z + len)); //0
  this.dot.push(new Vector(x - len, y + len, z + len)); //1
  this.dot.push(new Vector(x + len, y - len, z + len)); //2
  this.dot.push(new Vector(x + len, y + len, z + len)); //3
  this.dot.push(new Vector(x + len, y - len, z - len)); //4
  this.dot.push(new Vector(x + len, y + len, z - len)); //5
  this.dot.push(new Vector(x - len, y - len, z - len)); //6
  this.dot.push(new Vector(x - len, y + len, z - len)); //7
  this.dots = this.dot
}

Cube.prototype.drawFace = function(){
  this.faces.sort(function(a, b){
    var indexa = (a[0].z + a[1].z + a[2].z + a[3].z)/4;
    var indexb = (b[0].z + b[1].z + b[2].z + b[3].z)/4;
    return indexb - indexa;
  })
  this.faces.foreach(function(){
    if(!this.color){
      this.color = "rgba(" + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + "," + parseInt(getRandom(128, 255)) + ",1)";
    }
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this[0]._get2d().x, this[0]._get2d().y);
    ctx.lineTo(this[1]._get2d().x, this[1]._get2d().y);
    ctx.lineTo(this[2]._get2d().x, this[2]._get2d().y);
    ctx.lineTo(this[3]._get2d().x, this[3]._get2d().y);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  })
}

Cube.prototype.rotate = function(angleX, angleY){
  var xcos = Math.cos(angleX);
  var xsin = Math.sin(angleX);
  var ycos = Math.cos(angleY);
  var ysin = Math.sin(angleY);

  var x, y, z;
  var nx, ny, nz;
  var xa = 0, ya = 0, za = 0;

  //计算旋转后的所有点坐标位置
  this.dots.forEach(function(dot){
    x = dot.x;
    y = dot.y;
    z = dot.z;
    //绕X轴旋转
    ny = y * xcos - z * xsin;
    nz = z * xcos + y * xsin;
    //绕Y轴旋转
    nx = x * ycos - nz * ysin;
    nz = nz * ycos + x * ysin;
    dot.x = nx;
    dot.y = ny;
    dot.z = nz;
    xa += nx;
    ya += ny;
    za += nz;
  });
  //更新中心点坐标
  this.xpos = xa/this.dots.length;
  this.ypos = ya/this.dots.length;
  this.zpos = za/this.dots.length;
}

Array.prototype.foreach = function(callback){
  for(var i=0;i<this.length;i++){
   callback.apply(this[i])
  }
}

var Vector = function(x,y,z){
  this.x = x;
  this.y = y;
  this.z = z;
  this._get2d = function(){
     var scale = fallLength/(fallLength+this.z);
     var x = centerX + this.x*scale;
     var y = centerY + this.y*scale;
     return {x:x , y:y};
   }
}

var getRandom = function(a, b) {
  return Math.random() * (b - a) + a;
}