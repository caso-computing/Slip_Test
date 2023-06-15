
class Level extends Phaser.Scene
{
    constructor(key) {
        super(key);

        this.levelKey = key
        this.nextLevel = {
          'Level1': 'Level2',
          'Level2': 'Level3',
          'Level3': 'Level1',
          'Level4': 'Credits',
        }
        this.prevLevel={
            'Level1': 'Outro',
            'Level2': 'Level1',
            'Level3': 'Level2'
        }
      }
    movingPlatform;
    cursors;
    platforms;
    stars;
    player;
    jumps = 0;
    jumpText;


    preload ()
    {
        this.load.path = './assets/';
        this.load.image('sky', 'sky.png');
        this.load.image('ground', 'platform.png');
        this.load.image('star', 'star.png');
        this.load.spritesheet('dude', 'dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.image('bg3','snowdunes.png')
        this.load.spritesheet('campfire2','campfire.png',{ frameWidth: 32, frameHeight: 32}); 
        this.load.spritesheet('enemy','campfire.png',{ frameWidth: 32, frameHeight: 32});      
        this.load.audio('mars', 'Mars, the Bringer of War.ogg');
        this.load.audio('BGMusic','Succession (Main Title Theme) - Nicholas Britell  Succession (HBO Original Series Soundtrack).mp3');
        this.load.image('bg2', 'trees.png');
        this.load.image('enemyBullet', 'snowflake.png');
        this.load.image('snowflakes','snowflake.png');
    }
    create()
    {
        gameState.active=true;
        gameState.min=0;
        gameState.sec=0;
        gameState.jumps=0;
        gameState.stars=0;
        gameState.nextLevel=this.nextLevel[this.levelKey];
        gameState.levelKey=this.levelKey;
        const offSet= 650;


        //gameState.cursors = this.input.keyboard.createCursorKeys();

        // set up some "soothing" game background music from Holst

        gameState.bgMusic = this.sound.add('BGMusic');
        const music = gameState.bgMusic;
        music.stop();
        music.play({
            seek:5,
            loop: true
        });

        this.volBar=this.add.rectangle(600,600,800,80, 0x00ffff)
        this.slider=this.add.rectangle(600,600,80,160,0xffff00);
/*
        this.slider.setInteractive({draggable: true});

        this.input.on('drag', (plugin, gameObject, dragX,dragY) => {
            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragY = Phaser.Math.Clamp(dragY, 200, 1000);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.y = dragY;

        });
*/
        gameState.horizontal=false;
        setVolBar(this, this.slider,gameState.horizontal);
    }
    update()
    {
      if (gameState.horizontal){
        gameState.masterVol=(this.slider.x-200)/800
      }else {
        gameState.masterVol=(1000-this.slider.y)/800;
      }
      gameState.bgMusic.volume=gameState.masterVol;
    }
}

class Level1 extends Level {
    constructor() {
      super('Level1')
      

      this.weather = 'afternoon';
      this.top = false;
      this.bottom = true;
      this.drag = 1500;
      this.dudeX=170;
      this.dudeY=400;
    }
  }

  function setVolBar(scene, obj, horizontal) {
    console.log('It works B');

        obj.setInteractive({draggable: true});

        scene.input.on('drag', (plugin, gameObject, dragX,dragY) => {
          if (horizontal){
            dragX = Phaser.Math.Clamp(dragX, 200, 1000);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

          }else{
            //  By clamping dragY we can keep it within
            //  whatever bounds we need
            dragY = Phaser.Math.Clamp(dragY, 200, 1000);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.y = dragY;

          }
        });
  }
const gameState = {
    speed: 240,
    ups: 380,
    jumps: 0,
    stars: 0,
    enemyRot: .01,      //rotation amount of enemy shooter
    dudeX: 100,         //set starting x,y position of dude
    dudeFalling: false,
    nextLevel: 'Level4',
    masterVol: .5
  };
  
/*
  const config = {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    //type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    //backgroundColor: 0x880808,
    pixelArt: true,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            enableBody: true,
            debug: true
        }
    },
    scene: [Level1]
    
};
*/

//config from Connor's code
//
const config = {
  scale: {
      mode: Phaser.Scale.FIT,
      pixelArt: true,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 1920,
      height: 1080,
  },
  //backgroundColor: 0x132854,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        enableBody: true,
        debug: true
    }
},
  scene: [Level1],
  title: "Cinematic",
};

const game = new Phaser.Game(config);
