//
// bbb video player JS plugin - to be inserted in the loaded page
// tested only with Firefox
//
// author:      Oliver Blaser
//
// date c:      30.03.2020
// date e:      30.03.2020
//

// keyboard inputs:
// k - back
// l - fwd
// n - slower (videoSpeedRateStepSize)
// m - faster (videoSpeedRateStepSize)

var bbbJSplugin_version = '1.0'

//---------------------------------
// DOM
//---------------------------------

var rootDiv;
var rootDivID = 'bbb_js_plugin_root';
var rootDivStyle = '\
padding: 7px;\
background-color: orange;\
background: linear-gradient(90deg, #1CB5E0 25%, #000046 100%);\
';

var buttonStyle = '\
margin-right: 5px;\
display: inline-block;\
';

var buttonPlayPauseID = 'bbb_js_plugin_playPause';

var speedinfoDivID = 'bbb_js_plugin_speedInfo';
var speedinfoDivStyle = 'display: inline-block;';

//---------------------------------
// variables
//---------------------------------

var videoSpeedRate = 1;
var videoSpeedRateStepSize = 0.1;

//---------------------------------
// functions
//---------------------------------

function updateDisplay()
{
    $('#' + speedinfoDivID).html('speedRate: ' + videoSpeedRate);
}

function videoStep(step) // step in secs
{
    //console.log('videoStep('+step+')');

    document.getElementsByTagName("video")[0].currentTime += step;
}

function videoDeltaSpeedRate(d)
{
    //console.log('videoDeltaSpeedRate('+d+')');

    setVideoSpeedRate(videoSpeedRate + d);
}

function setVideoSpeedRate(newRate)
{
    //console.log('setVideoSpeedRate('+newSpeed+')');

    videoSpeedRate = Math.round(newRate * (1 / videoSpeedRateStepSize)) / (1 / videoSpeedRateStepSize);

    document.getElementsByTagName("video")[0].playbackRate = videoSpeedRate;

    updateDisplay();
}

function playPause()
{
      $('.acorn-play-button').click();
      updatePlayPauseButton();
}

function updatePlayPauseButton()
{
    if($('.acorn-play-button').html() == 'Play') $('#' + buttonPlayPauseID).attr('value', '\u23F5');
    else $('#' + buttonPlayPauseID).attr('value', '\u23F8');
}

//---------------------------------
// kind of an entry point
//--------------------------------- 

$('#' + rootDivID).remove();
$('body').prepend('<div id="' + rootDivID + '" style="' + rootDivStyle + '"></div>');
$('#' + rootDivID).html('\
<div style="display: inline-block;">\
    <input style="' + buttonStyle + '" type="button" value="&#60; 5s" onclick="videoStep(-5)" /> \
    <input style="' + buttonStyle + '" type="button" value="5s &#62;" onclick="videoStep(5)" /> \
    <div style="display: inline-block; width: 7px; text-align: center;">|</div>\
    <input id="' + buttonPlayPauseID + '" style="' + buttonStyle + '" type="button" value="&#x23EF;" onclick="playPause()" /> \
    <div style="display: inline-block; width: 7px; text-align: center;">|</div>\
    <input style="' + buttonStyle + '" type="button" value="-" onclick="videoDeltaSpeedRate(-' + videoSpeedRateStepSize + ')" /> \
    <input style="' + buttonStyle + '" type="button" value="1" onclick="setVideoSpeedRate(1)" /> \
    <input style="' + buttonStyle + '" type="button" value="+" onclick="videoDeltaSpeedRate(' + videoSpeedRateStepSize + ')" /> \
    <div id="' + speedinfoDivID + '" style="' + speedinfoDivStyle + '"></div>\
</div>\
<span style="float: right; text-align: right; color: whitesmoke;">\
    <div style="display: inline-block; font-weight: bold; font-size: 25;">bbb JS Plugin</div><div style="display: inline-block; margin-left: 5px;">v' + bbbJSplugin_version + '</div>\
</span>\
');

updateDisplay();
updatePlayPauseButton();

window.addEventListener('keydown', function(event)
{
    var keycode = event.charCode || event.keyCode;

    // verlangsamen 'n'
    if (keycode === 78) {
        videoDeltaSpeedRate(0 - videoSpeedRateStepSize);
    }

    // verschnellern 'm'
    if (keycode === 77) {
        videoDeltaSpeedRate(videoSpeedRateStepSize);
    }
  	
  	// reverse 'k'
    if (keycode === 75) {
        videoStep(-5);
    }

  	// forward 'l'
    if (keycode === 76) {
        videoStep(5);
    }
});
