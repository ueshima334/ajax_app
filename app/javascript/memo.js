function memo() {
  const submit = document.getElementById("submit"); //HTMLのsubmitを取得してsubmitへ代入
  submit.addEventListener("click", (e) => { //submitがクリックされた時、{}内の処理を実行
    const formData = new FormData(document.getElementById("form")); //new formData(フォームの要素)でそのフォームに入力された値を取得できる。取得した値をformDataに代入している
    const XHR = new XMLHttpRequest(); //XMLHttpRequestのオブジェクトを生成し、XMRへ代入
    XHR.open("POST", "/posts", true); //リクエストの内容を指定、HTTPメソッドはあPOST、パスは/post
    XHR.responseType = "json"; //レスポンスのデータ形式をJSONに指定
    XHR.send(formData); //4行目で取得したformDataを送信
    XHR.onload = () => { //レスポンスがあった場合{}内の処理を行う
      if (XHR.status != 200) { //レスポンスのステータスコードが200以外(エラー)の場合、{}内の処理を行う。200と等しい(正常)場合14行目へ
        alert(`Error ${XHR.status}: ${XHR.statusText}`); //ブラウザ情にエラー内容を表示させる
        return null; //nullを返し、JSの処理を終了させる
      }
      const item = XHR.response.post; //responseメソッドで送られてきたJSONにアクセスする。.postでその中のデータを取得し、itemへ代入
      const list = document.getElementById("list"); //list要素を取得して、listへ代入（後にHTMLを描画する際に使用する親要素である）
      const formText = document.getElementById("content"); //idがcontentの要素(テキストフォーム)を取得し、formTextへ代入
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // ↑↑変数HTMLへhtmlの書式を代入。
      list.insertAdjacentHTML("afterend", HTML); //insertAdjacentHTMLメソッドを使用することで、listへ代入した親要素へ、要素の直後(afterend)にHTMLを挿入する。
      formText.value = ""; //formText(入力フォーム)へ空の文字列を入力する。(入力されたままの文字を消す為)
    };
    e.preventDefault(); //preventDefault()で現在進行中の動作を注視させられる。この行は4行目のaddEventListenerの(e)=>{}の処理中である為、関数に与えられた引数eに対してpreventDefault()を使用し、処理を中止させる。
  });
 }
 window.addEventListener("load", memo); //ページが読み込まれたら関数memoが処理される