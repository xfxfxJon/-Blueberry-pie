$(document).ready(function () {
    // page
    $(".pages").paging({
        initPageNo: 1,
        totalPages: 8,
        slideSpeed: 600,
        callback: function (page) {
            console.log(page);
            getJam(page);
        }
    });

    function getJam(page) {
        $.get("http://wwtliu.com/sxtstu/blueberrypai/getBlueBerryJamInfo.php", {
            "blueBerryjam_id": page
        }, function (res) {
            console.log(res);
            if (res.success) {
                var data = res.blueBerryJam;
                var str = '';
                for (var i = 0; i < data.length; i++) {
                    data[i].img = data[i].img.replace('iwen.wiki', 'wwtliu.com');
                    str +=
                    '<div class="item">' +
                        '<img src="'+ data[i].img +'" alt="">' +
                        '<div class="jam_label">'+ data[i].title +'</div>' +
                    '</div>';
                }
                $('.box .container').html(str);
            }
        });
    }
    // getJam(1);
});