/**
 * 预览模块相关js
 *
 *
 * 判断文件srcfileType 是否为PDF格式，是的话加载pdf插件
 *              文件转换状态   0 默认展现原文正在解析中
 *                             1 转换完成，可进行pdf原文和解析后的页面进行切换
 *                             2 转换失败，展现源文件，并提示解析失败
 * 其他文件格式：
 *              文件转换状态： 0 提示正在转换中，并可进行下载的处理
 *                             1 转换完成，展现预览页面
 *                             2 转换失败，展现下载的页面
 */
//文件转换状态
var transStatus = {
    //转换中
    statusTransUndone:0,
    //转换成功
    statusTransDone:1,
    //转换失败
    statusTransFail:2
};
var previewModule = {
    loginUserId:"",
    //转换状态
    transStatus:"",
    //原文件的存储地址
    rfsId:"",
    //文件的格式
    srcfileType:"",
    //文件预览地址
    docPreviewUrl:"",
    //文件下载地址
    docDownUrl:"",
    // 右侧搜索定位
    numLocal:1,
    //图片能否点击的标识
    isClick:false,
    mycars:null,
    //把mark标签放入数组中，
    markbq:null,
    jcArr:null,
    docName: '',


    //加载源文件处理 针对于pdf的做单独的预览处理
    loadPDFSourceFile:function(){
        // html页面的div隐藏
        $('.Detail').hide();
        $('.Detail_cont').show();
        var u = previewModule.docDownUrl + previewModule.rfsId + "/" + previewModule.docId;

        var url = "./pdfpreview/viewer.html?file="+u;
        var file = "<iframe id=\"pdfHtml\" src='" + url + "' width='100%' class='iframe-style-pdf'></iframe>";
        $('.spinner').hide();
        $('.no_html').append(file);
        $('#pdfHtml').height($(window).height()-5);
        $('.no_html').height($(window).height());
        this.loadResize()
    },
	//加载源文件处理 针对于pdf的做单独的预览处理
    loadDOCFile:function(){
        // html页面的div隐藏
        $('.Detail').hide();
        $('.Detail_cont').show();
        var u = previewModule.docPreviewUrl + previewModule.rfsId;
        var url = "./pdfpreview/viewer.html?file="+u;
        var file = "<iframe id=\"pdfHtml\" src='" + url + "' width='100%' class='iframe-style-pdf'></iframe>";
        $('.spinner').hide();
        $('.no_html').append(file);
        $('#pdfHtml').height($(window).height()-5);
        $('.no_html').height($(window).height());
        this.loadResize()
    },
    // 页面自适应展示
    loadResize:function() {
        $(window).resize(function(){
          $('#pdfHtml').height($(window).height()-5);
          $('.no_html').height($(window).height());
        });
    },
    //文件转换失败的交互处理
    downSourceFileStyleDeal:function(){
        $(".h3").hide();
        $(".spinner").hide();
        $("#div_content").empty();
        $("#documentDirNoData").show();
        var html = "<div class=\"noCont\">" +
            "<img src=\"./img/null.png\">" +
            "<p>解析失败，请<a style='color: #3c7eec;text-decoration: underline; cursor: pointer' onclick='previewModule.downFile(2)'>下载</a>源文件进行查看！</p>" +
            "</div>";
        $("#div_content").append(html);
        $('#div_content').height($(window).height());
    },

    downFile:function(key){
      var source = sessionStorage.sourceType;
      var jurisdiction = true;
      if (source === 'projectDoc') { // 项目文档
        previewModule.canOperating(previewModule.handleDownLoad, key);
      } else if (source === 'examineManage') { // 归档
        previewModule.borrowFileJurisdiction(previewModule.handleDownLoad, key)
      } else {
        if(source === 'manuscriptmanage') { // 底稿
          jurisdiction = checkSystemPermission('paper_file_file_down')
        } else if(source === 'customfile') { // 客户文档
          jurisdiction = checkSystemPermission('crm_financing__file_down')
        }
        previewModule.handleDownLoad(jurisdiction, key)
      }
    },
    borrowFileJurisdiction: function(hanled, key) {
      var data = JSON.parse(sessionStorage.getItem('vuex'))
      var token = data.loginObject.userToken;
      var userId = data.loginObject.userId;
      var projectId = data.projectMsg.pro_id;
      var proId = sessionStorage.getItem('examineManageProId')
        var fildData = {
            token: token,
            userId: userId,
            projectId: projectId,
            loginType: 'web',
            data: {
                projectId: proId
            }
        };
        $.ajax({
            url: allUrl+'/doc/project/selectDocPaperBorrPermissForProjectId',
            type:'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(fildData),
            success:function(res) {
              let load = (res.code===0) && res.data
              hanled && hanled(load, key)
            },
            error:function() {}
        })
      },
  /**
   * 处理下载逻辑：判断是否有权限，有权限直接下载；无权限调用处理无权限的方法
   * @param jurisdiction 是否有权限， true有权限， false无权限
   * @param key 点击下载的场景：failed解析失败；loading解析中
   */
  handleDownLoad: function(jurisdiction, key) {
      if (jurisdiction) { // 有权限
        var u = previewModule.docDownUrl + previewModule.rfsId + "/" + previewModule.docId;
        // window.open(u);
        let arr = [
          {
            id:previewModule.docId,
            name: '',
            flag:'preview',
            url: u
          }
        ]
        console.log(u)
        if(window.parent.msg.$store.state.isPC) {
            window.parent.msg.$store.commit('export', {
                // url: `${previewModule.rfsId}/${previewModule.docId}`,
                url: u,
                data: null,
                noSpliceUrl:true
            })
            return
        }
        window.parent.msg.$store.commit('download', arr)
      } else { // 无权限
        previewModule.handleNoRight(key)
      }
    },
    //项目文档判断用户是否有权限进行某一操作
    canOperating:function(cb, key) {
      let data = JSON.parse(sessionStorage.getItem('vuex'))
        var token = data.loginObject.userToken;
        var userId = data.loginObject.userId;
        var projectCreatBy = data.projectMsg.projectMsg.createBy;
        var id = sessionStorage.getItem('proDocViewDownId')
        var projectId = data.projectMsg.pro_id

        if (projectCreatBy == userId) {
          cb && cb(true)
        } else {
            var send_data = {
                token: token,
                userId: userId,
                projectId: projectId,
                data: {
                    ids: id,
                    key: "download",
                    docSource: 0
                }
            };
          $.ajax({
            url:  allUrl+'/doc/paper/validateFilePermByUserId',
            type: 'POST',
            dataType: 'json',
            contentType: "application/json",
            data: JSON.stringify(send_data),
            success: function (response) {
              let canLoad = (response.code===0) && response.data
              cb && cb(canLoad, key)
            },
            error: function () {

            }
          })
        }
    },
  /**
   * 处理无下载权限逻辑：根据不同场景点击下载，展示不同的提示信息
   * @param key：‘failed’ 解析失败点击下载，‘loading’解析中点击下载
   */
  handleNoRight: function(key) {
      if(key === 2) {
        var html = "<div class=\"noCont\">" +
          "<p>无下载权限！</p>" +
          "</div>";
      } else {
        var html = "<div class=\"noCont\">" +
          "<p>无下载权限，请耐心等待。</p>" +
          "</div>";
      }
      $("#div_content").append(html);
      $('#div_content').height($(window).height());
    },
    //文件正在转换中的交互处理
    transFormFileStyleDeal:function(){
        $(".h3").hide();
        $(".spinner").hide();
        $("#div_content").empty();
        $("#documentDirNoData").show();
        var html = "<div class=\"noCont\">" +
            "<img src=\"./img/loading.gif\">" +
            "<p>正在解析中，请稍后再试，或<a style='color: #3c7eec;text-decoration: underline; cursor: pointer' onclick='previewModule.downFile(1)'>下载</a>源文件进行查看！</p>" +
            "</div>";
        $("#div_content").append(html);
        $('#div_content').height($(window).height());
    },

    /**
     * 对于pdf文件加载用pdf插件
     * doc，docx 第一阶段转换为pdf，pdf的地址存放在transPdfId，也优先采用pdf插件展现
     * 加载预览页面的处理
     */
    loadPreviewData:function(){
        if(previewModule.srcfileType.toUpperCase() == "PDF"){
            previewModule.loadPDFSourceFile();

        }else if(previewModule.srcfileType.toUpperCase() == "DOCX" ||previewModule.srcfileType.toUpperCase() == "DOC"){
			if(previewModule.transStatus == transStatus.statusTransDone){
				previewModule.loadDOCFile();
			}
        }
        if(previewModule.transStatus == transStatus.statusTransUndone){
            previewModule.transFormFileStyleDeal();
        }else if(previewModule.transStatus == transStatus.statusTransDone){
			previewModule.loadOfficePreview();
        }else{
            previewModule.downSourceFileStyleDeal();
        }
    },


    /**
     * 加载office的预览页面处理
     */
    loadOfficePreview:function(){
        $(".els_sy_loadding").show();
        $(".listSpinner").show();
        var htmlUrl = previewModule.docPreviewUrl+previewModule.rfsId;
        $("#div_content").load(htmlUrl, function() {
            //目录存放的区域
            var divTitleMap = $("#div_titlemap").html();
            if(divTitleMap == null && divTitleMap == undefined){
                $('#documentDirNoData').show();
            }else{
                var jArrayTitle = "";
                try{
                    jArrayTitle = JSON.parse(divTitleMap);
                }catch(e){
                    jArrayTitle = "";
                }
                if(jArrayTitle.length == 0){
                    $('#documentDirNoData').show();
                }
                //左边目录树的处理
                $.each(jArrayTitle, function(index, item) {
                    var dt = $('<dt onclick="previewModule.one_tit(this);" href=' + item.mark + '></dt>');
                    if (item.tclass == "tone") {
                        var oneTitle = $('<strong onclick="previewModule.one_titImg(this)"><img src="./img/seaD.png" alt=""></strong><span>' + item.title + '</span><em></em>');
                        dt.append(oneTitle);
                        $('#documentDirList').append(dt);
                    } else if (item.tclass == "ttwo") {
                        var twoTitle = $('<dd class="two_tit" style="display:none;" onclick="previewModule.two_tit(this);" href=' + item.mark + '><span>' + item.title + '</span><em></em></dd>');
                        $('#documentDirList').append(twoTitle);
                    }else if(item.tclass == "tthree") {
                        var tthree = $('<dd class="three_tit" style="display:none;" onclick="previewModule.three_tit(this);" href=' + item.mark + '><span>' + item.title + '</span><em></em></dd>');
                        $('#documentDirList').append(tthree);
                    }else{
                        if(jArrayTitle.length == index+1 && $('#documentDirList').html().trim().length == 0){
                            $('#documentDirNoData').show();
                        }
                        return true;
                    }
                });
                $(".Detail").attr("content",$("#div_titlemap").html());
                $("#div_titlemap").empty();
            }
            var pageLength = $('#div_content').html().trim().length;
            if(pageLength == 0){
                console.log("空白html");
                if(previewModule.srcfileType.toUpperCase() != "PDF"){
                    previewModule.downSourceFileStyleDeal();
                }
                return;
            }
            //交互处理，如果有文本则隐藏加载进度条
            var pArr = $("#div_content p");
            for(var i =0;i<pArr.length;i++){
                var $p = $(pArr[i]);
                var pTest = $p.text();
                if(pTest.length != 0){
                    $(".els_sy_loadding").hide();
                    continue;
                }
            }
            // 表格样式初始化
            $('table').prop('border','1');
            $('table').css({
                width: '85%',
                textAlign: 'center',
                color: '#333',
                fontSize: 12,
            });
            // 表格右边插入按钮
            $('#div_content table').before('<button class="copyTable">复制表格</button>');
            $(document).on('mouseover','#div_content table',function(){
                $('#div_content button').hide();
                $('table').css({
                    boxShadow: '0px 0px 0px #eee'
                });
                $(this).prev('button').show();
                $(this).css({
                    boxShadow: '5px 5px 5px #ccc'
                })
            });
            // 图片的处理
            previewModule.isImg();
            $(".listSpinner").hide();
            //判断搜索框是否有值  如有值,执行下搜索方法
            // var seachValue = $('#seachInput').val();

            // if(seachValue.trim().length>0){
            //     previewModule.doSearch();
            // }
            //标题展开
            previewModule.loadFoldTitle();

        });
    },

    // 图片加载的处理
    isImg:function(){
        if(previewModule.srcfileType.toUpperCase() == "PPT" || previewModule.srcfileType.toUpperCase() == "PPTX"){
            $(".els_sy_loadding").hide();
            //源文件没图片，则解析失败展现
            if($("#div_content img").length ==0 ){
                previewModule.downSourceFileStyleDeal();
            }
        }else{
            $('#div_content img').each(function(){
                var imgObj = $(this);
                var okey = imgObj.attr("okey");
                if(okey != undefined &&okey.length>0){
                    imgLoadDeal.imageCache.push(imgObj);
                }
            });
            imgLoadDeal.initImageCache();
            // 添加门板
            $('#div_content .lookMaster').parent('p').css({
                position: 'relative',
                display:'inline-block'
            });
        }
    },


    clickLook:function(el){

        var okey = $(el).prevAll('.lookMaster').attr('okey');
        var url = previewModule.docDownUrl+okey;
        $(el).prevAll('.lookMaster').attr('src',url );
        $(el).prevAll('.lookMaster').css({
            width: 'auto',
            height: 'auto'
        });
        $(el).prevAll('.lookMaster').attr("onmouseover","smallOver(this)");
        $(el).prevAll('.lookMaster').attr("onmouseleave","smallOut(this)");
        $(el).hide();
        $(el).nextAll('.lookMaster_p2').addClass('closeImg');
    },
    closeImg:function(el){
        if($(el).hasClass('closeImg')){
            previewModule.isClick = false;
            $('#div_content img').removeClass('isOver');
            $(el).prevAll('img').attr('src', './img/bre.png');
            $(el).removeClass('closeImg');
            $(el).prevAll('img').attr("onmouseover","imgOver(this)");

            $(el).prevAll('img').attr("onmouseleave","imgOut(this)");
            $(el).prevAll('.lookMaster_p').hide();
            $(el).hide();
        }
    },
    master_pOver:function(el){
        $(el).show();
    },
    master_pOut:function(el){
        $(el).hide();
    },
    //搜索处理
    doSearch:function(){
        $('dt em,dd em').text("");
        $('.main1_key').remove();
        previewModule.numLocal = 1;
        var txt = $('#seachInput').val();
        var $div_content = $("#div_content");
        $div_content.unmark();
        $div_content.mark(txt);
        var elem = $div_content.find('mark');
        if(elem.length > 0){
            $(elem).eq(0).addClass('local');
            $div_content.stop(true).animate({scrollTop: previewModule.offsetTop($(elem)[previewModule.numLocal -1]) - 400});
            isClick = true;
            $('.h3_right i em').text(previewModule.numLocal);
            $('.h3_right i strong').text(elem.length);
            previewModule.newStaticSize();
        }else{
            $('.h3_right i em').text(0);
            $('.h3_right i strong').text(0);
        }
    },
    newStaticSize:function(){
        previewModule.oneLevelEach();
        var detDd = $('.Detail_left dd:visible');
        previewModule.twoLevelEach(detDd);
        //点击搜索时判断匹配定位是否被选中 如果选中执行匹配定位方法
        if($("#elsppdw").hasClass('liAct')){
            previewModule.click_pp();
        }
    },
    click_pp:function(){
        $("#matchPositingList").empty();
        previewModule.mycars = new Array();
        previewModule.markbq = new Array();
        previewModule.jcArr = new Array();
        var bf = false;
        $(".Detail_right mark").each(function() {
            //获取p标签的html，html取出内容
            $(this).attr("elsMark","findmark");
            //父节点html
            var s = $(this).parent().html();
            var id = $(this).parent().attr("id");
            if($(this).parent().is('td')){
                id= $(this).parents("table").attr('id');
            }

            var sumCS = previewModule.bfcontainsJC(previewModule.jcArr,id);
            previewModule.jcArr.push(id);
            var mark = $(this).prop("outerHTML");
            $(this).removeAttr("elsMark");
            //判断当前元素在该段中的位置
            var indexAdd = s.indexOf(mark);
            var s1 = s.substring(0,indexAdd).replace(/<\/?.+?>/g,"");
            var e1 = s.substring((indexAdd+mark.length),s.length).replace(/<\/?.+?>/g,"");
            var htmlStart = "";
            var htmlend = "";
            if(s1.length>=30){
                htmlStart = s1.substring((s1.length-30),s1.length);
                htmlend   = e1.substring(0,30);
            }else{
                htmlStart = s1.substring(0,s1.length);
                htmlend   = e1.substring(0,30);
            }
            htmle = $(this).html();
            htmle=htmle.replace(/<\/?.+?>/g,"");
            previewModule.mycars.push(htmlStart+"<mark href="+id+" cs="+sumCS+" style='color:red;'>"+htmle+"</mark>"+htmlend);
            bf=true;
        });

        if(bf){
            if(previewModule.mycars != null){
                $("#matchPositingNoData").hide();
                $("#matchPositingList").empty();
                for(var a = 0 ; a<previewModule.mycars.length; a++ ){
                    $("#matchPositingList").append("<li onmouseover=\"this.style.cursor='pointer'\" onclick=\"previewModule.localMarry(this);\">"+previewModule.mycars[a]+"</li>");
                }
            }
        }else{
            $("#matchPositingNoData").show();
        }
    },
    oneLevelEach:function(){
        var detDt = $('.Detail_left dt');
        detDt.each(function(i,v){//一级目录的处理
            var oneLevelStartId = $(v).attr('href');//一级目录的开始节点
            var oneLevelEndId = $('.Detail_left dt').eq(i+1).attr('href');//一级目录的结束节点
            if(oneLevelEndId == undefined){ //如果是最后一个一级目录则统计至页面最后
                oneLevelEndId = 'div_titlemap';
            }

            if(!$(v).next().is('dd')){ //如果此一级目录没有二级目录则跳过此次
                previewModule.staticKeySize($(v),oneLevelStartId,oneLevelEndId,2);//关键词放置一级目录下
            }else{
                var otherOneLevelEndId = $(v).next().attr('href');
                previewModule.staticKeySize($(v),oneLevelStartId,otherOneLevelEndId,2);//额外一次在一级和第一个二级间统计
                previewModule.staticKeySize($(v),oneLevelStartId,oneLevelEndId,1);
            }

        });
    },
    addLocal:function(){
        $('.select_back').removeClass('select_back');
        var elem = $('#div_content mark');
        previewModule.numLocal++;
        if(previewModule.numLocal >= elem.length){
            previewModule.numLocal = elem.length;
        }
        $('mark').removeClass('local');
        $(elem).eq(previewModule.numLocal-1).addClass('local');
        $('.h3_right i em').text(previewModule.numLocal);
        $('#div_content').stop(true).animate({scrollTop: previewModule.offsetTop($(elem)[previewModule.numLocal -1]) - 400});
    },

    subLocal:function(){
        $('.select_back').removeClass('select_back');
        var elem = $('#div_content mark');
        previewModule.numLocal--;
        if(previewModule.numLocal <= 1){
            previewModule.numLocal = 1;
        }
        $('mark').removeClass('local');
        $(elem).eq(previewModule.numLocal-1).addClass('local');
        $('.h3_right i em').text(previewModule.numLocal);
        $('#div_content').stop(true).animate({scrollTop: previewModule.offsetTop($(elem)[previewModule.numLocal -1]) - 400});
    },

    //对目录进行再次处理
    loadFoldTitle:function(){
        var detailDt = $('.Detail_left dt');
        var detailDd = $('.Detail_left dd');
        detailDt.eq(0).prevAll('dd').show();
        if(detailDt.length == 0){//如果没有任何一级标签
            detailDd.show();
        }else{
            detailDt.each(function(i,v){
                var num = $(v).find('em').text();
                if(num.length >0){
                    $(v).find('.main1_key').show();
                    $(v).find('img').removeClass('trans');
                    $(v).nextUntil('dt').show();
                    return false;
                }else{
                    //如果为最后一个
                    if(detailDt.length == i+1){
                        detailDt.eq(0).find('img').removeClass('trans')
                            .nextUntil('dt').show()
                            .find('.main1_key').show();
                        return false;
                    }
                }
            })
        }
        var detDd = $('.Detail_left dd:visible');
        previewModule.twoLevelEach(detDd);
    },
    //左侧标题的目录树的处理
    twoLevelEach:function(detDd){
        detDd.each(function(index,ele){ //二级三级目录的处理
            var twoLevelStartId = $(ele).attr('href');//二级三级目录的开始节点
            var twoLevelEndId = $(ele).next().attr('href');//二级三级目录的结束节点
            if(twoLevelEndId == undefined){
                twoLevelEndId = 'div_titlemap';
            }
            previewModule.staticKeySize($(ele),twoLevelStartId,twoLevelEndId,2);
        });
    },
    //左侧标题的目录树的处理
    staticKeySize:function($ele,startId,endId,currLevel){
        var startEle = $('a[name="'+startId+'"]').parent();//获取右侧正文部分开始id的父节点
        var endEle = $('a[name="'+endId+'"]').parent();//获取右侧正文部分结束id的父节点

        var errorSize = startEle.find('a[name="'+endId+'"]').length;//如果开始节点和结束节点在同一个父元素中，属于解析错误
        if(errorSize >0){
            endEle = startEle.next();
        }

        if(endId == 'div_titlemap'){ //如果是最后一个标题
            endEle = $('#div_titlemap');
        }

        if(startEle.length ==0 || endEle.length == 0){//如果找不到开始节点或者结束节点，跳过
            return true;
        }

        var staticRang = $(startEle).nextUntil(endEle);//统计范围
        var allKeyDom = new Array();

        var rangeT = staticRang.find('mark').parents('table');
        var TSize = rangeT.length;

        if(currLevel>1){
            var selfstr = previewModule.getKeySection(startEle);
            var rangestr = previewModule.getKeySection(staticRang);
            if(selfstr.length > 0){
                allKeyDom.push(selfstr);
            }
            if(rangestr.length > 0){
                allKeyDom.push(rangestr);
            }
        }

        if(currLevel>1&&allKeyDom.length >0){
            $ele.append('<ul class="main1_key" style="display: none;">'+allKeyDom.join('')+'</ul>');
            //如果一级标题是展开的，那把他下面的关键字展示出来
            if(!$ele.filter('dt').find('img').hasClass('trans')){
                $ele.filter('dt').children('.main1_key').show();
            }
        }

        var sum = staticRang.find('mark').parent(':not(td)').length+startEle.find('mark').parent().length+TSize;
        if(sum > 0){
            $ele.find('em').text('('+sum+')');
        }
    },

    //目录树的处理
    getKeySection:function(staticRang){
        var titlesArray = new Array();
        var localIdsArray = new Array();
        staticRang.find('mark').parent().each(function(i,v){
            var keysArray = new Array();
            $(v).find("mark").each(function(index,ele){
                var ktext = $(ele).text();
                if($.inArray(ktext,keysArray)<0){
                    keysArray.push(ktext);
                }
            });
            var title = keysArray.join(" ");
            var locaId = $(v).attr("id");
            if(locaId == undefined){
                if($(v).is('td')){
                    locaId = $(v).parents('table').attr("id");
                }else{
                    locaId = $(v).parent().attr("id");
                }
            }
            if($.inArray(locaId,localIdsArray)<0){
                var ali = '<li onclick="previewModule.localMarry2(this);" lid="'+locaId+'"><span>'+title+'</span></li>';
                titlesArray.push(ali);
                localIdsArray.push(locaId);
            }
        });
        return titlesArray.join(" ");
    },
    //匹配定位
    localMarry:function(local){
        $('mark').removeClass('local');
        var ship =  $(local).find('mark').attr('href');
        var cs = $(local).find('mark').attr('cs');
        var ele = $("#" + ship).find('mark').get(cs);
        numLocal = $('#div_content mark').index($("#" + ship).find('mark').eq(cs))+1;
        $('.h3_right i em').text(numLocal);
        $("#" + ship).find('mark').eq(cs).addClass('local');
        $('#div_content').animate({scrollTop: previewModule.offsetTop(ele) - 400});
    },
    //匹配定位2
    localMarry2:function(local){
        previewModule.stopPropagation();
        $('mark').removeClass('local');
        var ship =  $(local).attr('lid');
        $('.select_back').removeClass('select_back');
        $("#" + ship).addClass('select_back');
        numLocal = $('#div_content mark').index($("#" + ship).find('mark').eq(0))+1;
        $('.h3_right i em').text(numLocal);
        $("#" + ship).find('mark').eq(0).addClass('local');
        if($("#" + ship)[0].tagName == 'TABLE'){ //表格处理
            $('#div_content').animate({scrollTop: previewModule.offsetTop($("#" + ship).find('mark').get(0)) - 400});
        }else{
            $('#div_content').animate({scrollTop: previewModule.offsetTop($("#" + ship)[0]) - 400});
        }
    },
    // 小三角点击事件
    one_titImg:function(el){
        previewModule.stopPropagation();
        if (!$(el).find('img').hasClass('trans')) {
            $(el).find('img').addClass('trans');
            $(el).parent().nextUntil('dt').hide();
        } else {
            $(el).find('img').removeClass('trans');
            $(el).parent().nextUntil('dt').show();
        }
    },
    // 文档目录点击事件
    one_tit:function(el){
        previewModule.local(el);
        if (!$(el).find('img').hasClass('trans')) {
            $(el).find('img').addClass('trans');
            $(el).nextUntil('dt').hide();
            $(el).next('dd').hide();
        } else {
            $(el).find('img').removeClass('trans');
            $(el).nextUntil('dt').show();
            $(el).next('dd').show();
            //一级目录展开时并且执行过搜索之后才执行二级目录统计
            var markSzie = $('#div_content').find('mark').length;
            if(markSzie >0){
                var twoDd = $(el).nextUntil('dt').filter('dd');
                twoDd.find('ul').remove();
                previewModule.twoLevelEach(twoDd);
            }
        }

        if($(el).find('.main1_key').is(':hidden')){
            $(el).find('.main1_key').show();
        }else{
            $(el).find('.main1_key').hide();
        }
    },
    two_tit:function(el){
        previewModule.local(el);
        if ( $(el).find('.main1_key').is(':hidden')) {
            $('dd .main1_key').hide();
            $(el).find('.main1_key').show();
        } else {
            $(el).find('.main1_key').hide();
        }
    },
    three_tit:function(el){
        // 执行
        previewModule.local(el);
        if ($(el).find('.main1_key').is(':hidden')) {
            $('dd .main1_key').hide();
            $(el).find('.main1_key').show();
        } else {
            $(el).find('.main1_key').hide();
        }
    },
    // 左侧目录定位
    local:function(local){
        var ship =  $(local).attr('href');
        var elem = $("#div_content").find("a[name='"+ship+"']");
        $("#div_content").children().removeClass('local-p');
        $(elem).parent().addClass('local-p');
        $('#div_content').animate({scrollTop: previewModule.offsetTop($(elem)[0]) - 400});
    },
    offsetTop:function(elements){
        var top = elements.offsetTop;
        var parent = elements.offsetParent;
        while( parent != null ){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        };
        return top;
    },
    //判断该元素在数组中存在几次
    bfcontainsJC:function(arr, obj){
        var sum = 0;
        var i = arr.length;
        while (i--) {
            if (arr[i] === obj) {
                sum++;
            }
        }
        return sum;
    },
    //阻止冒泡
    stopPropagation:function(){
        var e=previewModule.getEvent();
        if(window.event){
            e.cancelBubble=true;//阻止冒泡
        }else if(e.preventDefault){
            e.stopPropagation();//阻止冒泡
        }
    },
    // 阻止冒泡
    //得到event
    getEvent:function(){
        if(window.event)    {return window.event;}
        func=previewModule.getEvent.caller;
        while(func!=null){
            var arg0=func.arguments[0];
            if(arg0){
                if((arg0.constructor==Event || arg0.constructor ==MouseEvent
                        || arg0.constructor==KeyboardEvent)
                    ||(typeof(arg0)=="object" && arg0.preventDefault
                        && arg0.stopPropagation)){
                    return arg0;
                }
            }
            func=func.caller;
        }
        return null;
    },

    initScript:function(){
        // 高度
        // $('.Detail_left .main').height($(window).height() - 80);
        $('.Detail_right #div_content').height($(window).height());

        // 点击左侧title切换
        $('.Detail_left_title li').click(function() {
            $('.Detail_left_title li').removeClass('liAct');
            $(this).addClass('liAct');
            $('.main').hide();
            $('.main').eq($(this).index()).show();
            var text = $(this).text();
            if(text == "匹配定位"){
                previewModule.click_pp();
            }
        });
        // 点击提示条
        $('.no_htmlWarn img').click(function(){
            $(this).parent().hide();
        });

        $('.comBox_top').on('click','.comBox_odd',function(){
            if(!$(this).hasClass('act1')){
                $(this).addClass('act1');
            }else{
                $(this).removeClass('act1');
            }
            if($(this).next('.comBox_even').hasClass('act2')){
                $(this).next('.comBox_even').removeClass('act2');
                $(this).addClass('act1');
            }
        });
        $('.comBox_top').on('click','.comBox_even',function(){
            if(!$(this).hasClass('act2')){
                $(this).addClass('act2');
            }else{
                $(this).removeClass('act2');
            }
            if($(this).prev('.comBox_odd').hasClass('act1')){
                $(this).prev('.comBox_odd').removeClass('act1');
                $(this).addClass('act2');
            }
        });
        //复制表格按钮点击
        new ClipboardJS('.copyTable', {
            target: function(triggerEle) {
                return $(triggerEle).next().get(0);
            }
        });

    }
};

