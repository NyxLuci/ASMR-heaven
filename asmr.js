// ASMR Trigger Sound Map
const triggers = {
	tapping: 'asmr_sounds/Tapping.mp3',
	whispering: 'asmr_sounds/whispering.mp3',
	crinkling: 'asmr_sounds/Crinkling.mp3',
	brushing: 'asmr_sounds/Brushing.mp3',
	water: 'asmr_sounds/Water.mp3',
	typing: 'asmr_sounds/Typing.mp3',
	page: 'asmr_sounds/Page.mp3',
	scratching: 'asmr_sounds/Scratching.mp3',
	mouth: 'asmr_sounds/Mouth.mp3',
	hand: 'asmr_sounds/Marshmallo.mp3',
};

let continuousMode = false;
let currentLoop = null;
let currentSingle = null;

function playSound(trigger) {
		const src = triggers[trigger];
		if (!src) return;
		if (currentSingle) {
			currentSingle.pause();
			currentSingle.currentTime = 0;
			currentSingle = null;
		}
		const audio = new Audio(src);
		audio.volume = 0.7;
		audio.play();
		currentSingle = audio;
		audio.addEventListener('ended', () => {
			currentSingle = null;
		});
		return audio;
}

function playSoundLoop(trigger) {
	const src = triggers[trigger];
	if (!src) return;
	let audio = new Audio(src);
	audio.volume = 0.7;
	audio.loop = true;
	audio.play();
	return audio;
}

function stopCurrentLoop() {
		if (currentLoop) {
			currentLoop.pause();
			currentLoop.currentTime = 0;
			currentLoop = null;
		}
		if (currentSingle) {
			currentSingle.pause();
			currentSingle.currentTime = 0;
			currentSingle = null;
		}
}

window.addEventListener('DOMContentLoaded', () => {
	const btns = document.querySelectorAll('#asmr-buttons button');
	const continuousBtn = document.getElementById('continuousBtn');
	const stopBtn = document.getElementById('stopBtn');
	let lastTrigger = null;

	btns.forEach(btn => {
		btn.addEventListener('click', () => {
			const trigger = btn.getAttribute('data-trigger');
			lastTrigger = trigger;
			if (continuousMode) {
				stopCurrentLoop();
				currentLoop = playSoundLoop(trigger);
			} else {
				playSound(trigger);
			}
		});
	});

	continuousBtn.addEventListener('click', () => {
		continuousMode = !continuousMode;
		continuousBtn.textContent = `Continuous Mode: ${continuousMode ? 'On' : 'Off'}`;
		if (!continuousMode) {
			stopCurrentLoop();
		} else if (lastTrigger) {
			stopCurrentLoop();
			currentLoop = playSoundLoop(lastTrigger);
		}
	});

	stopBtn.addEventListener('click', () => {
		stopCurrentLoop();
	});
});