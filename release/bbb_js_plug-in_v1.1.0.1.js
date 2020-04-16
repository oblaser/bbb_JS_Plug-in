//
// bbb video player JS plugin - to be inserted in the loaded page
// tested only with Firefox
//
// author:      Oliver Blaser
//
// date c:      30.03.2020
// date e:      16.04.2020
//

// keyboard inputs:
// k (or arrow left)        back
// l (or arrow right)       fwd
// n (or arrow down)        slower (about videoSpeedRateStepSize)
// m (or arrow up)          faster (about videoSpeedRateStepSize)
// space                    play/pause

var bbbJSplugin_version = '1.1.0.1'

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

var separatorDivHtml = '<div style="display: inline-block; margin-right: 5px; border: solid 1px;">\u001f</div>';

var imgInfoStyle = '\
height: 20px;\
';

var imgGithubStyle = '\
height: 20px;\
';

var buttonPlayPauseID = 'bbb_js_plugin_playPause';

var speedinfoDivID = 'bbb_js_plugin_speedInfo';
var speedinfoDivStyle = 'display: inline-block;';

//---------------------------------
// variables
//---------------------------------

var videoSpeedRate = 1;
var videoSpeedRateStepSize = 0.1;
var videoStepSize = 10;

//---------------------------------
// functions
//---------------------------------

function updateDisplay()
{
    $('#' + speedinfoDivID).html('speedRate: ' + videoSpeedRate);
}

function unfocusButtons()
{
    $('input').blur();
}

function videoStep(step) // step in secs
{
    //console.log('videoStep('+step+')');

    document.getElementById("video").currentTime += step;
    
    unfocusButtons(); // otherwise the space input would trigger the actual focused (last clicked with the mouse) button instead of the play/pause function
    
    updatePlayPauseButton();
}

function setVideoSpeedRate(newRate)
{
    //console.log('setVideoSpeedRate('+newSpeed+')');

    videoSpeedRate = Math.round(newRate * (1 / videoSpeedRateStepSize)) / (1 / videoSpeedRateStepSize);

    document.getElementById("video").playbackRate = videoSpeedRate;

    updateDisplay();
    
    unfocusButtons(); // otherwise the space input would trigger the actual focused (last clicked with the mouse) button instead of the play/pause function
}

function videoDeltaSpeedRate(d)
{
    //console.log('videoDeltaSpeedRate('+d+')');

    setVideoSpeedRate(videoSpeedRate + d);
}

function playPause()
{
    $('.acorn-play-button').click();
    updatePlayPauseButton();
    
    unfocusButtons(); // otherwise the space input would trigger the actual focused (last clicked with the mouse) button instead of the play/pause function
}

function updatePlayPauseButton()
{
    if($('.acorn-play-button').html() == 'Play') $('#' + buttonPlayPauseID).attr('value', '\u23F5');
    else $('#' + buttonPlayPauseID).attr('value', '\u23F8');
}

function showInfo()
{
    alert('\
keyboard inputs:\n\n\
k (or arrow left)\t\tback\n\
l (or arrow right)\t\tfwd\n\
n (or arrow down)\tslower\n\
m (or arrow up)\t\tfaster\n\
space\t\t\t\tplay/pause\n\
');
}

//---------------------------------
// kind of an entry point
//--------------------------------- 

if($('#' + rootDivID).length) // rootDiv already exists
{
    $('#' + rootDivID).remove();
    
    alert('Inserting bbb JS Plug-in multiple times will cause errors. Please reload the page and insert bbb JS Plug-in again.');

    window.location.reload(true);
}