window.previewModule = previewModule




/**
 * 根据权限编码判断是否有--系统权限
 * @param p 权限编码
 * @returns {boolean} 是否有权限
 */
function checkSystemPermission (p) {
  if(!p){ return false;}
  // 获取权限列表
  let list=JSON.parse(sessionStorage.getItem('vuex'));
  // 判断权限列表中是否包含当前权限编码
  let idx = list.systemPerm.indexOf(p)
  return idx>-1 ;
}

// 移入显示门板放大镜
function imgOver(el){
    // 如果第一次移入,则只添加一次
    if(!$(el).hasClass('isOver') && previewModule.isClick == false){
        $(el).after('<p class="lookMaster_p" onclick="previewModule.clickLook(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img" src="./img/mag1.png"></p>'
            + '<p class="lookMaster_p2" onclick="previewModule.closeImg(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img2" src="./img/shrink.png"></p>'
        );
        $(el).addClass('isOver');
    }else if(previewModule.isClick == true){
        $(el).addClass('isOver');
        $(el).after('<p class="lookMaster_p" onclick="previewModule.clickLook(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img" src="./img/mag1.png"></p>'
            + '<p class="lookMaster_p2" onclick="previewModule.closeImg(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img2" src="./img/shrink.png"></p>'
        );
    }
    $(el).nextAll('.lookMaster_p').eq(0).show();
};
function imgOut(el){
    $(el).nextAll('p').hide();
    previewModule.isClick = false;
};

