// PIXI.jsはCDNから読み込まれているので、グローバル変数として使用

const app = new PIXI.Application({
  width: 480,
  height: 300,
  backgroundAlpha: 0,
});
document.body.appendChild(app.view);

const frameWidth = 1536 / 3 - 30;
const frameHeight = 1024;
const frames = [];
const baseTexture = PIXI.BaseTexture.from('rin_sprite.png');

for (let i = 0; i < 3; i++) {
  const x = i * frameWidth;
  const y = 0;
  frames.push(new PIXI.Texture(baseTexture, new PIXI.Rectangle(x, y, frameWidth, frameHeight)));
}

// アニメーションスプライトのクラス
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

const animatedSprite = new AnimatedSprite(frames, 6);
const sprite = animatedSprite.sprite;
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 3 - 10;
sprite.y = app.screen.height / 2;
sprite.scale.set(0.2);

app.stage.addChild(sprite);

app.ticker.add(() => {
  animatedSprite.update();
});
