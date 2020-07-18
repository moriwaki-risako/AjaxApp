function check() {
  // 投稿のDOMを取得している
  const posts = document.getElementsByClassName("post");
  // 取得したDOMを配列に変換している
  postsA = Array.from(posts);

  postsA.forEach(function (post) {
     if (post.getAttribute("data-load") != null) {     //getAttributeで属性値を取得 メモのidを取得する
      return null;
    }
    post.setAttribute("data-load", "true");
    // 投稿をクリックした場合に実行する処理を定義している
    post.addEventListener("click", (e) => {

      // どの投稿をクリックしたのか、カスタムデータを利用して取得している
      const postId = post.getAttribute("data-id");    //メモのIDを取得
     
      // Ajaxに必要なオブジェクトを生成している
      const XHR = new XMLHttpRequest();               //Ajaxを可能にするためのオブジェクト XMLHttpRequestを使用してHTTPリクエストを行う
    
      // openでリクエストを初期化する
      XHR.open("GET", `/posts/${postId}`, true);      //openメソッド・・・どのようなリクエストをするのかを指定するメソッドと
      // レスポンスのタイプを指定する
      XHR.responseType = "json";                      //responseTypeとは、XMLHttpRequestで定義されているメソッドで、レスポンスの形式を指定するメソッドのこと 今回のレスポンスはJSON形式で
       // sendでリクエストを送信する
      XHR.send();                                     //sendとは、XMLHttpRequestで定義されているメソッドで、リクエストを送信することができるメソッドのことです。
                                                      //メソッドで非同期通信をtrueにしている場合は、すぐにレスポンスが返却されます。


      // レスポンスがあった場合の処理
      XHR.onload = () => {      //posts_controlller checkアクションで返却したitemは、XHR.response.postで取得できます。
        const item = XHR.response.post;
        if (item.checked === true) {
          // 既読状態であれば、灰色に変わるcssを適用するためのカスタムデータを追加している
          post.setAttribute("data-check", "true");   //既読であればtrue
        } else if (item.checked === false) {
          // 未読状態であれば、カスタムデータを削除している
          post.removeAttribute("data-check");       //未読であればdata-checkは属性ごと削除
        }
        if (XHR.status != 200) {               //ステータスコード200(成功)以外の場合は、アラートを表示してユーザーに知らせる
          // レスポンスの HTTP ステータスを解析し、該当するエラーメッセージをアラートで表示するようにしている
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
        } else {
          return null;
        }
      }
      // リクエストが送信できなかった時
      XHR.onerror = () => {           //onerror ... リクエストが失敗した場合に呼び出されるイベントハンドラー
        alert("Request failed");
      };
      // イベントをキャンセルして、処理が重複しないようにしている
      e.preventDefault();

    });
  });
}

setInterval(check, 1000);

