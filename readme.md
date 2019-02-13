# tetr.js
## Dr Ocelot's Changelog:
### 2019-02-13 v0.3.5
- Made level counter in modern modes visually start at 1
- Retro Mode Updates
  - New drought animation
  - Generator changed to be a little more accurate
  - Wall charge

### 2019-02-12 v0.3.4
- Removal of leftover testing stuff (oops!)

### 2019-02-12 v0.3.3
- New mode, "Grades", is now accessible, but heavily unfinished.
- Retro Mode Updates
    - 180 rotation enabled
    - I Tetrimino counter added for Retro Mode
        - Counts amount of I pieces spawned
        - After 13 pieces without an I, starts counting the drought until it's over
    - Added flashing effect on Tetris line clear
- Replaced Tetris line clear sound in the Retro soundbank
- Master mode now has a rainbow background
- Menu changes! More categories and organistion!
- Added step sound

### 2019-02-11 v0.3.2
- Forced Retro Mode's gravity setting

### 2019-02-11 v0.3.1
- Modified Retro Mode's soft drop lock checking

### 2019-02-11 v0.3.0
- Added Retro Mode!
    - Classic scoring system
    - No hard drop, hold, grid, 180 rotation
    - 1 Next Queue
    - Color Changing Skin
    - NES-like DAS
    - NES speed ramps
    - Force Nintendo rotation system
    - Instant lockdown
    - NES randomiser
- Added Retro soundbank
- New Skins
    - Bone
    - Retro
- Music enabled for 3 modes
    - Marathon
    - Master
    - Retro
- Removed stock sound effects (Downfall clips)

### 2019-02-09 v0.2.0
- Removed rankings (it was busted to begin with)
- Added Tetris Online Japan soundbank
- New Skins
    - Aqua
    - Arcade
    - N-Blox
- Updated UI

### 2019-02-08 v0.1.1
- Updated UI
- New Logo
- Squished Menus

### 2019-02-08 v0.1.0
- Removed most Chinese
- Replaced SE functionality
    - Sound is now on be default
    - Default volume reduced to 50
    - Added option to choose game soundbank
    - Added option to choose next piece soundbank
    - Added new sound effects
        - Hard Drop
        - Move
        - Hold
        - Rotate
        - Initial Hold
        - Initial Rotate
        - Next Piece Sound Indicators
        - Ready/Go
    - Added four game soundbanks
        - Puyo Puyo Tetris
        - Tetris: The Grand Master 3 - Terror‑Instinct
        - NullpoMino
        - Yotipo's Sound Effects
    - Added two next piece indicator soundbanks
        - Tetris: The Grand Master 3 - Terror‑Instinct
        - NullpoMino
        
## Default Controls:

- **Rotate Left:** Z
- **Rotate Right:** X
- **Rotate 180:** Shift
- **Hold:** C
- **Hard Drop:** Space
- **Shift Left:** Left Arrow
- **Shift Right:** Right Arrow
- **Restart:** R

## Current mechanics and features

- Tetris Guideline compliant
    - Colors
    - Random generator, first bag never spawns Z, S, or O piece first.
    - SRS
    - Gameover by lock out or block out
    - Hold
    - Piece preview
- Game statistics like PPM, Time, etc.
- Multiple mino skins
- Stack outline
- Configurable gravity
- 60 FPS
- Fast code and drawing
- DAS and DAS delay settings
- Configurable controls
- Adjustable game size
- Ghost piece color and transparency
- Responsive design
- Preload das preservation during countdown
- Finesse faults counter.
- Farter's Dig mod:
    - Dig modes
    - Mobile design
    - Replays
    - Leaderboards
- Dr Ocelot's Enhancements:
    - Sound effects with various banks

## Planned future mechanics and features

- More game modes (ultra, etc)
- More rotation systems
- Training mode, 2step trainer, patterns, etc
- Stats logging
- Sound effects
- T-spin and twist detection
- Custom mino skins (or at least a selection)

## TODO misc

- Help page
- Feedback button