$('body').prepend('<div id="' + rootDivID + '" style="' + rootDivStyle + '"></div>');
$('#' + rootDivID).html('\
<div style="display: inline-block;">\
    <input style="' + buttonStyle + '" type="button" value="&#60;" onclick="videoStep(-' + videoStepSize + ')" /> \
    <div style="display: inline-block; margin-right: 5px; text-weight: bold; text-align: center;">' + videoStepSize + 's</div>\
    <input style="' + buttonStyle + '" type="button" value="&#62;" onclick="videoStep(' + videoStepSize + ')" /> \
    ' + separatorDivHtml + '\
    <input id="' + buttonPlayPauseID + '" style="' + buttonStyle + '" type="button" value="&#x23EF;" onclick="playPause()" /> \
    ' + separatorDivHtml + '\
    <input style="' + buttonStyle + '" type="button" value="-" onclick="videoDeltaSpeedRate(-' + videoSpeedRateStepSize + ')" /> \
    <input style="' + buttonStyle + '" type="button" value="1" onclick="setVideoSpeedRate(1)" /> \
    <input style="' + buttonStyle + '" type="button" value="+" onclick="videoDeltaSpeedRate(' + videoSpeedRateStepSize + ')" /> \
    <div id="' + speedinfoDivID + '" style="' + speedinfoDivStyle + '"></div>\
    <a style="margin-left: 30px; text-decoration: none;"><img style="' + imgInfoStyle + '" onclick="showInfo()" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAEuUlEQVR4nO3bXYhWZRAH8N+upULtmiumCGpQrUbeJaIXUXYT0XVZknpnhmjRlbBlVwUZVJIEEX1AkST2AUXQTXjZdVqiGa5m5Uf4HWrCbhfPmsu7c86773nPObvi+4fnZvbszDxz5szMM/O8dNBBBx3cxOiqUdYcLMEiLMQduH3kbxdxBkdwEHtxskbdKkE3HsEO/ILhFtfPeAcrR3jdMJiFV3BU65vOWkdGePbVuI+WMQPbcEF5G29cF/A6emva07ixGn+pbuON6088XYbi7QbBXryPJ1v4n8v4FSfwzwjtNszFPZjeAq+deFbyjNqxWNpIs7d1CbuxHv3yA1q3lCXW4wvJWM34HxjhWyuW4VQTxQaxSUp3RTETm6UgmCfrJJa2IaclLJMf6M5gI24tUeZUyZhnc+SeV4MRFst/899IBU9VmIvvcuSfVOHn0Cv7mx/CFvVUll0YGJGZFRN6qhD8eYbAf/FMFQKbYC2uZuj0WdnCVmcIGjIxm7+GtbI9YVVZQmbILnK2FOS5Ak80rBUFeQ1k6PaHkj6FbRkCvlX8m98V8NtVkFe37MD4WkGe/2OWOOWd0V60L9MApOwQpcjzmhygmh0zN7l+Zh+Nl6RSdrLgOLYG9B6pJimEbvGR9qhUmLSDsj2AVHgNBnwH5bzoPA9YifkB/Q0p9U02XMVbAX0hHizCcIf4YDOzoIJ1oE98gNpehFnUxtpdiprV4itj9d7bKpM54gJjfWlqVocN4oJtdvRwVgxYIs7xe9rXr3LsCWhd0p7GIMsAiwPaJRwqplOtOCjFgUYsih6+JYPJwoB2SHKlMvAiljfQfsSbJfAewm+4v4F+V/RwlgGirmuZg4rlUv1fFU4FtLCTnPUJRNXfxcLq1I/zAS08GN1QE5cqkGWA6G1HXjFZEbl72DrPMkDkQncWVqd+RDk/2lOmAQYD2r2YUlChOjEFdwf0w9HDWQY4ENCmS5ObyY5+8XTpYPRwlgH2SSVkIx4qqFSdeDigDUt7GoMsA5zA/oD+aDGdakWk4z5xbZCbBn8IaI+b3MfhWXgsoEd7Qb4Bvgxo07CmRaXqxBpxtyraS1N0SZHzRmqJRUPUQTnd6zwPGMbHAX2+NJOfbNiIBQH9A3FAHxf6pAKi0apnpVZ0UZTtAfNwLuB5TpOY1ewscBrvBvQZ+HAc/18HuvGRuPzdIc0w2kKvdCcnmrwMFORZ5mhsa4Zux5Q4JX4qQ8iQNKCcKKyTPRwtvd+wM0PQVRNjhHWyx+OfVCGwRzojZHnCgHouSHRLbp/15ver8OjeL7XGIsHD0pS2nezQDPPwfY78E2o4sC0Vp8bRKXKz9oul0ZiKF8SpbnTKe6BEmblYKt8TrlWMz2vvfm+ftPHfm8g6rsbNX0O/7Jgwel2WxlUbpHlDXlNlCu7Dc/gaV8bBf7823L7doNWD97R2b/eK1Lc/LvXpuqSgNVfq5ExrgdenkrEmvGO9SrqT0+xtlbWOqXauUAg90p2cvADZ7jqHV1V0D7As9OFl8W2NouuwdC1nMjdjxqBL6iFul+bzWYVLtIbwE96WbndUVmDV+aOp2a7/aGqB5CmjfzR1WkqdBySD/V2jbh100EEHNyf+A3fgfwN+pTu2AAAAAElFTkSuQmCC"></a>\
    \
</div>\
<span style="float: right; text-align: right; color: whitesmoke;">\
    <div style="display: inline-block; font-weight: bold; font-size: 17px;">bbb JS Plug-in</div>\
    <div style="display: inline-block; margin-left: 10px;">v' + bbbJSplugin_version + '</div>\
    <a style="margin-left: 10px; text-decoration: none;" href="https://github.com/oblaser/bbb_JS_Plug-in" target="_blank"><img style="' + imgGithubStyle + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFfElEQVRoge1YW4hVVRj+/r0Hx7PWOeOYppmTlZHkpZdKNAIpInoqx6AoCiK7WAkhBApWQogikiFU5FRoYlQYdoNIogulDyp2gSyDHpIalfI65+y9zhlnn/X1MHts5px9PZovzgf7Zf2379uXtf/1A6MYxcUN+T+Skhzb399/eRAERQBoa2vz2tvbD4tI//mudV4ElMvlia7rLiJ5m4jMB3AlAKfBzQI4RHKviHxdr9c/6ujoOHGutc9JgO/7cwEsB3A3gDE5w88A+BTAOq31961yaElAtVqdZq3dCGBRq4UbsENElimlevMG5hbged5DIvI6gGLe2EQiIhUAS5RS7+WJa3xPY0HS8Txvo4hsw3kmH+YvkXzXGPMSycw3NpMjSccYsxnAwy0zzIctSqlHRYRpjpmegO/7G3DhyAPAI9VqdX0Wx9QnEL7z22LMBwFcgXN/pY5gcJvtGkFO5AGl1PtJgYlPoFqtTgs/2Ch8rLWepZQaD6AbwP4chAEgALDJdd0ZWuupInIzgPpwB5I9xpiu6PBBtCUZw60y8u6S3AcAIhIA+ITkZ77vrxeRZQB+BrAHwFEROW6tbXccZzLJawAsAOA4jtNdKBR2DeVTSvX6vn8YwLRhZTpIvgzgvjiOsa9Q+JPaFxso8oxS6pXG9dOnT4/v7Ow8FRdHUvr6+jqjfHzfPwBgdmMIgJu01j9E5Ut6hZYn2EByctR6EnkAEBEm+FwWFUJyRVy+SAHlcnkiBtuDJMxMsedCpVKZBGBClE1EFvb19V0SZYsU4LpuN9J7m6tzMUyB67rTE8ztrusujDJECiB5e0q9QESeykouC5RSewBsibM7jhPJKVKAiMxLqbdVKbU3O71ssNauCHuiJpCcH7XeJIDkWIzcyqKSvdoSwxSUSqVjJLfHmK8KuY1Ak4BarTYFgJtQ53ixWPypRY6pEJGvYkxurVZr2vmaBNTr9bS24EgrxLJCRGLPBEEQlBrXmgRYawdSaugWeGWGtTb2BpJs4hb1ER9LqTGVZCEvsawQkWsTzE1n6CYBpVLpJAYbrTiMNcbc0QK3TCB5V4ypHnIbgSYB4SHiUEqd5/OcmrLCGHMLgMj9XkR+FxHbuB7XC32TUmuuMWZ1Tn6JKJfLE621mxHTYJL8Lmo97kf2ZYaaz3met4Fk3nFKEyqVyhzXdb8VkRlxPiR3Ra1Hqi2XyxNc1+0F0PTjiMCvJNdorbeHZ4PMMMZ0WWufFZElAJI2BjMwMNAV1cUmnQfeBPBYDj6nRORzkruttb8Vi8XdIjJi2zPGTAUwn+QcAHcCmIds5/K3tNaPRxliBVQqlZmO4/zS4LMUwB8ANiG+3bAAlmqtN0XknCQiH4jIggykh0CSN8T9/WPVl0qlgyQbD9TrReSU4zi3Aoj7Y66NIh/m/CcIgm4Af6XzPou3k1qXxK0wHNoeADC8B/lRKXWj53mzHcf5AsCUYbajSqnpIlJLymuMuZ9klgnciXq9fl1HR8fxlgSExe4huWP4muM4CwqFwi6SYzzPmwHAishJrfVJETmTlpPkGGNML4BLk9xE5F6l1I4En2zwff8F3/c5dBlj4uZEeXLuHJ4z4lqZJU+myZzWenU43gAAkHzQ9/3FrZIPkfQdvKa1XpslSeZ2gKQYY1YBWIX/hB8Ukf0kqwDgOM6aQqHwZ5Z8vu/3AHiiuQxXFovFdVl5JQ62hiPskV70PG+viLyDwQnCTJJnpxPW2jcAZBIQgb9F5Gmt9Yd5gjKP14dQLBZ3ArgeQA+Su9asIIAtQRDMUkrlIg+0IAAAtNZHtdZPuq47G8BWAOW8+UjWAPTU6/VZWuvF48aNa2qVLxhIjjXGLKpUKpmHXSSTzt2jGMUoLhb8C5vzOyKMqSvLAAAAAElFTkSuQmCC"></a>\
</span>\
');

updateDisplay();
updatePlayPauseButton();

window.addEventListener('keyup', function(e)
{
    e = e || window.event;

    if ((e.keyCode === 78) || (e.keyCode === 40)) videoDeltaSpeedRate(0 - videoSpeedRateStepSize);
    if ((e.keyCode === 77) || (e.keyCode === 38)) videoDeltaSpeedRate(videoSpeedRateStepSize);
    if ((e.keyCode === 75) || (e.keyCode === 37)) videoStep(0 - videoStepSize);
    if ((e.keyCode === 76) || (e.keyCode === 39)) videoStep(videoStepSize);
    if (e.keyCode === 32) playPause();
});
