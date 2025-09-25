const triggers = {
	tapping: 'Tapping.mp3',
	whispering: 'whispering.mp3',
	crinkling: 'Crinkling.mp3',
	brushing: 'Brushing.mp3',
	water: 'Water.mp3',
	typing: 'Typing.mp3',
	page: 'Page.mp3',
	scratching: 'Scratching.mp3',
	mouth: 'Mouth.mp3',
	hand: 'Marshmallo.mp3',
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
