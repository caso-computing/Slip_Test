
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
        this.load.audio('mars', 'Mars, the Bringer of War.ogg')
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


        gameState.cursors = this.input.keyboard.createCursorKeys();

        // set up some "soothing" game background music from Holst

        gameState.bgMusic = this.sound.add('mars');
        const music = gameState.bgMusic;
        music.stop();
        music.play({
            seek:5
        });
        this.volBar=this.add.rectangle(400,300,100,10, 0x00ffff)
        this.slider=this.add.rectangle(400,300,10,10,0xffff00);

        this.slider.setInteractive({draggable: true});

        this.input.on('drag', (pointer,gameObject,dragX)=> {
            //  By clamping dragX we can keep it within
            //  whatever bounds we need
            dragX = Phaser.Math.Clamp(dragX, 350, 450);

            //  By only applying the dragX we can limit the drag
            //  to be horizontal only
            gameObject.x = dragX;

        });

    }
    update()
    {
      gameState.masterVol=(this.slider.x-350)/100;
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
  
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

const game = new Phaser.Game(config);
