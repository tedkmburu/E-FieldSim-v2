const k = 89900; // k = 8.99 * Math.pow(10, -9) adjusted because all charges are in micro coulombs;

const chargeDiameter = 40; // diameter of a point charge
const chargeRadius = chargeDiameter / 2;
const gridSize = 25;
const conductorParticleCharge = 1;
const testChargeDiameter = 10;
const testChargeCharge = 0.000005; //q = 5 micro coulombs;

const positiveChargeColor = "rgb(210, 41, 45)";
const negativeChargeColor = "rgb(23, 97, 176)";
const neutralChargeColor = "rgba(85, 85, 85, 0.75)";

const fieldVectorScale = 500; // this constant scales the size of the arrows in the field vector mode. The arrows get smaller as the number gets bigger

const defaultFont = "Times New Roman";
const buttonFont = "Arial";

let charges = []; // all charges on screen are stored here
let conductors = [];
let testCharges = [];
let buttons = [];
let contextMenuButtons = []; 
let checkBoxes = [];
let fieldVectors = [];

let sidePanelWidth = 300;
let snapToGrid = false;
let menuOpen = true;

let showContextMenu = false;

let contextMenuPosition; 



let showFieldLinesCheckBox, 
showFieldVectors, 
showEquipotentialLinesCheckBox, 
showVoltageCheckBox, 
testChargeMode, 
createGridCheckBox, 
createWallsCheckBox, 
showPopUp, 
fullscreen;