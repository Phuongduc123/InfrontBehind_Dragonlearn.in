
class Scene1 extends Phaser.Scene{
    constructor(){
        super("game1");
        this.drag_X = 400;
        this.drag_Y = 500;
        this.drop_X = 700;
        this.drop_Y = 300;
        this.check;
        this.changeScene;
    }
    preload(){
        this.load.image('next','image/back_icon.png');
        this.load.image('drag', 'image/35.png');
        this.load.image('drop', 'image/53.png');
    }
    create(){
        this.add.text(20,20,"Loading game1...");

        //create and display items to canvas
        this.sprite = this.add.sprite(700, 500, 'next').setInteractive();
        this.sprite.setScale(0.2);
        this.sprite.setVisible(false);
        //declare a this reference for convinient
        var ref = this;
        this.sprite.angle = 180;
        
        this.drop = this.physics.add.sprite(this.drop_X ,this.drop_Y,'drop');
        this.drag = this.physics.add.sprite(this.drag_X ,this.drag_Y,'drag').setInteractive();

        //set physics of the ball
        this.drag.setCollideWorldBounds(true);

        //allow items to be dragged
        this.input.setDraggable(this.drag);

        //invoke when start to drag
        this.input.on('dragstart', function (pointer,gameObject) {});

        //invoke when dragging
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        //invoke when release the dragging items
        this.input.on('dragend', function () {
            //create animation to return to original pos if invalid drop
            this.animation(this,this.drag_X,this.drag_Y);

            //overlapping process: ****NEED TO MODIFY THIS SHIT RIGHT AWAY****
            var ref = this;
            setTimeout(function(){ref.check = ref.physics.add.overlap(ref.drag,ref.drop,ref.callback,null,ref)},0);
        },ref);
     
        this.sprite.on('pointerdown', function (pointer) {
            console.log("click");
            console.log(ref);
            ref.scene.start("game2");
            
        });
    }
    animation(ref,pos_x,pos_y){
        var timeline = ref.tweens.createTimeline();
                timeline.add({
                    targets: ref.drag,
                    x: pos_x,
                    y: pos_y,
                    ease: 'Power1',
                    duration: 1000
                });
                timeline.play();
    }
    callback(){
        //set object to unDraggable
        this.input.setDraggable(this.drag,false);

        //deactivate drop area so it cant be multiple time overlapping
        this.check.active = false;

        //create animation to place to exact pos
        this.animation(this,this.drop_X+100,this.drop_Y);
        var ref = this;
        
        //set visible next button
        setTimeout(function(){ref.sprite.setVisible(true);},2000);

        console.log("end callback");
    }  
}