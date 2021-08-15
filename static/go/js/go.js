var req=null;var type=null;var tab=null;var page=null;var userId=null;var list_id=null;var pager_id=null;var TYPE_MOVIE="movie";var TYPE_USER_MOVIE="user_movie";var TYPE_COMMUNITY_MOVIE="community_movie";var TYPE_ASSET="asset";var TYPE_USER_ASSET="user_asset";var TYPE_ANIMATOR="animator";var TAP_FAVORITES="favorites";var ELEMENT_MOVIE="movie_list";var ELEMENT_ASSET="asset_list";var ELEMENT_PAGER="pager";var URL_MOVIE_LIST="/go/getMovieListHtml";var URL_ASSET_LIST="/go/getAssetListHtml";var URL_ANIMATOR_LIST="/go/getAnimatorListHtml";var URL_DELETE_MOVIE="/go/deleteMovie";var URL_DELETE_FAVORITE="/go/deleteFavorite";var URL_POST_COMMENT="/go/postComment";function initXMLHTTPRequest(){var A=null;if(window.XMLHttpRequest){A=new XMLHttpRequest()}else{if(window.ActiveXObject){A=new ActiveXObject("Microsoft.XMLHTTP")}}return A}function getXList(D,C,E,G,A,B){if(!B){B=-1}this.type=D;this.tab=C;this.page=E;this.userId=B;this.list_id=G;this.pager_id=A;if(D==TYPE_MOVIE||D==TYPE_USER_MOVIE||D==TYPE_COMMUNITY_MOVIE){url=URL_MOVIE_LIST}else{if(D==TYPE_ASSET||D==TYPE_USER_ASSET){url=URL_ASSET_LIST}else{if(D==TYPE_ANIMATOR){url=URL_ANIMATOR_LIST}}}var F="type="+D+"&tab="+C+"&page="+E+"&user_id="+B;req=initXMLHTTPRequest();if(req){req.onreadystatechange=onReadyStateX;req.open("POST",url,true);req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");req.send(F)}}function onReadyStateX(){var A=req.readyState;if(A==4){var B=req.responseText;var D=B.substring(0,1)==1?true:false;var B=B.substr(1);var C=document.getElementById(list_id);C.innerHTML=B;setPagerX(D)}}function setPagerX(C){var B="";if(page!=0){B+="<a href=\"javascript:getXList('"+this.type+"', '"+this.tab+"', "+(this.page-1)+", '"+this.list_id+"', '"+this.pager_id+"', "+this.userId+')"><strong>Previous</strong></a>'}if(page!=0&&C){B+=" | "}if(C){if(this.tab=="bg"||this.tab=="sound"||this.tab=="prop"){B+="<a href='/go/assetlist/"+this.userId+"/"+this.tab+"/'><strong>See All</strong></a>"}else{B+="<a href='/go/movielist/"+this.tab+"'><strong>See All</strong></a>"}}var A=document.getElementById(this.pager_id);A.innerHTML=B}function setCurrentId(A,C){var B=document.getElementById(C);if(B){B.id=""}A.id=C}function showPlayer(C,B){var A=document.getElementById(C);var D=document.getElementById(B);if(A&&D){A.className="hide";D.className="show"}}function deleteMovie(C,A,B){var D="You will not be able to watch this animation any more!";if(!confirm(D)){return }else{this.userId=B;url=URL_DELETE_MOVIE;var E="movie_id="+A;req=initXMLHTTPRequest();if(req){req.onreadystatechange=onReadyStateDelete;req.open("POST",url,true);req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");req.send(E)}}}function deleteFavorite(C,A,B){var D="Remove a movie from Favorites?";if(!confirm(D)){return }else{this.userId=B;url=URL_DELETE_FAVORITE;var E="movie_id="+A;req=initXMLHTTPRequest();if(req){req.onreadystatechange=onReadyStateRemoveFavorite;req.open("POST",url,true);req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");req.send(E)}}}function onReadyStateDelete(){var A=req.readyState;if(A==4){var B=req.responseText;displayFeedback(B);if(B.substring(0,1)=="0"){getXList(TYPE_USER_MOVIE,"user/0/"+userId,0,ELEMENT_MOVIE,"user_movie_pager",userId)}}}function onReadyStateRemoveFavorite(){var A=req.readyState;if(A==4){var B=req.responseText;displayFeedback(B);if(B.substring(0,1)=="0"){getXList(TYPE_USER_MOVIE,TAP_FAVORITES,0,ELEMENT_MOVIE,"user_movie_pager",userId)}}}function displayFeedback(E){var C=E.substring(1);var B=E.charAt(0);var D=document.getElementById("feedback");if(D){D.innerHTML=C}var A=document.getElementById("feedback_block");if(B=="0"){if(A){D.className="info";A.style.display="block"}}else{if(A){D.className="error";A.style.display="block"}}}function reloadCaptcha(A){$("captchatext").clear();postComment(A,"none","none")}function switchCaptcha(A){if($("captcha_type").getAttribute("value")=="image"){$("captcha_type").setAttribute("value","audio")}else{if($("captcha_type").getAttribute("value")=="audio"){$("captcha_type").setAttribute("value","image")}else{return }}reloadCaptcha(A)}function postComment(B,A,C){new Ajax.Request(URL_POST_COMMENT,{method:"post",parameters:$(B).serialize(),onSuccess:function(E){var D=E.responseText;postCommentComplete(D,B,A,C)},onFailure:function(){displayFeedback("1Error contacting the server");$(B).enable()}});$(B).disable()}function postCommentComplete(E,D,C,G){var B=E.charAt(0);var A=E.substring(1);$(D).enable();switch(B){case"0":displayFeedback("0Comment successfully posted");if(C=="append"||C=="prepend"){displayComment(A,C,G)}else{if(C=="redirect"){var H=A.evalJSON();window.location=H.url}}resetCommentForm(D);$(D).reset();break;case"1":var F=A.indexOf("&");$("captcha_type").setAttribute("value","image");$("captcha_id").setAttribute("value",A.substring(0,F));$("captcha_image").setAttribute("src",A.substring(F+1));$("comment_captcha").style.display="block";$("image_captcha").style.display="block";$("audio_captcha").style.display="none";break;case"2":$("comment_captcha").style.display="block";$("image_captcha").style.display="none";$("audio_captcha").style.display="block";var F=A.indexOf("&");$("captcha_type").setAttribute("value","audio");$("captcha_id").setAttribute("value",A.substring(0,F));$("captcha_audio").innerHTML=getAudioEmbedString(A.substring(F+1));break;case"3":default:displayFeedback(E);resetCommentForm(D);break}n}function getAudioEmbedString(A){return'<object classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-oleobject" height="40" width="170"><param name="autoplay" value="true"><param name="src" value="'+A+'"><param name="autoStart" value="1"><embed height="40" autostart="true" bgcolor="white" src="'+A+'" type="application/x-mplayer2"/></object>'}function resetCommentForm(A){$("captcha_id").setAttribute("value","");$("captcha_type").setAttribute("value","");$("captcha_image").setAttribute("src","");$("comment_captcha").style.display="none";$("image_captcha").style.display="none";$("audio_captcha").style.display="none"}function displayComment(B,D,F){var E=B.evalJSON();var C=new Date();var A;if(D=="prepend"){A='<h2><a href="/go/user/'+E.userid+'" class="link">'+E.username+'</a><span> says</span></h2><div class="created_date">at '+C.toString()+'</div><div class="blck_gray" style="overflow:hidden;"><p>'+E.content+'</p><div class="minutes"><a href="/go/deleteComment/'+E.id+"?url="+location.href+'">delete</a></div></div>'+$(F).innerHTML}else{A=$(F).innerHTML+'<h2><a href="/go/user/'+E.userid+'" class="link">'+E.username+'</a><span> says</span></h2><div class="created_date">at '+C.toString()+'</div><div class="blck_gray" style="overflow:hidden;"><p>'+E.content+'</p><div class="minutes"><a href="/go/deleteComment/'+E.id+"?url="+location.href+'">delete</a></div></div>'}$(F).innerHTML=A};