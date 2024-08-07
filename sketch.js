// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint,
    Composite = Matter.Composite,
    Constraint = Matter.Constraint;


var mouse
var ball
var engine;
var canvas
var constraint
var pockets = []
var cushions = []
var balls = []
var cueBall
var greenBall
var brownBall
var blueBall
var pinkBall
var blackBall
var yellowBall
var stick
var maxVelocity = 10
var isLoose = true
var coloredBallsInPacket = 0
function setup() {
    canvas = createCanvas(1100, 550);
    background(0, 255, 0);
    // create an engine
    engine = Engine.create();
    engine.world.gravity.y = 0;
    engine.world.gravity.x = 0;


    // pockets
    pockets = [
        Bodies.circle(30*0.75, 30*0.75, 10, {isStatic: true,label: 'pocket'}),
        Bodies.circle(width/2, 15, 10, {isStatic: true,label: 'pocket'}),
        Bodies.circle(width-30*0.75, 30*0.75, 10, {isStatic: true,label: 'pocket'}),
        Bodies.circle(width-30*0.75, height-30*0.75, 10, {isStatic: true,label: 'pocket'}),
        Bodies.circle(width/2, height-15, 10, {isStatic: true,label: 'pocket'}),
        Bodies.circle(30*0.75, height-30*0.75, 10, {isStatic: true,label: 'pocket'}),

    ]
    Composite.add(engine.world, pockets)

    // red balls
    var redBallOptions = {friction: 0.02, frictionAir: 0.021,restitution: 0.8,isStatic: false,label: 'redBall'}
    balls =[
        Bodies.circle(825, 275, 8, redBallOptions),

        Bodies.circle(825+8*2, 275+8, 8,redBallOptions),
        Bodies.circle(825+8*2, 275-8, 8,redBallOptions),

        Bodies.circle(825+8*4, 275, 8,redBallOptions),
        Bodies.circle(825+8*4, 275-8*2, 8,redBallOptions),
        Bodies.circle(825+8*4, 275+8*2, 8,redBallOptions),

        Bodies.circle(825+8*6, 275+8, 8,redBallOptions),
        Bodies.circle(825+8*6, 275-8, 8,redBallOptions),
        Bodies.circle(825+8*6, 275+8*3, 8,redBallOptions),
        Bodies.circle(825+8*6, 275-8*3, 8,redBallOptions),

        Bodies.circle(825+8*8, 275, 8,redBallOptions),
        Bodies.circle(825+8*8, 275-8*2, 8,redBallOptions),
        Bodies.circle(825+8*8, 275+8*2, 8,redBallOptions),
        Bodies.circle(825+8*8, 275-8*4, 8,redBallOptions),
        Bodies.circle(825+8*8, 275+8*4, 8,redBallOptions),
    ]
    Composite.add(engine.world, balls)

    //cue ball
    cueBall = Bodies.circle(width/5-40, 275, 8, {friction: 0.02, frictionAir: 0.02,restitution: 0.8,isStatic: false,label: 'cueBall'})
    greenBall = Bodies.circle(width/5, height/2-75, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width/5, y: height/2-75}})
    brownBall = Bodies.circle(width/5, height/2, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width/5, y: height/2}})
    yellowBall = Bodies.circle(width/5, height/2+75, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width/5, y: height/2+75}})
    blueBall = Bodies.circle(width/2, height/2, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width/2, y: height/2}})
    pinkBall = Bodies.circle(width*0.75-8*2, height/2, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width*0.75-8*2, y: height/2}})
    blackBall = Bodies.circle(width*0.9, height/2, 8, {restitution: 0.8,isStatic: false,label: 'coloredBall',initialPosition: {x: width*0.9, y: height/2}})


    Composite.add(engine.world, [cueBall, greenBall, brownBall, blueBall, pinkBall, blackBall, yellowBall])
    stick = new Stick(cueBall.position.x, cueBall.position.y, 150);

    // cushions with bouncing effect
    var cushionOptions = { isStatic: true, restitution: 0.8,label: 'cushion'}
    cushions = [
        Bodies.fromVertices( 283,20,[
            { x: 0, y: 0 },
            { x: 505, y: 0 },
            { x: 15, y: 10 },
            { x: 495, y: 10 }
        ], cushionOptions, true),
        Bodies.fromVertices( 817,20,[
            { x: 0, y: 0 },
            { x: 505, y: 0 },
            { x: 10, y: 10 },
            { x: 490, y: 10 }
        ], cushionOptions, true),
        Bodies.fromVertices( 283,height-20,[
            { x: 0, y: 10 },
            { x: 505, y: 10 },
            { x: 495, y: 0 },
            { x: 15, y: 0 }
        ], cushionOptions, true),
        Bodies.fromVertices( 817,height-20,[
            { x: 0, y: 10 },
            { x: 505, y: 10 },
            { x: 490, y: 0 },
            { x: 10, y: 0 }
        ], cushionOptions, true),
        Bodies.fromVertices( 20,275,[
            { x: 0, y: 0 },
            { x: 0, y: 490 },
            { x: 10, y: 475 },
            { x: 10, y: 15 }
        ], cushionOptions, true),
        Bodies.fromVertices( width-20,275,[
            { x: 10, y: 0 },
            { x: 10, y: 490 },
            { x: 0, y: 475 },
            { x: 0, y: 15 }
        ], cushionOptions, true),
    ]
    Composite.add(engine.world, cushions)

    // Listen for the engine's afterUpdate event
    Matter.Events.on(engine, 'afterUpdate',setMaxVelocity );
    Matter.Events.on(engine, 'collisionStart', handleCollision);




}

