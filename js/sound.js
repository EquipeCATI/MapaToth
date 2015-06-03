$(document).on("click", "#soundButton.Active", function () {
    $(this).attr("src", preload.getResult("noSound").src);
    $(this).removeClass("Active");
    $(this).addClass("Inactive");
    createjs.Sound.setVolume(0);
});

$(document).on("click", "#soundButton.Inactive", function () {
    $(this).attr("src", preload.getResult("sound").src);
    $(this).removeClass("Inactive");
    $(this).addClass("Active");
    createjs.Sound.setVolume(1);
});

function fadeVolumeDown(volume, completion) {
    var volumeDown = setInterval(function () {
        var currentVolume = createjs.Sound.getVolume();
        currentVolume -= 0.1;

        if (currentVolume <= volume) {
            completion();
            clearInterval(volumeDown);
        } else {
            createjs.Sound.setVolume(currentVolume);
        }

    }, 200);
}

function fadeVolumeUp(volume) {
    var volumeUp = setInterval(function () {
        var currentVolume = createjs.Sound.getVolume();
        currentVolume += 0.1;

        if (currentVolume >= volume) {
            clearInterval(volumeUp);
        } else {
            createjs.Sound.setVolume(currentVolume);
        }

    }, 200);
}

function transitionToSoundNamed(name) {

    fadeVolumeDown(0, function () {
        createjs.Sound.stop();
        createjs.Sound.play(name, {
            volume: 0.7,
            loop: -1
        });

        if ($("#soundButton").hasClass("Active")) {
            fadeVolumeUp(1);
        }

    });
}