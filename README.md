angular_jplayer
===============

integration of angularjs, jplayer and jquery_ui 

requires jquery, jquery ui, jplayer (must be changed in the .js file), and a jquery ui themeroller style (i advise you scope the css to wherever you're putting your jplayer). 

see sample_call.html for a sample use with angularjs.  "mp3obj" must contain an attribute corresponding to an mp3.  video should work through this thing, although the controls aren't there at all, since i only built this for audio.   make sure to include the .js file after your app's init file.

sample_call.html:

    <div jplayer audobj="mp3obj"></div>

that's all you have to do.  oh, and make sure the jplayer.html is accessible from your app (check that URL in the JS too)


