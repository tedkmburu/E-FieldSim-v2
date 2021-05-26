const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

let charges = []; // all charges on screen are stored here
let chargeSize = 40; // diameter of a charge
let gridSize = 25;
let conductors = [];
let conductorParticleCharge = 1

let sidePanelWidth = 300;

let positiveChargeColor = "rgba(255, 0, 0, 1)";
let negativeChargeColor = "rgba(0, 0, 255, 1)";
let neutralChargeColor = "rgba(85, 85, 85, 0.75)";

let snapChargeToGrid = false;



let buttons = []
let checkBoxes = []
let menuOpen = true;





let showFieldLinesCheckBox, 
showFieldVectorsCheckBox, 
showEquipotentialLinesCheckBox, 
showVoltageCheckBox, 
createTestChargeCheckBox, 
createGridCheckBox, 
createWallsCheckBox, 
snapChargeToGridCheckBox, 
showPopUp, 
fullscreen;