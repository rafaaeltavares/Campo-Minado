class Cell{
    constructor(x,y,board) {
        this.x = x;
        this.y = y;
        this.board = board;
        this.bomba = 0;
        this.open = false;
    }
    render(){
        stroke(204, 204, 204);
        strokeWeight(5);
        fill(128, 128, 128);
        let w = this.board.clientWidth / this.board.size;
        let hei  = this.board.clientHeight/ this.board.size;
        let px = this.x * w + this.board.margin;
        let py = this.y * hei + this.board.margin;
        rect(this.x * w + this.board.margin, this.y * hei + this.board.margin, w, hei);
        
        if(this.open){ 
            stroke(217, 217, 217);
            strokeWeight(2);
            fill(166, 166, 166);
            rect(this.x * w + this.board.margin, this.y * hei + this.board.margin, w, hei);
            if(this.bomba == 1){
                stroke(0);
                strokeWeight(5)
                fill(255,0,0);
                circle(px + w / 2,  py + hei / 2, w / 2);

            }else{
                if(this.bombs > 0){            
                    if(this.bombs == 1){
                        this.basicFormat(w,hei,px,py,"green");
                    }if(this.bombs == 2){
                        this.basicFormat(w,hei,px,py,'blue');
                    }if(this.bombs > 2){
                        this.basicFormat(w,hei,px,py,"red");
                    }
                }
            }
        
        
        }
    }
    basicFormat(w,hei,px,py, COLOR){
        textSize(w);
        strokeWeight(2);
        fill(COLOR);
        stroke(COLOR);
        text(this.bombs, px + (w/4),py + hei * 0.9)
    }
}