// 移入显示门板缩小
function smallOver(el){
    // 缩小时的门板比例
    if(!$(el).hasClass('isOver') && previewModule.isClick == false){
        $(el).after('<p class="lookMaster_p" onclick="previewModule.clickLook(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img" src="./img/mag1.png"></p>'
            + '<p class="lookMaster_p2 closeImg" onclick="previewModule.closeImg(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img2" src="./img/shrink.png"></p>'
        );
        $(el).addClass('isOver');
    }else if(previewModule.isClick == true){
        $(el).after('<p class="lookMaster_p" onclick="previewModule.clickLook(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img" src="./index/img/mag1.png"></p>'
            + '<p class="lookMaster_p2 closeImg" onclick="previewModule.closeImg(this)" onmouseover="previewModule.master_pOver(this)" onmouseleave="previewModule.master_pOut(this)"><img class="lookMaster_img2" src="./img/shrink.png"></p>'
        );
    }
    $(el).nextAll('.lookMaster_p2').eq(0).show();
    $(el).nextAll('.lookMaster_p2').width($(el).width());
};
function smallOut(el){
    $(el).nextAll('.lookMaster_p2').hide();
};

/**
 * 图片加载处理
 * @type {{}}
 */
var imgLoadDeal = {
    //要加载图片的存储地方，加载成功一个会将当前数据剔除
    imageCache : [],
    //定时器执行标识
    interval :-1,
    //执行逻辑
    initImageCache:function(){
        if(imgLoadDeal.interval < 0){
            //清空原缓存
            var flag = true;
            imgLoadDeal.interval = setInterval(function () {
                if(flag){
                    flag = false;
                    if(imgLoadDeal.imageCache.length > 0){
                        var imgSrcObj = imgLoadDeal.imageCache.shift();
                        doWork(imgSrcObj,dealIndex);
                    }else{
                        clearInterval(imgLoadDeal.interval);
                        imgLoadDeal.interval = -1;
                        $(".els_sy_loadding").hide();
                        //excel 解析标签内容为表格包含tr，world 解析标签内容包含p
                        if($("#div_content p").length ==0 && $("#div_content tr").length ==0){
                            previewModule.downSourceFileStyleDeal();
                        }
                    }

                }
            },500);
            function dealIndex() {
                flag = true;
            }
        }
        function doWork(imgObj,dealIndex) {
            var okey = imgObj.attr("okey");
            if(okey != undefined &&okey.length>0){
                var count = 0;
                var imgsrc = previewModule.docDownUrl+okey+"?"+Math.random();
                imgObj.attr("src" , imgsrc);
                imgObj[0].onload = function(){
                    count = 0;
                    $(".els_sy_loadding").hide();
                    dealIndex();
                    imgObj.show();
                };
                //加载失败后 失败交互
                imgObj[0].onerror = function(){
                    count++;
                    if(count <=1){
                        imgObj.attr("src" , imgsrc);
                    }else{
                        $(imgObj).parent().remove();
                    }
                    dealIndex();
                }
            }

        }
    },
};
