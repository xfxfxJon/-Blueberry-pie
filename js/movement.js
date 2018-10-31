$(document).ready(function () {


    // 获取歌曲API
    function getMusic() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getSongInfo.php", {
            song: 'mo'
        }, function (res) {
            // console.log(res);
            if (res.success) {
                var data = res.songInfo;

                $('.player_title_right span').html(data.play_num);
                $('.player_title_left span').html(data.song_title);
                $('.player_cover').attr('src', 'http://wwtliu.com/sxtstu/blueberrypai/' + data.song_pic);
                $('.player_img p').html(data.song_intro_cont);

                var audio = document.getElementById('myAudio');
                $(audio).attr("src", data.song_source.replace('iwen.wiki', "wwtliu.com"));

                // 监听单击事件
                audio.oncanplay = function () {

                    // 显示总时长
                    $('.end_time').html(getTime(audio.duration));

                    // 监听播放按钮
                    $('.start').click(function () {
                        if (audio.paused) {
                            // 播放
                            audio.play();
                            $('.start img').attr('src', '../img/pause.png');
                        } else {
                            //暂停
                            audio.pause();
                            $('.start img').attr('src', '../img/play.png');
                        }
                    });
                };

                // 监听时间
                audio.ontimeupdate = function () {
                    // console.log(audio.currentTime);
                    $('.start_time').html(getTime(audio.currentTime));

                    var percent = audio.currentTime / audio.duration;

                    $('.progress_my_up').css('width', percent * 100 + '%');
                };
            }
        });
    }
    getMusic();


    // 返回时间字符串
    function getTime(time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return minutes + ":" + seconds;
    }

    // 获取文章API
    function getArticle() {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getInterestingInfo.php", function (res) {
            console.log(res);
            if (res.success) {

                $('.home_left_title>h3').html(res.interestingInfo.interest_title);
                $('.view_num').html(res.interestingInfo.eye_num);
                $('.chat_num').html(res.interestingInfo.wei_chat_num);
                $('.right span').html(res.interestingInfo.interest_create_time);
                $('.home_left_content>pre').html(res.interestingInfo.interest_cont);

                var labelStr = '';
                for (var i = 0; i < res.labels.length; i++) {
                    labelStr += '<span class="">' + res.labels[i] + '</span>';
                }
                $('.tab').append(labelStr);

                var relateStr = '';
                for (var j = 0; j < res.related_read.length; j++) {
                    relateStr +=
                        ' <a href="#">' +
                        '<img src="http://wwtliu.com/sxtstu/blueberrypai/' + res.related_read[j].related_read_pic + '" alt="">' +
                        ' <p>' + res.related_read[j].related_read_summary + '</p>' +
                        '</a>';
                }
                $('.relevant_img').append(relateStr);

                var zanStr = '';
                for (var k = 0; k < res.who_zan.length; k++) {
                    zanStr +=
                        '<a href="#"><img src="http://wwtliu.com/sxtstu/blueberrypai/' + res.who_zan[k].zan_icon + '" alt="">' +
                        ' <p>' + res.who_zan[k].zan_name + '</p>' +
                        '</a>';
                }
                $('.praise_imgs').append(zanStr);


                // 广告
                $('.praise_bg img').attr("src", "http://wwtliu.com/sxtstu/blueberrypai/" + res.ad_pic);

                // 评论
                var commentStr = '';
                for (var m = 0; m < res.comment.length; m++) {
                    commentStr +=
                        '<div class="comments_item">' +
                        '<div class="comments_author">' +
                        '<img src="http://wwtliu.com/sxtstu/blueberrypai/'+ res.comment[m].user_icon +'" alt="">' +
                        '<span class="comments_author_name">'+ res.comment[m].user_name +'&nbsp;&nbsp;</span>' +
                        '<span class="comments_time">5/23&nbsp;&nbsp;16:15</span>' +
                        '</div>' +
                        '<div class="comments_content">'+ res.comment[m].comment_cont +'</div>' +
                        '<div class="comments_other">' +
                        '<span class="comments_zan">' +
                        '<img src="../img/zan.png" alt="">' +
                        '</span>' +
                        '<span class="comments_zan_num">&nbsp;'+ res.comment[m].comment_zan +'</span>' +
                        '<span class="comments_chat">' +
                        '<img src="../img/chat.png" alt="">' +
                        '</span>' +
                        '<span class="comments_chat_num">&nbsp;'+ res.comment[m].comment_look +'</span>' +
                        '</div>' +
                        '<div class="discuss">' +
                        '<input type="text">' +
                        '<button>回复</button>' +
                        '<div class="discuss_small"></div>' +
                        '<div class="discuss_big"></div>' +
                        '</div>' +
                        '</div>';
                }
                $('.comments').append(commentStr);
                $(".comments_chat").each(function (i) {
                    $('.comments_chat').eq(i).click(function () {
                        if ($('.discuss').eq(i).css('display') == 'none') {
                            $('.discuss').eq(i).css('display', "block");
                        } else {
                            $('.discuss').eq(i).css('display', "none");
                        }
                    });
                });


                // 总结
                $('.count_num .count_num_item:eq(0) p:eq(0)').html(res.tiezi_num);
                $('.count_num .count_num_item:eq(1) p:eq(0)').html(res.comment_num);
                $('.count_num .count_num_item:eq(2) p:eq(0)').html(res.concern_num);
                $('.share_zan span').html(res.zan_num);


                // 其它
                var otherStr = "";
                for(var n = 0; n < res.other_interest.length; n++){
                    otherStr +=
                    '<li><a href="#">'+ res.other_interest[n] +'</a></li>';
                }
                $('.author_other .articles ul').append(otherStr);


                // 热门
                var hotStr = '';
                for(var o = 0; o < res.hot_recomment.length; o++){
                    hotStr +=
                    '<li><a href="#"><span></span>'+  res.hot_recomment[o] +'</a></li>';
                }
                $('.hot .articles ul').append(hotStr);
            }
        });
    }
    getArticle();


    // 

});