const keyStrokeSounds = [
  new Audio("sounds/keysstroke1.mp3"),
  new Audio("sounds/keysstroke2.mp3"),
  new Audio("sounds/keysstroke3.mp3"),
  new Audio("sounds/keysstroke4.mp3"),
];

function useKeyboardSound() {
    const playRandomKeyStrokeSound = () => {
        const randomSound = keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
        randomSound.currentTime = 0;  // for better user experience
        randomSound.play().catch((err) => console.log("Audio play failed: ", err));
    }

    return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;