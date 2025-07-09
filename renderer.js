const app = new PIXI.Application({
  width: 480,
  height: 300,
  backgroundAlpha: 0,
});
document.body.appendChild(app.view);

const runBaseTexture = PIXI.BaseTexture.from('rin_sprite.png');
const runFrames = [];
const frameWidth = 1536 / 3 - 32;
const frameHeight = 1024;
for (let i = 0; i < 3; i++) {
  runFrames.push(new PIXI.Texture(runBaseTexture, new PIXI.Rectangle(i * frameWidth, 0, frameWidth, frameHeight)));
}

const sitTexture = PIXI.Texture.from('rin_pixel.png');

class AnimatedSprite {
  constructor(textures, frameRate = 6) {
    this.textures = textures;
    this.currentFrame = 0;
    this.frameRate = frameRate;
    this.frameCounter = 0;
    this.sprite = new PIXI.Sprite(textures[0]);
    this.isPlaying = true;
  }
  update() {
    if (this.isPlaying) {
      this.frameCounter++;
      if (this.frameCounter >= this.frameRate) {
        this.frameCounter = 0;
        this.currentFrame = (this.currentFrame + 1) % this.textures.length;
        this.sprite.texture = this.textures[this.currentFrame];
      }
    }
  }
  play() { this.isPlaying = true; }
  stop() { this.isPlaying = false; }
  setFrame(frame) {
    this.currentFrame = frame;
    this.sprite.texture = this.textures[frame];
  }
}

const animatedSprite = new AnimatedSprite(runFrames, 6);
const sprite = animatedSprite.sprite;
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;
sprite.scale.set(0.2);

app.stage.addChild(sprite);

const runScale = 0.2;
const sitScale = 0.09;

let isRunning = true;
let stopTimeout = null;
let speed = 2;

app.ticker.add(() => {
  if (isRunning) {
    animatedSprite.update();
    sprite.x += speed;

    if (sprite.x > app.screen.width - Math.abs(sprite.width / 2)) {
      speed = -Math.abs(speed);
      sprite.scale.set(-runScale, runScale);
      sprite.x = app.screen.width - Math.abs(sprite.width / 2);
    }
    if (sprite.x < Math.abs(sprite.width / 2)) {
      speed = Math.abs(speed);
      sprite.scale.set(runScale, runScale);
      sprite.x = Math.abs(sprite.width / 2);
    }

    if (Math.random() < 0.005 && !stopTimeout) {
      isRunning = false;
      animatedSprite.stop();
      sprite.texture = sitTexture;
      sprite.scale.set(sitScale * Math.sign(speed), sitScale);
      stopTimeout = setTimeout(() => {
        isRunning = true;
        sprite.texture = animatedSprite.textures[animatedSprite.currentFrame];
        sprite.scale.set(runScale * Math.sign(speed), runScale);
        animatedSprite.play();
        stopTimeout = null;
      }, 2000 + Math.random() * 2000);
    }
  }
});
