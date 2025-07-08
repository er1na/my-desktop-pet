// PIXI.jsはCDNから読み込まれているので、グローバル変数として使用

const app = new PIXI.Application({
  width: 128,
  height: 400,
  backgroundAlpha: 0,
  antialias: true,
  resolution: 1,
});
document.body.appendChild(app.view);

PIXI.Assets.load('./rin_pixel.png')
  .then((texture) => {
    console.log('画像の読み込みが完了しました');
    
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.x = 64;
    sprite.y = 200;
    
    sprite.scale.set(0.1);
    sprite.interactive = true;
    sprite.buttonMode = true;
    sprite.cursor = 'pointer';

    sprite.on('pointerdown', (event) => {
      event.stopPropagation();
      if (isOnGround) {
        velocity = -10;
        isOnGround = false;
      }
    });
    
    app.stage.addChild(sprite);
    
    let velocity = 0;
    let gravity = 0.6;
    let baseY = 200;
    let isOnGround = true;
    
    app.ticker.add(() => {
      if (isOnGround) {
   
        if (Math.random() < 0.02) {
          velocity = -6;
          isOnGround = false;
        }
      } else {

        velocity += gravity;
        sprite.y += velocity;
        
        if (sprite.y >= baseY) {
          sprite.y = baseY;
          velocity = 0;
          isOnGround = true;
        }
        
        if (sprite.y < 50) {
          sprite.y = 50;
          velocity = 0;
        }
      }
      if (isOnGround && velocity > 0) {
        velocity = -velocity * 0.3;
        if (Math.abs(velocity) < 1) {
          velocity = 0;
        }
      }
    });
  })
  .catch((error) => {
    console.error('画像の読み込みに失敗しました:', error);
  });
