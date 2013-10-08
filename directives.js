app.directive('jplayer',function() {
    return {
        restrict:'A',
        templateUrl:"/partial/jplayer",
        scope: {
            audobj: '='
        },
        transclude: true,
        link: function(scope, element, attrs){
                global_lp = 0;

                $("#jquery_jplayer").jPlayer({
                    ready: function () {
                        $(this).jPlayer("setMedia", {mp3: scope.audobj.url}).jPlayer("pause");
                        showPlayBtn();
                    },
                    swfPath: "/js/jplayer/Jplayer.swf",
                    supplied: "mp3",
                    timeupdate: function(event){
                        $("#sliderPlayback").slider('value', event.jPlayer.status.currentPercentAbsolute);
                        
                    }
                }).jPlayer("onProgressChange", function(lp,ppr,ppa,pt,tt) {
                    var lpInt = parseInt(lp);
                    var ppaInt = parseInt(ppa);
                    global_lp = lpInt;

                    $('#loaderBar').progressbar('option', 'value', lpInt);
                    $('#sliderPlayback').slider('option', 'value', ppaInt);
                })
                .jPlayer("onSoundComplete", function() {
                    console.log("soundcomplete");
                    $(this).jPlayer("play");
                });

                $("#pause").hide();

                function showPauseBtn()
                {
                    $("#play").fadeOut(function(){
                        $("#pause").fadeIn();
                    });
                }

                function showPlayBtn()
                {
                    $("#pause").fadeOut(function(){
                        $("#play").fadeIn();
                    });
                }

                function playTrack(t,n)
                {
                    $("#jquery_jplayer").jPlayer("setFile", t).jPlayer("play");

                    showPauseBtn();

                    return false;
                }

                $("#play").on('click',function() {
                    $("#jquery_jplayer").jPlayer("play");
                    showPauseBtn();
                    return false;
                });

                $("#pause").on('click',function() {
                    $("#jquery_jplayer").jPlayer("pause");
                    showPlayBtn();
                    return false;
                });

                $("#stop").on('click',function() {
                    $("#jquery_jplayer").jPlayer("stop");
                    showPlayBtn();
                    return false;
                });


                $("#volume-min").on('click', function() {
                    $('#jquery_jplayer').jPlayer("volume", 0);
                    $('#sliderVolume').slider('option', 'value', 0);
                    return false;
                });

                $("#volume-max").on('click', function() {
                    $('#jquery_jplayer').jPlayer("volume", 100);
                    $('#sliderVolume').slider('option', 'value', 100);
                    return false;
                });

                $("#player_progress_ctrl_bar a").click(function() {
                    $("#jquery_jplayer").jPlayer("playHead", this.id.substring(3)*(100.0/global_lp));
                    return false;
                });

                // Slider
                $('#sliderPlayback').slider({
                    max: 100,
                    range: 'min',
                    animate: false,

                    slide: function(event, ui) {
                        console.log(ui.value);
                        $("#jquery_jplayer").jPlayer("playHead", ui.value);
                    }
                });

                $('#sliderVolume').slider({
                    value : 50,
                    max: 100,
                    range: 'min',
                    animate: false,

                    slide: function(event, ui) {
                        console.log("value",ui.value);
                        $("#jquery_jplayer").jPlayer("volume", ui.value/100 );
                    }
                });

                $('#loaderBar').progressbar();


                //hover states on the static widgets
                $('#dialog_link, ul#icons li').hover(
                    function() { $(this).addClass('ui-state-hover'); },
                    function() { $(this).removeClass('ui-state-hover'); }
                );


        }
    };

});

