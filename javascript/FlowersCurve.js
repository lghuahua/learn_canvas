var FlowersCurve = function(opt){
  this.ctx = null
  this.center = []
  this.start = []
  this.p_rad = 0.001
  this.init(opt)
}

FlowersCurve.prototype = {
  init: function(opt){
    this.ra = parseInt(opt.ra) || 500
    this.rb = parseInt(opt.rb) || 300
    this.rc = parseInt(opt.rc) || 50
    this.color = opt.color
    this.ctx = opt.ctx
    // 设置圆心坐标
    var h = this.ctx.canvas.height/2 + 5
    var w = this.ctx.canvas.width/2 + 5
    this.center = [w,h]
    var p_step = parseInt(2*Math.PI/this.p_rad) + 1
    var g = gcd(this.rb,this.ra)
    var round = this.ra/g
    this.steps = round*p_step

    this.start = this.get_n_circle_point(this.center,this.ra,this.rb,this.rc,0)
    this.drawcurve(this.center,this.ra,this.rb,this.rc,this.p_rad)
  } ,

  drawline: function(p1,p2){
    this.ctx.beginPath()
    this.ctx.moveTo(p1[0],p1[1]);
    this.ctx.lineTo(p2[0],p2[1])
    this.ctx.strokeStyle=this.color;
    this.ctx.stroke();
  },

  drawcurve: function(center,ra,rb,rc,p_rad){
    var start = this.start
    for (var i = 0,end=[]; i <= this.steps; i++) {
      end = this.get_n_circle_point(center,ra,rb,rc,i*p_rad)
      this.drawline(start,end)
      start = end
    }
  },

  get_point: function(point,rc,radian){
    var x = rc*Math.sin(radian)
    var y = rc*Math.cos(radian)
    return [point[0] + x, point[1] + y]
  },

  get_n_circle_point: function(center,ra,rb,rc,rad){
    // 内圆圆心
    var center_b = this.get_point(center,ra-rb,rad)
    // 内圆弧度
    var n_rad = rad*(rb/ra)
    // 绕点坐标
    return this.get_point(center_b,rc,n_rad)
  },
  get_instance: function(p1,p2){
    return Math.pow(((p1[0] - p2[0])*(p1[0] - p2[0]) + (p1[1] - p2[1])*(p1[1] - p2[1])),0.5)
  }
}
// 大小齿轮的齿数之比，约为最简分数时，其分母就是小齿轮的自转数，也就是图案中的花瓣数。而分子就是小齿轮沿着大齿轮的公转数
function gcd(a,b){    
  if (b == 0){ 
    return a;  
  }

  var r = parseInt(a % b) ;   
  return gcd(b, r); 
}




