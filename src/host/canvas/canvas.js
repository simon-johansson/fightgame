
export const width = 800;
export const height = 600;
export const canvasElement = document.createElement('canvas');
export const context = canvasElement.getContext('2d');

canvasElement.setAttribute('width', width);
canvasElement.setAttribute('height', height);
document.getElementById('app').appendChild(canvasElement);