function draw() {
    background(17, 133, 4)
    Engine.update(engine)
    drawTable()
    drawBalls(balls)
    drawPockets(pockets)
    drawCushions(cushions)

    if(isLoose){
        Matter.Body.setPosition(cueBall, {x: mouseX, y: mouseY})
    }
    drawBall(cueBall,[255, 255, 255])
    if (mouseIsPressed) {
        stick.update(cueBall.position);
        stick.draw();
    }
     // draw colored balls
    drawBall(greenBall,[0, 255, 0])
    drawBall(brownBall,[139, 69, 19])
    drawBall(blueBall,[0, 0, 255])
    drawBall(pinkBall,[224, 43, 158])
    drawBall(blackBall,[0, 0, 0])
    drawBall(yellowBall,[255, 255, 0])

    fill(255)




}



function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}

function mousePressed() {
    print('mouse pressed')
    if(isLoose){
        let mousePosition = createVector(mouseX, mouseY);
        let dCenter = createVector(width/5, height/2);
        let distance = p5.Vector.dist(mousePosition, dCenter);
        if( mouseX < width/5 && distance <75){
            isLoose = false
        }

    }
}
function mouseReleased() {
    console.log("Mouse button was released");
    stick.hitBall(cueBall)
}



function drawTable() {
    push()
    // yellow boxes
    fill(252, 242, 38)
    rect(0, 0, 30, 30)
    rect(535, 0, 30, 15)
    rect(1070, 0, 30, 30)
    rect(width-30, height-30, 30, 30)
    rect(535, height-15, 30, 15)
    rect(0, height-30, 30, 30)

    // brown boxes
    fill(77, 46, 8)
    rect(30, 0, 505, 15)
    rect(565, 0, 505, 15)
    rect(1085, 30, 15, 490)
    rect(565, height-15, 505, 15)
    rect(30, height-15, 505, 15)
    rect(0, 30, 15, 490)
    pop()


    push()
    stroke(255);
    strokeWeight( 5);
    line(width/5, 25,width/5, height-25);
    // the arc for the D
    noFill(); // This will make the arc empty from the inside
    stroke(255); // Set the stroke color for the arc
    strokeWeight(5);
    arc(width/5, height/2, 150, 150, PI/2, 3*PI/2);
    pop()
}

function drawPockets(pockets){
    push()
    // Set fill color for pockets, e.g., black
    fill(0)
    pockets.forEach(pocket => {

        ellipse(pocket.position.x, pocket.position.y, pocket.circleRadius * 2);
    })
    pop()
}
function drawCushions(cushions) {
    push()
    fill(7, 69, 11)
    cushions.forEach(cushion => {
        drawVertices(cushion.vertices)
    })
    pop()
}
function drawBalls(balls) {
    push()
    // Set fill color for pockets, e.g., black
    fill(255,0,0)
    balls.forEach(ball => {

        ellipse(ball.position.x, ball.position.y, ball.circleRadius * 2);
    })
    pop()
}
function drawBall(ball, color ) {
    push()
    // Set fill color for pockets, e.g., black
    fill(color[0], color[1], color[2])
    ellipse(ball.position.x, ball.position.y, ball.circleRadius * 2);
    pop()
}


