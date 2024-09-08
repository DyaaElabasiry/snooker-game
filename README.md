# snooker-game
This app is a simulation of a snooker-like game designed using the p5.js and Matter.js libraries. 
The game replicates the behavior and physics of a traditional snooker table, focusing on 
providing an interactive and engaging user experience.

<img src="https://github.com/user-attachments/assets/7ed220db-6c45-4ac1-8b2f-bbb25fcf708a" width="72%">

# Design Overview
## Mouse-based Cue Functionality:
- Rationale: The game utilizes a mouse-based cue system to create a more intuitive 
and interactive experience for the player. This choice aligns with the natural way 
users interact with graphical elements on a screen.
- Mechanism: When the player presses and holds the mouse button, a cue stick 
appears, allowing the player to aim by moving the mouse. Releasing the mouse 
button strikes the cue ball, propelling it in the direction of the mouse movement. 
The distance between the cue stick and the cue ball determines the force applied. 
This design mimics the real-life action of pulling back a cue stick and striking a 
ball, thus making the game more realistic and engaging.
## Physics Engine:
- The game leverages the Matter.js physics engine to simulate realistic ball 
movements and collisions. The engine handles the dynamics of friction, 
restitution, and collision, creating a believable and responsive game environment. 
The gravity is set to zero to reflect the horizontal play surface of a snooker table.
## Interactive Elements:
- Pockets: The game features six pockets strategically placed around the table. 
When a ball collides with a pocket, it either gets removed from the table (red 
balls) or reset to its initial position (colored balls). This design enforces the rules 
of traditional snooker while adding a layer of interactivity.
o Cushions: The table includes cushions that provide a realistic bounce effect. This 
adds a strategic element to the gameplay, requiring players to think about angles 
and rebounds.
## Unique Features:
- Dynamic Velocity Control: A function setMaxVelocity ensures that the cue 
ball does not exceed a predefined speed, maintaining realistic physics and 
preventing erratic ball behavior. This feature is critical in providing a smooth and 
enjoyable gaming experience.
- Collision Handling: The game includes detailed collision handling to manage 
interactions between different types of balls, cushions, and pockets. This ensures 
that each game element behaves as expected, contributing to the overall realism 
and complexity of the gameplay.
## Extensions and Unique Ideas:
- Advanced Cue Control: Unlike traditional snooker games, this app features a 
unique cue control system that allows for variable force application based on 
mouse distance. This adds a layer of skill and precision to the game, 
differentiating it from other digital snooker simulations.
- Interactive Setup: The ability to reposition the cue ball before striking provides 
players with more control and strategy, simulating the real-life practice of placing 
the cue ball in a favorable position for the next shot.
- Real-time Updates: The game listens for events like afterUpdate and 
collisionStart, providing real-time responses to player actions and ensuring a 
smooth, interactive experience.
