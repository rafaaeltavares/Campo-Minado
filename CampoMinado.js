
class CampoMinado{
    constructor(){
        this.board = new Board();
        this.bombs = 100;
        this.gameStatus = {
            PLAYING: color(255,0,0),
            VICTORY: color(0,255,0),
            LOST: color(0,0,255),
        }
        this.createStartButton();
        this.createSliderLevel();
        this.createCells();
        this.loadBombs();
        this.loadNears();
        this.bombs = this.bombs * this.sliderLevel.value();
        this.board.size = this.board.size * this.sliderLevel.value();
    }
    createSliderLevel(){
        this.sliderLevel = createSlider(1, 3, 1);
        this.sliderLevel.size(90)
    }
    createStartButton(){
        this.startButton = createButton('Começar');
        this.startButton.size(100,50);
        rect((this.board.margin / 2),(this.board.margin / 2),600);
        this.startButton.position((this.board.margin / 4) + 670 + this.board.margin, this.board.margin * 1.5);
        this.startButton.mousePressed(()=>{
            this.startGame();
        });
    }
    startGame(){
            this.status = this.gameStatus.PLAYING;
            this.createCells();
            this.loadBombs();
            this.loadNears();
    }

    showBombs(){
    this.cells.forEach(line =>{
        line.forEach(cell=>{
            if(!cell.open && cell.bomba) this.openCell(cell,true);
        })
    })    
    }

    click(x,y){
        if(this.status == this.gameStatus.PLAYING){
            if(x < this.board.size || x > this.board.size + this.clientWidth) return;
            if(y < this.board.size || y > this.board.size + this.clientHeight ) return;
            let w = this.board.clientWidth / this.board.size;
            let h = this.board.clientHeight / this.board.size;
            let cx = Math.trunc((x - this.board.margin) / w);
            let cy = Math.trunc((y - this.board.margin) / h);  
            if(cx < 0 || cy < 0 || cx >= this.size || cy >= this.size) return;
            let c = this.cells[cy][cx];
            this.openCell(c,true);
        }if(this.status == this.gameStatus.LOST){
            alert('Você perdeu, clique no começar para jogar novamente.');
            
        }
    }   
    openCell(cell,explode){
        if(cell.open) return;
        if(cell.bomba && !explode) return;
        cell.open = true;
        if(cell.bomba){
            this.showBombs();
            this.gameStatus.LOST;
            return;
        }
        if(cell.bombs == 0){
            cell.nears.forEach(nc =>{
                this.openCell(nc,false);
            })
        }
    }
    loadNears() {
        this.cells.forEach((line) => {
            line.forEach((cell) => {
                cell.nears = [];
                cell.bombs = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if (dx != 0 || dy != 0) {
                            let x = cell.x + dx;
                            let y = cell.y + dy;
                            if (x >= 0 && x < this.board.size && y >= 0 && y < this.board.size) {
                                let c = this.cells[y][x];
                                cell.nears.push(c);
                                cell.bombs += c.bomba;
                            }
                        }
                    }
                }
            });
        });
    }

    loadBombs(){
    let i = 0;
    while(i < this.bombs ){         
        let x = Math.floor(Math.random() * this.board.size);
        let y = Math.floor(Math.random() * this.board.size);
            if(this.cells[x][y].bomba == 0){
                this.cells[x][y].bomba = 1;
                i++;
            }       
        }   
    
    }

    createCells() {
        this.cells = [];
        for (let y = 0; y < this.board.size; y++) {
            let line = [];
            this.cells.push(line);
            for (let x = 0; x < this.board.size; x++) {
                let cell = new Cell(x, y,this.board);
                line.push(cell);
            }
        }
    }

    update() {
        if (this.status != this.gameStatus.PLAYING) return;
        let total = this.board.size * this.board.size;;
        let good = total - this.bombs;
        let open = 0;
        this.cells.forEach(line => {
            line.forEach(cell => {
                if (cell.open) {
                    open++;
                    if (cell.bomba) this.status = this.gameStatus.LOST;
                }
            })
        })
        if (this.status == this.gameStatus.LOST)return;
        if (good == open) {
            this.status = this.gameStatus.VICTORY;
            alert('Parabens você venceu!')
            this.openBombs();
        }
    }
    render(){
       this.board.render();
       this.cells.forEach(line=>{
        line.forEach(cell=>{
            cell.render();
        })
       })
   

    }
}