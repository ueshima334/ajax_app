function check() { //checkという関数を定義
    const posts = document.querySelectorAll(".post"); //postセレクタを持つ要素を全て取得し、postsに代入
    posts.forEach(function (post) { // ↑で取得したpostセレクタ一つ一つに対して{}内の処理を行う
      if (post.getAttribute("data-load") != null) { //data-load属性が空(false)の場合、7行目以降へ進む。
        return null; //値が入っている場合、nilが返されJSの処理が終了する。
      } //4-5行目の記述がないと、29行目のseIntervalでcheckが1秒ごとに実行される指定になっている為、一回のクリックで、8行目以降の処理が何度も行われてしまう。
    post.setAttribute("data-load", "true");
    post.addEventListener("click", () => { //postがクリックされた時、第二引数に指定された関数の処理を行う、ここでは第二関数にアロー関数が使用されているが("click",function(){})と意味は同じ。
      const postId = post.getAttribute("data-id"); //postの属性(data-id)の値(post.id)を取得しpostIDに代入
      const XHR = new XMLHttpRequest(); //XMLHttpRequestのオブジェクトを生成して変数XHRに代入(これでXHRに対してXMLHttpRequestで定義されたメソッドを使用できる)
      XHR.open("GET", `/posts/${postId}`, true); //openメソッドでリクエスト内容を指定。第一引数にHTTPメソッド、第二引数に取得したいパス、第三引数に非同期通信のON/OFFを記述
      XHR.responseType = "json"; //responseTypeメソッドでレスポンスとして欲しい情報の形式を指定する。
      XHR.send();//sendメソッドでリクエストを送信(引数の指定は特に必要なし)
      XHR.onload = () => { //レスポンスなどの受信があればonloadメソッドが呼ばれる(イベントハンドラー)
        if (XHR.status != 200) { //レスポンスのステータスコードが200以外(何らかの失敗)の場合{}内の処理を行う
          alert(`Error ${XHR.status}: ${XHR.statusText}`); //ブラウザ上に()内のアラートを出現させる。(window.alertのwindowは省略されている)
          return null;          //エラーが起きている場合15行目以降は実行されないようにしたいので、ここで戻り値を確定させてJSの処理を終了させている。
        }
        const item = XHR.response.post; //XHR.responseでレスポンスされてきたJSONにアクセスできる。返ってくる値は(json:{post:item})なので、XHR.response.postで値を取得できる。(返却される値はpostsコントローラのrender以降の記述)
        if (item.checked === true) { //itemのcheckedカラムがtrue(既読)であるか確認している
          post.setAttribute("data-check", "true"); //既読であればdata-check属性にtrueという属性値をセットする
        } else if (item.checked === false) { 
          post.removeAttribute("data-check"); //未読ならdata-check属性を削除
        }
      };
    });
  });
}
setInterval(check, 1000); //一秒事に関数checkが実行される。メモの投稿が非同期で行われる為、何秒かおきに関数を実行しないと、新しく投稿した要素に関数を適用できない。