function handleCollision(event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        var bodyA = pair.bodyA;
        var bodyB = pair.bodyB;

        // red ball in packet
        if (bodyA.label === 'redBall' && bodyB.label === 'pocket') {
            // remove the red ball from the world
            Composite.remove(engine.world, bodyA)
            // remove the red ball from the balls array to update canvas
            balls = balls.filter(ball => ball !== bodyA);
            // Matter.Body.setPosition(bodyA, defaultPosition);
            // Matter.Body.setVelocity(bodyA, { x: 0, y: 0 });
        }
        if (bodyB.label === 'redBall' && bodyA.label === 'pocket') {
            // remove the red ball from the world
            Composite.remove(engine.world, bodyB)
            // remove the red ball from the balls array to update canvas
            balls = balls.filter(ball => ball !== bodyB);
            // Matter.Body.setPosition(bodyB, bodyB.defaultPosition);
            // Matter.Body.setVelocity(bodyB, { x: 0, y: 0 });
        }

        // colored ball in packet
        if (bodyA.label === 'coloredBall' && bodyB.label === 'pocket') {
            // going to the initial position
            Matter.Body.setPosition(bodyA, BodyA.initialPosition);
            Matter.Body.setVelocity(bodyA, { x: 0, y: 0 });
            if(coloredBallsInPacket ==0){
                coloredBallsInPacket+=1
            }else{
                print('error : 2 colored balls has entered the pocket')
            }
        }
        if (bodyB.label === 'coloredBall' && bodyA.label === 'pocket') {
            // going to the initial position
            Matter.Body.setPosition(bodyB, bodyB.initialPosition);
            Matter.Body.setVelocity(bodyB, { x: 0, y: 0 });
            if(coloredBallsInPacket ==0){
                coloredBallsInPacket+=1
            }else{
                print('error : 2 colored balls has entered the pocket')
            }
        }


        // cue ball in packet
        if (bodyA.label === 'cueBall' && bodyB.label === 'pocket' ) {
            isLoose = true
        }
        if (bodyA.label === 'pocket' && bodyB.label === 'cueBall') {
            isLoose = true
        }

        // cue collision with colored ball
        if (bodyA.label === 'cueBall' && bodyB.label === 'coloredBall') {
            print('collision with colored ball')
        }
        if (bodyB.label === 'cueBall' && bodyA.label === 'coloredBall') {
            print('collision with colored ball')
        }

        // cue collision with cushion ball
        if (bodyA.label === 'cueBall' && bodyB.label === 'cushion') {
            print('collision with cushion')
        }
        if (bodyB.label === 'cueBall' && bodyA.label === 'cushion') {
            print('collision with cushion')
        }

        // cue collision with red ball
        if (bodyA.label === 'cueBall' && bodyB.label === 'redBall') {
            print('collision with red ball')
        }
        if (bodyB.label === 'cueBall' && bodyA.label === 'redBall') {
            print('collision with red ball')
        }
    }
}
function setMaxVelocity() {
    // Calculate the current velocity magnitude
    const velocityMagnitude = Math.sqrt(cueBall.velocity.x ** 2 + cueBall.velocity.y ** 2);

    // Check if the current velocity exceeds the maximum velocity
    if (velocityMagnitude > maxVelocity) {
        // Calculate the scaling factor
        const scaleFactor = maxVelocity / velocityMagnitude;

        // Scale down the velocity components to the maximum velocity
        cueBall.velocity.x *= scaleFactor;
        cueBall.velocity.y *= scaleFactor;

        // Directly setting velocity like this might not be recommended in all cases,
        // as it bypasses Matter.js's internal velocity update mechanisms.
        // An alternative approach could involve applying forces to slow down the body.
    }
}

class Stick {
    constructor(x, y, length) {
        this.position = createVector(x, y);
        this.length = length;
        this.angle = 0;
        this.color = color(139, 69, 19); // Brown color for the stick
        this.thickness = 5;
        this.distance = 0// Thickness of the stick
    }

    update(cueBallPosition) {
        let mousePosition = createVector(mouseX, mouseY);
        let ballPosition = createVector(cueBallPosition.x, cueBallPosition.y);
        this.distance = p5.Vector.dist(mousePosition, ballPosition);
        this.distance = min(this.distance, 100);
        this.angle = atan2(mousePosition.y - cueBallPosition.y, mousePosition.x - cueBallPosition.x);

    }

    draw() {
        push();
        translate(cueBall.position.x, cueBall.position.y);
        rotate(this.angle-Math.PI);
        stroke(this.color);
        strokeWeight(this.thickness);
        line(this.distance, 0,this.distance + this.length, 0);
        pop();
    }

    hitBall(cueBall) {
        let forceMagnitude = this.distance/100 * 0.012;
        let forceDirection = p5.Vector.fromAngle(this.angle).setMag(forceMagnitude);
        Matter.Body.applyForce(cueBall, cueBall.position, forceDirection);
    }
}